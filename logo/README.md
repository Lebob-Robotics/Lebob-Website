# Lebob Robotics logo files

Assets from the Lebob Robotics brand kit, plus the pieces this site needed that
the kit archive did not ship. `brand-kit.html` carries the full rules; open it
in a browser.

## The grid

The cockatoo sits on 88 by 90 squares. Call one square **u**.

| Element | Pixel size |
| --- | --- |
| The bird | 1u |
| ROBOTICS | 1u |
| LEBOB | 3u |
| Team number 3236 | 3u |

Clear space runs 8u, which matches one character cell of ROBOTICS, so you can
eyeball it off the wordmark. The gap between bird and wordmark runs 16u across
and 12u stacked. ROBOTICS carries 7u between letters.

LEBOB measures 114u across and ROBOTICS 112u. The two lines sit centred with 1u
to spare on each side.

## Files

| File | Use | Source |
| --- | --- | --- |
| `lebob-mark-primary.svg` | Bird alone, two colours. Nav, hero, favicon. | derived |
| `lebob-lockup-horizontal-primary.svg` | Bird beside wordmark, black type. Letterhead, print. | kit |
| `lebob-lockup-horizontal-onblack.svg` | Same, white type. Dark backgrounds. | derived |
| `lebob-lockup-stacked-primary.svg` | Bird above wordmark, black type. Shirt fronts, pit banner. | kit |
| `lebob-lockup-stacked-onblack.svg` | Same, white type. Dark backgrounds. | derived |
| `lebob-number-badge.svg` | FLL team number 3236 on a yellow bar. Shirt back, pit sign. | kit |

The kit archive shipped three files. The mark comes from the horizontal
lockup's first group, which holds the bird and nothing else, rewrapped in an
88 by 90 viewBox. The two `-onblack` lockups recolour the wordmark group from
`#000000` to `#FFFFFF` and change nothing else. Every lockup carries its type as
outlines, so a printer opens the file without hunting for a font.

The kit README also lists solid-silhouette marks, wordmark-only files, app-icon
tiles and a `png/` directory. None of those arrived. The raster icons this site
serves from `/img/` predate the kit and draw the same bird, so they stayed put.

## The pixel font

**Press Start 2P belongs in the logo and the team number. Keep it out of
everything else.** CodeMan38 drew it for an arcade screen at 8 pixels, in one
weight. IBM Plex Sans carries the reading.

On this site Press Start 2P sets one thing: the LEBOB wordmark in the home page
hero.

## Colour

| Pair | Ratio | Verdict |
| --- | --- | --- |
| Black on white | 21.0 | fine |
| White on black | 21.0 | fine |
| Black on yellow | 18.0 | fine |
| Yellow on `#1a1b1e` | 14.7 | fine |
| Red on black | 4.8 | fine |
| Red on `#1a1b1e` | 3.9 | fills and large type only |
| Red on white | 4.4 | large text only |
| Red on yellow | 3.8 | large text and graphics only |
| Yellow on white | 1.2 | unusable |

The kit writes its colour rules for print and for the white page: body copy in
black, red for headings above 24 px, never type in yellow. This site runs on
`#1a1b1e`, which inverts the first two. Light type carries the reading, yellow
sets links and accents at 14.7:1, and red drops to 3.9:1 against that
background. Red fills shapes here. It does not set type.

## Smallest usable size

Screen: primary mark 88 px, one-colour mark 48 px, horizontal lockup 218 px,
app icon tile 48 px. Print: digital 25 mm, screen print 45 mm, embroidery
one-colour only at 70 mm.

Below 218 px, drop ROBOTICS and run the mark with LEBOB. The site nav does
this, though at 36 px it runs the mark below the kit's 88 px screen minimum. A
64 px nav bar leaves no room for 88 px of bird, so the nav trades the rule for a
usable header.

## The flat right cheek

The bird's right side ends flat. That is how Andre drew it, not a canvas clip,
and every file here keeps it. The kit README describes it as ten lost rows of a
clipped cheek and proposes closing it with about a dozen red squares. Ignore
that section. Nothing is missing.

## Favicon

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/logo/lebob-mark-primary.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/img/apple-touch-icon.png">
```

## Typefaces

Both carry the SIL Open Font License, so shirts and signage cost nothing extra.

- Press Start 2P: <https://fonts.google.com/specimen/Press+Start+2P>
- IBM Plex Sans: <https://fonts.google.com/specimen/IBM+Plex+Sans>
