"""Publish FTC match schedules for the scout app: scout/schedule/<EVENT>.json (lebob.com.au/scout/schedule/...).

Run by .github/workflows/deploy.yml before every deploy, and every 10 minutes while the repo variable
SCHEDULE_EVENTS names events (e.g. "AUPEQ"). The scout app loads the file for its event code when it has signal.

    SCHEDULE_EVENTS=AUPEQ FTC_API_USER=... FTC_API_TOKEN=... python3 scripts/publish_schedule.py scout/schedule

Env: FTC_API_USER / FTC_API_TOKEN (FIRST API credentials, GitHub secrets), SCHEDULE_EVENTS (comma list),
SEASON (optional; default is the season the current date falls in, e.g. 2026 for Sep 2026 - Aug 2027).

Never fails the deploy: if the FIRST API cannot be read, the copy already on the live site is kept, so a deploy
during an outage does not take the schedule down. Writes changed=true|false to $GITHUB_OUTPUT (false = every file
is the same as the live one, so a timed run can skip deploying). Stdlib only.
"""
import base64
import datetime as dt
import json
import os
import sys
import urllib.parse
import urllib.request

API = "https://ftc-api.firstinspires.org/v2.0"
LIVE = "https://lebob.com.au/scout/schedule"
STATIONS = ("Red1", "Red2", "Blue1", "Blue2")


def season():
    if os.environ.get("SEASON"):
        return int(os.environ["SEASON"])
    now = dt.date.today()
    return now.year if now.month >= 9 else now.year - 1


def api(path, **params):
    auth = base64.b64encode(f"{os.environ['FTC_API_USER']}:{os.environ['FTC_API_TOKEN']}".encode()).decode()
    q = "?" + urllib.parse.urlencode(params) if params else ""
    req = urllib.request.Request(f"{API}/{path}{q}", headers={"Authorization": "Basic " + auth, "Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r) if r.status == 200 else {}


def live(code):
    try:
        with urllib.request.urlopen(f"{LIVE}/{urllib.parse.quote(code)}.json", timeout=20) as r:
            return json.load(r)
    except Exception:  # noqa: BLE001 - not published yet, or the site is unreachable
        return None


def fetch(code, yr):
    """{format, event, name, updatedAt, matches: {n: [red1, red2, blue1, blue2]}, times: {n: iso}, names: {team: name}}"""
    ev = (api(f"{yr}/events", eventCode=code).get("events") or [{}])[0]
    names, page = {}, 1
    while True:
        d = api(f"{yr}/teams", eventCode=code, page=page)
        for t in d.get("teams") or []:
            if t.get("teamNumber"):
                names[str(t["teamNumber"])] = t.get("nameShort") or t.get("nameFull") or ""
        if page >= (d.get("pageTotal") or 1):
            break
        page += 1
    matches, times = {}, {}
    for m in api(f"{yr}/schedule/{code}", tournamentLevel="qual").get("schedule") or []:
        by = {t.get("station"): t.get("teamNumber") for t in m.get("teams") or []}
        row = [by.get(s) for s in STATIONS]
        if m.get("matchNumber") and all(isinstance(n, int) and n > 0 for n in row):
            matches[str(m["matchNumber"])] = row
            if m.get("startTime"):
                times[str(m["matchNumber"])] = m["startTime"]
    return {"format": "lebob-schedule/1", "event": code, "name": ev.get("name") or "",
            "updatedAt": dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "matches": matches, "times": times, "names": {k: v for k, v in names.items() if v}}


def same(a, b):
    strip = lambda d: {k: v for k, v in (d or {}).items() if k != "updatedAt"}  # noqa: E731
    return a is not None and b is not None and strip(a) == strip(b)


def main(out):
    events = [e.strip().upper() for e in os.environ.get("SCHEDULE_EVENTS", "").split(",") if e.strip()]
    have_creds = bool(os.environ.get("FTC_API_USER") and os.environ.get("FTC_API_TOKEN"))
    os.makedirs(out, exist_ok=True)
    changed = False
    for code in events:
        old = live(code)
        new = None
        if have_creds:
            try:
                new = fetch(code, season())
                if not new["matches"] and not new["names"]:
                    new = None  # nothing published by FIRST yet
            except Exception as e:  # noqa: BLE001
                print(f"{code}: FIRST API failed ({e}); keeping the live copy", file=sys.stderr)
        else:
            print(f"{code}: FTC_API_USER / FTC_API_TOKEN not set; keeping the live copy", file=sys.stderr)
        if new is None:
            new = old
        elif same(new, old):
            new = old  # keep the old timestamp: nothing changed
        if new is None:
            continue
        changed = changed or not same(new, old)
        with open(os.path.join(out, f"{code}.json"), "w") as f:
            json.dump(new, f, separators=(",", ":"))
        print(f"{code}: {len(new.get('matches') or {})} matches, {len(new.get('names') or {})} names")
    if os.environ.get("GITHUB_OUTPUT"):
        with open(os.environ["GITHUB_OUTPUT"], "a") as f:
            f.write(f"changed={'true' if changed else 'false'}\n")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "scout/schedule")
