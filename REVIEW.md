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

### The FLL team number is confirmed, the FTC one is not

`TEAM LEBOB #3236` appears throughout `internationals-robot-design-documentation.pdf`
as a running header. That confirms the FLL team number.

There is **no occurrence of "FTC" or "Tech Challenge" in any of the eight PDFs**,
and no FTC team number anywhere in the repository. See the Phase 4 section below.

### Slide 1 of the presentation reads "FLL Team KOI34"

The title slide of `internationals-presentation.pdf` reads
`TEAM LEBOB | FLL Team KOI34 - Perth, Western Australia`. That is inconsistent with
`#3236` used in the robot design document. `KOI34` looks like a Korea Open
Invitational entry code rather than a team number, but nothing in the documents
says so, so it has not been used anywhere on the site.

**Action:** confirm what `KOI34` is. If it is the Korea Open entry identifier it is
worth stating on `/about/` as such.

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

### Dates

- **Regionals.** The nationals log opens with "1st of December (one day after
  regionals)", which puts regionals on **30 November 2025**. That is an inference
  from one line, so it is not stated as a date on any page.
- **Nationals.** No date for the national competition appears in any of the eight
  PDFs. The season log runs weekly to 11 December 2025 without naming the event day.
- **Korea Open.** Departure is stated as 3 July 2026. The competition dates
  themselves are not in the documents.

`datePublished` on the three internationals `TechArticle` blocks is therefore set to
the year `2026` only. The regionals and nationals documents carry no `datePublished`
at all, because none is evidenced.

**Action:** supply the regionals, nationals and Korea Open competition dates. The
results table on `/about/` cannot be complete without them.
