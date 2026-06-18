# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Knowledge base

The persistent multi-project KB is at `C:\Users\Constantin\wolfthemes-dev\wolf-claude-memory` (WSL: `/mnt/c/Users/Constantin/wolfthemes-dev/wolf-claude-memory/`). Read its `CLAUDE.md` for schema. The wolf-store product page is at `wiki/products/wolf-store/README.md`. Update the KB when architecture or significant features change.

## Commands

```bash
# Install dependencies
composer install
npm install

# JS: watch with BrowserSync (proxies http://localhost:8080/)
npm run start

# JS: production build
npm run build

# PHP linting (WordPress + VIP standards)
npm run lint:php
# or: ./vendor/bin/phpcs --standard=phpcs.xml.dist -v

# PHP auto-fix
npm run format:php
# or: ./vendor/bin/phpcbf --standard=phpcs.xml.dist -v

# JS linting
npm run lint:js

# CSS/SCSS linting
npm run lint:css

# TypeScript type-check (no emit)
npm run type-check

# PHP unit tests
./vendor/bin/phpunit
```

BrowserSync polls for file changes (WSL requirement) — no `.env` is needed for the proxy unless the port differs from 8080.

## Architecture

### PHP backend

`wolf-store.php` → `autoload.php` → `Functions/Core/Plugin` (singleton, accessed via `wolf_store()`).

`Plugin::init()` wires all subsystems in one place:

| Class | Role |
|---|---|
| `Post_Types\Post_Type` | Registers the `wolf_theme` CPT |
| `Taxonomies\Taxonomies` | Registers `theme_cat` and `theme_tag` |
| `Core\Rest_Fields` | Exposes custom fields on `/wp-json/wp/v2/wolf_theme` |
| `Admin\Admin_Handler` | Loads `Metabox_Manager`, `Admin_Columns`, `Options` (admin-only) |
| `Frontend\Frontend_Handler` | Loads `Template`, `Hooks`, `Enqueues` (frontend-only) |
| `Elementor\Theme_Index_Widget` | Registered on both contexts when Elementor is active |

**Config/Handler separation** — `Functions/Config/` classes (`Metabox_Config`, `Options_Params`, `Taxonomy_Config`, `Theme_Index_Params`) return plain arrays with no side effects. Handler classes read from them and attach WordPress hooks. Add new fields or options in Config, not in Handlers.

**Namespace → path mapping**: `Wolf_Store\Admin\Metabox_Manager` → `Functions/Admin/Metabox_Manager.php`. The PSR-4 root is `Wolf_Store\` mapped to `Functions/`.

**Meta layer** (`Functions/Core/Meta.php`) — static helper that resolves theme metadata with a priority chain:
1. Post meta override (e.g. `_wolf_theme_slug`)
2. Convention URL / derived slug (first segment of post slug before `-`)
3. Remote JSON fetched from `changelog.wolfthemes.cloud` and `assets.wolfthemes.cloud`, cached for 1 hour via WordPress transients

### REST API

All custom fields are registered in `Rest_Fields::register_fields()` as read-only. Fields sourced from `theme_meta.json` include `theme_features`, `theme_key_benefits`, `theme_selling_points`, `theme_target_audience`, `theme_use_cases`, `theme_included_plugins`, `theme_design_features`, and `theme_testimonials`. The `orderby=featured` parameter uses a raw `posts_clauses` LEFT JOIN (not `meta_query`) to avoid WP core bug #29447 where `INNER JOIN` drops posts that lack the meta key.

Data is passed from PHP to React via `wp_localize_script` as `window.wolfStoreData` (see `Frontend\Enqueues`).

### React frontend

Entry: `src/scripts/plugin.js` → compiled to `build/app.js`.

The React app mounts on `#wolf-store-root` injected by PHP templates. It is a "React island" — WordPress handles header/footer/navigation in PHP.

- `src/scripts/components/Archive.jsx` — theme grid with filtering, search, and pagination
- `src/scripts/components/Single.jsx` — theme detail page, composed from `ThemeHero`, `ThemeGallery`, `ThemeDescription`, `ThemeFeatures`, `ThemeBenefits`, `ThemeBrandStory`, `ThemeCTAs`, `ThemeComparisonTable`, `ThemeChangelog`, `ThemeTechnicals`, `ThemeTestimonials`, `StickyCTA`, `RelatedThemes`
- `src/scripts/components/ThemeCard.jsx` — archive card showing category badge and page builder label
- `src/scripts/components/Sidebar.jsx` — taxonomy filter panel
- `src/scripts/components/SearchBar.jsx` — keyword search across archive
- `src/scripts/components/RelatedThemes.jsx` — similar themes by category on single pages
- `src/scripts/components/StickyCTA.jsx` — sticky purchase bar on single pages
- `src/scripts/components/CountdownTimer.jsx` — offer countdown display
- `src/scripts/components/SkeletonCard.jsx` / `SkeletonSingle.jsx` — loading skeletons
- `src/scripts/components/ErrorBoundary.jsx` — React error boundary
- `src/scripts/components/hooks/useThemes.js` — paginated archive fetch
- `src/scripts/components/hooks/useTheme.js` — single theme fetch
- `src/scripts/components/hooks/useTerms.js` — taxonomy term fetch for filters

### Template loading

`Frontend_Handler::template_loader()` intercepts `template_include`. Templates live in `templates/` and are overridable by themes placing files in `wp-content/themes/<theme>/wolf-store/`. The "store page" is a regular WordPress page whose ID is stored in plugin options (`Core\Core::get_store_page_id()`); it renders the archive template.

### Build outputs

Webpack (`@wordpress/scripts` base config + BrowserSync + ts-loader) produces four bundles in `build/`:

| Entry | Output | Purpose |
|---|---|---|
| `src/scripts/plugin.js` | `build/app.js` | React frontend app |
| `src/admin/columns.js` | `build/admin.js` | Admin list column JS |
| `src/styles/main.scss` | `build/styles.css` | Frontend styles |
| `src/styles/admin.scss` | `build/editor.css` | Admin/editor styles |

### Coding standards

PHP must pass `WordPress` + `WordPressVIPMinimum` rulesets. All globals and functions must be prefixed `wolf_store_` or `Wolf_Store`. Custom escape functions (`wolf_store_kses`, `wolf_store_sanitize_html_classes`, `wolf_store_esc_style_attr`) are registered as auto-escaped in `phpcs.xml.dist`.

### CSS token system

All design values (spacing, color, typography sizes) are defined as `--ws-*` CSS custom properties in `src/styles/_tokens.scss`. Component SCSS files reference these tokens rather than hard-coding values. SCSS utility functions (e.g. `sp()` for spacing) are also defined there. Do not hard-code spacing or color values in component SCSS — always use a token or derive from one.

### Styles structure

```
src/styles/
├── _tokens.scss         # --ws-* CSS custom properties + SCSS functions
├── _var.scss            # Legacy SCSS variables (being migrated to tokens)
├── _archive.scss        # Archive grid layout
├── _card.scss           # Theme card styles
├── _single.scss         # Single page layout
├── _themes.scss         # Shared theme list utilities
├── main.scss            # Entry — imports all partials
├── admin.scss           # Admin-only styles entry
├── components/          # Per-component BEM partials
│   ├── _hero.scss, _gallery.scss, _stats.scss, _features.scss
│   ├── _benefits.scss, _brand-story.scss, _ctas.scss, _sticky-cta.scss
│   ├── _comparison-table.scss, _price-box.scss, _changelog.scss
│   ├── _technicals.scss, _testimonials.scss, _sidebar.scss, _loading.scss
└── vendor/
    └── _fancybox.scss   # Fancybox lightbox overrides
```

### Fancybox gallery

`ThemeGallery.jsx` uses [Fancybox](https://fancyapps.com/fancybox/) for lightbox functionality. The library is enqueued in `Functions/Frontend/Enqueues.php`. Styles are overridden in `src/styles/vendor/_fancybox.scss` and imported via `main.scss`.

### Offer / coupon management

`src/scripts/config/offers.js` is the single source of truth for active promotions. Set `ACTIVE_OFFER = null` to disable. The `withCoupon(url)` helper appends `?coupon=CODE` to any purchase URL; all buy-button components import it from there. `discounted(price)` applies the discount factor for display.

### Deployment

GitHub Actions (`.github/workflows/deploy.yml`) SSHes into the server and runs `git pull` + `composer install`. Push to `master` deploys to production; push to `dev` targets staging. The `build/` directory is **gitignored** — CI runs `npm ci && npm run build` and rsyncs the output to the server via rsync before swapping it into place, so the server never needs Node.

Git remote: git@github.com:wolfthemes/wolf-store.git — this repo only.
