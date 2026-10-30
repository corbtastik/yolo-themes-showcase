# yolo-themes-showcase

The Yolo design-system showcase deck, rendered once for **every theme in
[yolo-11ty](https://github.com/corbtastik/yolo-11ty)** — 67 decks, 11 slides
each, plus an index that lists them all.

```
npm install
npm run serve     # http://localhost:8080
npm run build     # -> _site/
```

## What's here

| Path | What it is |
| --- | --- |
| `src/index.njk` | The theme index: every theme as a card with light + dark previews |
| `src/decks.njk` | One page per theme, via Eleventy pagination over `themeList` |
| `src/_includes/layouts/deck.njk` | Deck shell — head, theme tokens, runtime |
| `src/_includes/deck/slides.njk` | The 11 slides, with colors expressed as tokens |
| `src/_data/themes.json` | Copied from yolo-11ty; the single source of palettes |
| `src/_data/themeList.js` | Flattens the grouped themes for pagination |
| `src/_data/motion.json` | Deck runtime motion config |
| `src/assets/deck-reset.css` | Minimal preflight for the slide markup |
| `src/assets/deck-fonts.css` | Space Mono, embedded as woff2 data URLs |
| `src/assets/deck-shell.css` | Slide sizing, scroll-snap, presenter and print styles |
| `src/assets/deck.js` | Deck runtime: scaling, keyboard nav, builds, fullscreen |

Output URLs are `/` for the index and `/decks/<theme-id>/` for each deck.

## How theming works

The deck began life with the star-lord palette hardcoded as inline `rgb()` and
hex literals. Every one of those is now a CSS custom property, and `deck.njk`
defines the properties per theme from `themes.json`:

| Token | Source | Token | Source |
| --- | --- | --- | --- |
| `--sl-d-bg` | `dark.bg` | `--sl-l-bg` | `light.bg` |
| `--sl-d-surface` | `dark.surface` | `--sl-l-surface` | `light.surface` |
| `--sl-d-border` | `dark.border` | `--sl-l-border` | `light.border` |
| `--sl-d-text` | `dark.text` | `--sl-l-text` | `light.text` |
| `--sl-d-heading` | `dark.heading` | `--sl-l-heading` | `light.heading` |
| `--sl-d-primary` | `dark.primary` | `--sl-l-primary` | `light.primary` |
| `--sl-d-kw` | `dark.shKeyword` | `--sl-d-str` | `dark.shString` |
| `--sl-d-fn` | `dark.shFunction` | `--sl-d-var` | `dark.shVariable` |
| `--sl-d-com` | `dark.shComment` | | |

Slides 1, 3, 5, 8 and 11 sit on the dark ground; 2, 4, 6, 7, 9 on the light
ground; slide 10 shows both side by side. Slide 8 paints the palette as syntax
colors, so inside its code sample and legend the literals resolve to the
`sh*` tokens instead of the page-chrome ones.

Star-lord-specific copy ("Hot pink.", the hex readouts on slides 4, 8 and 10,
"Navy and lavender grounds…") is templated, so each deck reads correctly for
its own palette. The four utility-fill swatches on slide 7 are deliberately
left unthemed — they are fixed semantic colors, not theme tokens.

## Regenerating

After pulling new themes into yolo-11ty:

```
npm run sync-themes   # copy themes.json across
npm run build
```

The slides themselves live in `src/_includes/deck/slides.njk`. Edit them there
— they are ordinary markup, and every color in them already resolves through a
token, so a change applies to all 67 decks at once.

## Deploying

Firebase Hosting, project `corbs-cloud`, site `yolo-themes-showcase`:

```
npm run deploy        # build + firebase deploy --only hosting
```

## Keyboard

`→` / `space` next, `←` previous, `f` fullscreen, `#n` in the URL jumps to
slide *n*. Printing gives one 1920×1080 page per slide.
