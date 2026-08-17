# REVIEW

Uncertainty log for the SEO and content build on lebob.com.au. Every item here is
something a human needs to confirm, correct or fill in. Nothing in this file is
linked from the site and it is deliberately absent from `sitemap.xml`.

---

## Phase 1 — HTTPS enforcement

`https_enforced` was flipped to `true` through the Pages API. The certificate was
already in the `approved` state, so no polling was needed.

Verified live after the Phase 2 deploy:

```
curl -sI http://lebob.com.au/
HTTP/1.1 301 Moved Permanently
Location: https://lebob.com.au/
```

A `CNAME` file containing `lebob.com.au` did **not** exist in the repository. The
custom domain was only set in the Pages settings. It has been added at the repo
root, which is the durable form.

**Nothing to action.**

---

## Phase 2 — Fonts

The prompt asked for static IBM Plex Sans at 400/500/600/700/800.

Google Fonts no longer serves IBM Plex Sans as static weights. It is now a
**variable font with a 400 to 700 weight axis**, and all four requested weights
resolved to one identical file. Weight 800 is not served at all, and was not being
served to the live site before this change either.

What shipped is one variable file per subset with `font-weight: 400 700`. The one
place the CSS asks for 800, `.nav-brand span`, resolves to 700 with synthetic
emboldening. That is byte-for-byte the same rendering the site had while pointed at
Google, so this is not a visual regression.

**Action, optional:** if a true 800 weight is wanted for the wordmark, the static
IBM Plex Sans SemiBold/Bold files would have to come from the IBM Plex releases on
GitHub rather than the Google Fonts API. Alternatively change `.nav-brand span` to
`font-weight: 700`, which is what the browser is already doing.

---

## Phase 3 — Source document gaps

Eight HTML pages were built from the eight season PDFs. Everything on them traces
back to the source file. The items below are where the source itself is thin,
ambiguous, or where a judgement call was made.

### All internationals documents — ligature loss in extraction

`pdftotext` on the three internationals documents drops `fi` and `ff` ligatures
out of the text flow and dumps the loose glyphs at the bottom of each page. The
raw extraction therefore contains words like `rst`, `dif cult`, `ef ciency`,
` nal` and ` xed`. These were reconstructed to `first`, `difficult`, `efficiency`,
`final` and `fixed`. That is a mechanical repair of a known extractor bug, not a
rewrite, but it is worth knowing the raw text does not read cleanly.

### The 2026 Korea Open result is not in any PDF

Every internationals document was written **before** the event. The latest dated
entry anywhere in the set is 25 June 2026, "Korea departure prep", and the
departure date is stated as 3 July 2026. No PDF records what happened in Jeonju.

The only claim of an outcome anywhere in the repository is one sentence on the
existing home page: "SoftSense, our innovation project, won a prize at the 2026
Korea Open." The specific award name is not stated anywhere.

This was carried through to the `award` array in the `Organization` JSON-LD as
`"Prize at the 2026 Korea Open Invitational for the SoftSense innovation project"`,
which is as precise as the evidence allows.

**Action:** confirm the exact award title and replace that string. Being able to
state the specific award is worth considerably more than a generic "prize" both
to a reader and to a search engine.

### ~~The FLL team number is confirmed, the FTC one is not~~ RESOLVED

`TEAM LEBOB #3236` appears throughout `internationals-robot-design-documentation.pdf`
as a running header, which confirmed the FLL team number.

There is **no occurrence of "FTC" or "Tech Challenge" in any of the eight PDFs**, so the
FTC number could not be sourced from the documents.

**Supplied by Andre, 2026-08-17: the FTC team number is 37323.** Both numbers are now on
`/about/` and in the `identifier` array of both the home page `Organization` block and the
`AboutPage` block. No action outstanding.

### ~~Slide 1 of the presentation reads "FLL Team KOI34"~~ RESOLVED

The title slide of `internationals-presentation.pdf` reads
`TEAM LEBOB | FLL Team KOI34 - Perth, Western Australia`, which appeared to conflict
with `#3236` in the robot design document.

**Confirmed by Andre, 2026-08-17:** 3236 is the team number. **KOI34 is the entry code
the organisers allocated for the 2026 Korea Open Invitational**, and applies to that
event only.

Both are now stated on `/about/` under "Team numbers and programmes", with the
distinction spelled out so neither is mistaken for the other, and `KOI34` is carried in
the `identifier` array of the `AboutPage` JSON-LD as a `PropertyValue` named
"2026 Korea Open Invitational entry code". No action outstanding.

### Presentation, slides 2 and 27

Both are working canvases, not finished slides. Slide 2 is an off-canvas dump of
assets and pasted body text and extracts to 9,958 characters. Slide 27 is the FLL
Robot Design rubric with a visible `TODO: Fix red text / Fix referring to page on
every slide`. Their captions are truncated at 1,400 characters with a note saying so.
Slide 71 is blank and is labelled as carrying no extractable text.

**Action:** if these three slides are not meant to be public, say so and they will
be dropped from the page.

### Email screenshots were deliberately not published

`regionals-innovation-documentation.pdf` (pages 14 to 16) and
`nationals-innovation-documentation.pdf` (pages 21 to 25) contain screenshots of
email correspondence, including a substantive reply from Dr Todd Bond, Deputy
Director, and several threads with named individuals. Their content is summarised
in the body text of those documents, which is what the HTML pages carry.

The images themselves were **not** published, because putting private correspondence
and signature blocks on an indexable page is not something to do without the
senders' consent. The extracted images are still in the PDFs.

**Action:** if consent exists, they can be added as figures.

### Figure resolution

Some figures in `internationals-robot-design-documentation.pdf` are embedded at
low resolution. The prototyping photo on the design section is 402 x 226 native and
is displayed wider than that. It is soft. Every other published figure is at or
above its display width.

### ~~Dates~~ RESOLVED — all three events dated and sourced

The competition dates are not in the PDFs, so they were researched externally and
cross-checked against the team's own logs. All three are now stated on the site as
plain fact, and the hedging language has been removed everywhere.

**Regionals: Sunday 30 November 2025, Aquinas College, Salter Point.**
Venue confirmed by Andre on 2026-08-17, and corroborated from three directions. The
nationals log opens with "1st of December (one day after regionals) - Monday", and
1 December 2025 was a Monday, which puts the regional on Sunday 30 November 2025.
Aquinas College Perth posted "What an incredible day at the 2025 FIRST LEGO League,
proudly hosted by Aquinas on Sunday". A visiting school, Kirwan State High, described
"the First Lego League Regional Tournament at Aquinas College" on the same weekend. And
the date sits inside the official FIRST LEGO League window for UNEARTHED regional
tournaments, which opened 29 November 2025.

One deliberate restraint: FIRST Australia lists the Aquinas College event under the name
**Salter Point Regional**, but that naming is confirmed for the 2026 running of it, not
the 2025 one. The site therefore says "FIRST LEGO League regional tournament" at
"Aquinas College, Salter Point, Perth", which is fully verified and just as specific,
rather than asserting an event name for a year it has not been checked against.

**Action, one minute of work:** if the 2025 event was also called the Salter Point
Regional, say so and the event name can be used directly.

**Nationals: Saturday 13 December 2025, Curtin University, Bentley.**
Two independent Curtin University posts state it: "The FIRST Lego League WA national
district finals are coming to Curtin on Saturday, 13 December", posted by Explore
Curtin on 19 November 2025 and again by the Curtin Professional Learning Hub on
7 December 2025. It corroborates exactly: the team's own run-testing log runs daily
from 1 December and stops on Friday 12 December 2025, the day before.

The event is the **FIRST LEGO League National Championship West**, one of four
Australian national championships, run at Curtin each December. That is what
"Western Australian National Champions" on the site refers to.

**Korea Open: Friday 3 to Sunday 5 July 2026, Jeonju National University of
Education, Jeonju, Jeonbuk-do.**
Confirmed by the FLL Korea organiser's own event page and by Korean press coverage
after the event: pit setup and opening ceremony on 3 July, judging on 4 July, final
judging and the awards ceremony on 5 July. Reported attendance is 50-plus teams from
45-plus countries in the organiser's release, and 45 teams from 33 countries in a LEGO
Education representative's account. The site uses the organiser's figure.

This also clears up the "July 3 departure" line in the internationals documentation:
3 July was the first day of the competition, not the flight.

All of this is now in the `/about/` results table, in the stage subtitles on the season
index, on the SoftSense page, and as two `SportsEvent` entries in the `AboutPage`
JSON-LD with real `startDate` and `endDate` values.

**Still open:** the exact award won in Jeonju. See below.

## Phase 4 — /about/

### ~~FTC team number is not recorded anywhere~~ RESOLVED

Supplied by Andre on 2026-08-17. The identifiers table on `/about/` now reads:

| Identifier | Value |
| --- | --- |
| FIRST LEGO League team number | 3236 |
| FIRST Tech Challenge team number | 37323 |
| 2026 Korea Open Invitational entry code | KOI34 |

All three are machine readable: the two team numbers are in the `identifier` array of
the home page `Organization` block and, with KOI34, in the `AboutPage` block.

### The street address has been removed from the site

`93 Beauchamp Loop` was published in the footer of all 17 pages and as `streetAddress`
in two `PostalAddress` blocks. It is a residential address, so at Andre's request on
2026-08-17 it was removed everywhere.

What replaced it is `Perth, Western Australia`, not nothing, and the `PostalAddress`
blocks keep `addressLocality: Perth`, `addressRegion: WA` and `addressCountry: AU`. The
reasoning: the team's city is already stated in the hero, in page titles, in the about
copy and throughout the season documents, so removing it would cost real local search
signal while hiding nothing that is not already public. The street line was the only
part that identified a household.

**Action, if a postal address is needed for sponsorship invoicing:** a PO box or a school
address can be substituted, and the `streetAddress` field restored with it. Sponsors
being invoiced will expect an address on the invoice, though that does not have to be on
the website.

### Founding year is not evidenced

No document states when the team was founded. What is evidenced is only relative:
the nationals robot design journal has a "How we improved from last year" section
describing a nationals appearance in the previous season, and Leven Shi writes
that 2025/26 was "only my second year of robotics". That establishes at least one
prior season but not a founding year, so no founding year is stated on the page.

**Action:** supply the founding year.

### ~~Two results rows are incomplete~~ RESOLVED

Every cell in the results table is now filled with a real event name, venue and date.
See the dates note in the Phase 3 section above for the sourcing on each.

The one cell that is not a placing is the regional row, which says "Advanced to the
National Championship" rather than a finishing position, because no placing at the
regional is stated anywhere. The advancement is a fact, so it is safe to state; the
position is not, so it is not claimed.

**Action, minor:** if you finished first or second at the regional, say so and that
cell can be upgraded. The regional venue is now confirmed as Aquinas College.

### The award name in Jeonju is the last real gap

Everything else on `/about/` is now specific. The Korea row reads "Prize for the
SoftSense innovation project", which is the weakest cell on the page, because no
source names the award. The repository README says only "prize winner", the repository
description says "prize-winning", and the site copy said "won a prize".

**Action, and this is now the single highest-value thing you can supply:** the exact
award title. "Winner, Innovation Project Award" or whatever it actually was, is worth
far more than "a prize" to a reader, to a sponsor, and to a search engine. It goes in
one table cell, one line of the SoftSense page, and the `award` arrays in two JSON-LD
blocks.

### Mentor names

`Jade & Kaelie` are named as mentors on the home page crew grid and are carried
through to `/about/` on that basis. No surname appears anywhere, and no mentor is
named in any PDF.

**Action:** confirm whether full names should be published.

### The SoftSense link is a forward reference

`/about/` links twice to `/projects/softsense/`, which is created in the next
phase. Between the Phase 4 and Phase 5 deploys those two links resolve to the 404
page. This is by design in the build order and is resolved by the Phase 5 merge.

## Phase 5 — /projects/softsense/

### The competition PDF and the repository disagree, because they are different dates

`internationals-innovation-documentation.pdf` is the version submitted for judging and
was frozen before departure in June 2026. The GitHub repository README is dated
**July 2026** and describes itself as the finished, consolidated record after the
competition. Several load-bearing numbers changed between them.

| Item | Competition PDF, June 2026 | Repository, July 2026 |
| --- | --- | --- |
| Right-angle stage | Crown gear plus spur pinion, 24/9 = 2.667:1 | Straight bevel pair, 12T on 6T = 2.0, module 1.8, 25 degree PA |
| Printed part count | 17 | 25 |
| Assembly method | Fastener-free snap pins | 8 heat-stake pins plus 8 caps melted into thermal rivets; a soldering iron is required |
| Actuator mount | Bottom D-flat coupler | Female Feetech 25T spline socket, servo presses straight in |
| Fingertip opening at 1x | About 124 mm | About 118 mm |
| Corrected margin at the 12 N probe | 4.1 to 6.2 times | 3.8 to 5.7 times |
| Margin at deliverable force | About 120 to 300 times | About 120 to 365 times |

The page at `/projects/softsense/` is written from the **repository**, because it is the
later and final state of the project, and the page for the PDF under
`/docs/fll-2025-2026/` is written from the **PDF**, because that page exists to
reproduce the submitted document. So the two pages state different part counts and a
different gear stage on purpose.

**Action:** confirm that is the right call. The alternative is to annotate the document
page with the post-competition corrections, which would break its role as a faithful
reproduction of what the judges saw.

### The repository contradicts itself on the gear ratio

`README.md` describes the shipped right-angle stage as a bevel pair with a **2.0** ratio.
`motor/SENSING.md` still uses **i_g = 2.667** in the forward sensing model, which is the
old crown-and-pinion ratio. Those cannot both be right, and the ratio feeds directly into
the current-to-force conversion, so a stale value biases every force estimate by about
33 per cent.

The SoftSense page therefore describes the bevel stage without asserting a single ratio.

**Action, and this is a real bug rather than a documentation nit:** reconcile `i_g` in
`motor/SENSING.md` and `motor/MOTOR_MODEL.md` against the shipped bevel pair, and re-run
`motor/scripts/drivetrain_force_envelope.py`.

### The Korea Open award name is still unknown

The repository README says "Project complete (July 2026), prize winner. The full
SoftSense project took home a prize at its competition", and the repository description
says "prize-winning". Neither names the award. See the Phase 3 note; this is the same gap.

### Figures are reused from the competition PDF

Every figure on the SoftSense page is extracted from
`internationals-innovation-documentation.pdf`, because that is the source this build has
access to. The repository has a `renders/` directory with newer hero images, animations
and FEA montages that reflect the bevel-stage design.

**Action, low effort and high value:** pull two or three renders from `renders/` into
`img/projects/softsense/` and swap the hero and the mechanism figures. The current figures
show the crown-era geometry.

### Home page card

The SoftSense card on the home page was an `<a>` wrapping the whole tile and pointing
straight at GitHub. It is now a `div` with two links, a primary one to the new page and a
secondary one to the repository, because a nested anchor is invalid HTML. The hover, press
and scroll-reveal behaviour in `polish.css` and `polish.js` all key off `.project-card`
and are unaffected.

## Phase 6 — Media gallery

### The filenames do not describe the photographs

This is the significant finding of this phase. Five of the ten gallery files are
named after something that is not in the frame, and the previous alt text and
captions were generated from those filenames rather than from the images.

| File | What the name claims | What is actually in the frame |
| --- | --- | --- |
| `build-session.webp` | A build session | An outdoor gathering with a crowd of students ringed around an open space |
| `workshop-iteration.webp` | A workshop iteration | The same gathering, the same framing, seconds apart. It is a near duplicate of the file above |
| `prototype-testing.webp` | Prototype testing | The team lined up beside a draped pit table outside a brick building, with event volunteers in FIRST shirts |
| `outdoor-event-audience.webp` | An audience at an outdoor event | Accurate, but it is the same event as the two above |
| `team-group-photo.webp` | A team group photo | Accurate, but it is taken indoors in a meeting room with everyone wearing visitor passes |

All ten alt attributes and captions have been rewritten from the images themselves.
Nothing on the page now depends on a filename.

**Action:** `build-session.webp` and `workshop-iteration.webp` are near duplicate
frames of the same moment and both are on the page because the gallery is built as
ten tiles. One of them should probably be replaced with an actual build session or
workshop photograph, which the season clearly produced.

### No event names and no dates on the photographs

Not one of the ten files carries an event name or a date anywhere in the repository,
and none appears in any of the eight season PDFs. Each caption therefore describes what
is in the frame, confidently and without apology. The line that used to sit under the
lead announcing that the photographs arrived unlabelled has been removed, because
telling visitors what you do not know about your own season reads badly and helps
nobody.

What can be read off the images and is used: the Unearthed competition table and
mission models are visible in two of them, event volunteers are wearing FIRST branded
shirts in another, and the team is wearing visitor passes in the indoor shot.

**Action:** supply an event name and a date for each of the ten photographs. Now that
the three competition dates are known, most of these should be easy to place. The
`ImageObject` entries in the `ImageGallery` structured data are already shaped to carry
them, so it is a caption edit and a JSON field per photo.

### The indoor group photograph

`team-group-photo.webp` shows eight students in visitor passes with an adult host in
a bright modern meeting room. The season log records a run of industry visits in April
2026, including walk-in meetings that converted to same-day meetings with subsea
companies, and a site visit to the WA Shipwrecks Museum on 14 May 2026. The photo is
consistent with one of those, but nothing labels it, so the caption says only that it
is one of the site visits the season log records without saying which.

**Action:** identify the host and the organisation. If it is a sponsor visit, naming it
in the caption is worth doing.

### Captions were previously invisible

The ten captions were rendered as an overlay strip with `opacity: 0`, revealed only on
`:hover`. That means they were unreadable on any touch device and invisible by default
everywhere else. They are now persistent text below each image. The hover-only gradient
overlay was removed at the same time.

### Heading order

`sponsors/index.html` went straight from `h1` to the `h3` sponsor names. A real `h2`,
"Founding Supporters", now heads that band.

`sponsors/how-to/index.html` had a second, unreported skip: the four "where your
support goes" cards used `h4` under an `h2`. They are now `h3`. Both pages pass the
heading order check.
