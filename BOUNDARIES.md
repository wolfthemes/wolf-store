# Wolf Store — Theme/Plugin CSS Boundary

## What wolf-store OWNS

- All React component structure and BEM class definitions
- Layout mechanics: `display`, `flex`, `grid`, `position`, `overflow`, `z-index`
- Structural dimensions: `aspect-ratio`, `object-fit`, `min-height`, `max-width` wrappers
- Responsive breakpoints and grid column counts
- Animation mechanics: `transition` timing references, `transform` on hover
- Sticky CTA bar positioning and scroll behavior
- Local CSS custom property aliases (`--theme-border-color`, `--accent-color`, etc.)
  that bridge theme tokens to component usage with safe fallbacks

## What wolf-store NEVER does

- Define raw color values — all colors must come from theme tokens or WP presets
- Define font-family names directly
- Define spacing scale values (use WP global spacing or component-local px values
  only where the layout truly owns the dimension)
- Override theme-owned elements like `.content-wrapper`, navigation, or the site header
  (the `_themes.scss` escape hatch is the only permitted exception, scoped to `.wp-theme-*`)

## CSS vars wolf-store expects from the theme

Every active theme MUST define these for the store to render correctly:

### WP preset tokens (via theme.json)
- `--wp--preset--color--base`          base background
- `--wp--preset--color--base-2`        subtle surface (card placeholder, filter bg)
- `--wp--preset--color--contrast`      body text / strong text
- `--wp--preset--color--primary`       accent hover / buy-button background
- `--wp--preset--color--accent`        primary accent (demo button tint)
- `--wp--preset--color--white`         explicit white (overlays, hero text)
- `--wp--preset--font-size--sm`        base font size for cards and meta
- `--wp--preset--font-family--heading` heading font (title in hero, card title)
- `--wp--preset--font-family--body`    body copy font
- `--wp--style--global--wide-size`     max-width for the single-theme wrapper
- `--wp--style--global--content-size`  narrower wrapper variant

### Wolf design tokens (via theme's global.css)
- `--wolf-border-color`      default border (card outlines, sidebar dividers)
- `--wolf-radius-md`         standard border-radius (cards, pagination btns, badges)
- `--wolf-btn-radius`        button-specific border-radius
- `--wolf-dur-slow`          slow transition duration (card CTA fade-in)
- `--wolf-ease-out`          easing function (card CTA fade-in)
- `--wolf-shadow-card`       card / price-box box-shadow

## CSS vars wolf-store exposes for theme overrides

These are defined in `src/styles/_var.scss` with fallbacks. Themes can redefine them
to adjust store appearance without touching plugin files.

```css
/* Alias layer — all ultimately resolve to WP presets or wolf tokens */
--strong-color            /* text on price, titles          → --wp--preset--color--contrast */
--background-color        /* page background                → --wp--preset--color--base     */
--accent-color            /* primary accent                 → --wp--preset--color--accent   */
--accent-hover-color      /* hover / buy-btn bg             → --wp--preset--color--primary  */
--theme-border-color      /* generic border                 → --wolf-border-color           */
--theme-border-radius     /* generic radius                 → --wolf-radius-md              */
--button-border-radius    /* button radius                  → --wolf-btn-radius             */
--theme-bg-color          /* surface / card bg              → --wp--preset--color--base     */
--theme-subtle-bg         /* muted surface (placeholder…)   → --wp--preset--color--base-2   */
--checkmark-color         /* green checkmark / badge        → (hardcoded fallback: #00a32a) */

/* Layout */
--single-theme-wrapper-width        /* → --wp--style--global--wide-size    */
--single-theme-wrapper-width-small  /* → --wp--style--global--content-size */
```

## Theme button class contract

The plugin adds `theme-button-primary` and `theme-button-secondary` to its CTA
elements. The theme is responsible for styling those classes. The plugin only
contributes layout-level overrides (`padding`, `font-size` in tight contexts like
the sticky bar) — never colors, backgrounds, or border-radius on those classes.

## Theme-specific escape hatch

`src/styles/_themes.scss` is the only place where per-theme selector overrides are
permitted. Rules there MUST be scoped to `.wp-theme-<slug>` so they never bleed.
Use it for layout exceptions (e.g. full-bleed single on FSE themes) or token
re-assignments, not for raw color patches.

## Known hardcoded values to migrate (violations)

These are tracked as CSS debt — every item here should eventually resolve to a token:

| Location | Hardcoded value | Target token |
|---|---|---|
| `_var.scss` | `--card-border-color: rgba(0,0,0,0.2)` | `--wolf-border-color` |
| `_var.scss` | `--box-shadow: 5px 5px 25px #02020254` | `--wolf-shadow-card` |
| `_var.scss` | `--text-shadow: 0 0 25px rgba(0,0,0,0.3)` | `--wolf-text-shadow` (to add) |
| `_hero.scss` | `color: #fff` on `.wolf-theme-hero__title` | `--wp--preset--color--white` |
| `_price-box.scss` | `background: #fff` on `.wolf-theme-price-box` | `--theme-bg-color` |
| `_price-box.scss` | `background: #000` on `&__badge` | `--strong-color` |
| `_price-box.scss` | `var(--black-color)` (undefined) | `--strong-color` |
| `_price-box.scss` | `color: #888` on struck amount | `opacity` on `--strong-color` |
| `_sticky-cta.scss` | `background: #f1f1f1` | `--theme-subtle-bg` |
