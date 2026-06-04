# Wolf Store — WordPress Plugin

A modern WordPress theme store plugin built with a clean OOP PHP architecture and a React frontend powered by the WP REST API.

> ⚠️ This project is currently in active development and serves as both a functional plugin and a portfolio piece demonstrating modern WordPress + React development practices.

[Staging Website](https://staging20.wolfthemes.com/store/)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | PHP 8.1+, WordPress OOP, WP REST API |
| Frontend | React 18, JSX |
| Build | Webpack via `@wordpress/scripts` + BrowserSync |
| Styles | SCSS (BEM) |
| Standards | PSR-4 autoloading via Composer, WordPress + VIP coding standards |

---

## Architecture

The plugin follows a strict separation of concerns, inspired by WooCommerce's architecture.

```
wolf-store/
├── Functions/
│   ├── Admin/           # Admin UI: metaboxes, settings panel, columns
│   ├── Config/          # Pure configuration classes (metaboxes, options, taxonomies)
│   ├── Core/            # Plugin bootstrap, REST fields, meta resolution, utilities
│   ├── Frontend/        # Template loading, asset enqueuing, hooks
│   ├── Post_Types/      # Custom post type registration
│   └── Taxonomies/      # Custom taxonomy registration
├── src/
│   ├── scripts/
│   │   ├── plugin.js            # JS entry point
│   │   ├── config/
│   │   │   └── offers.js        # Centralized coupon/offer config
│   │   └── components/          # React components
│   │       ├── Archive.jsx      # Theme grid with filtering
│   │       ├── Single.jsx       # Single theme page (composes all sections)
│   │       ├── ThemeHero.jsx
│   │       ├── ThemeDescription.jsx
│   │       ├── ThemeStats.jsx         # Animated count-up stats
│   │       ├── ThemeFeatures.jsx      # Key benefits / target audience columns
│   │       ├── ThemeComparisonTable.jsx  # WolfThemes vs ThemeForest pricing
│   │       ├── ThemePriceBox.jsx
│   │       ├── ThemeGallery.jsx
│   │       ├── ThemeChangelog.jsx
│   │       ├── ThemeTechnicals.jsx
│   │       ├── ThemeTestimonials.jsx
│   │       └── hooks/           # useThemes, useTheme, useTerms
│   └── styles/
│       ├── main.scss            # SCSS entry — imports all component partials
│       └── components/          # Per-component SCSS partials (BEM)
├── templates/           # PHP templates (theme-overridable)
│   ├── archive-wolf_theme.php
│   └── single-wolf_theme.php
├── build/               # Compiled assets — gitignored, built by CI
└── wolf-store.php       # Plugin entry point
```

### Key Patterns

**Singleton + global helper** — `wolf_store()` returns the main plugin instance, following WooCommerce's `WC()` pattern.

**Config/Handler separation** — configuration is isolated in `Config/` classes (plain arrays, no side effects). Handlers read from config and wire up WordPress hooks.

**Meta resolution chain** (`Functions/Core/Meta.php`) — theme metadata is resolved in priority order: post meta override → derived slug → remote JSON (`changelog.wolfthemes.cloud` / `assets.wolfthemes.cloud`), cached 1 hour via WordPress transients.

**Template hierarchy** — templates follow WordPress's override convention. A theme can override any template by placing a file in `wp-content/themes/your-theme/wolf-store/`.

**React island** — PHP templates render a single `<div id="wolf-store-root">` mount point. React takes over from there, fetching data via the WP REST API. The WordPress theme (header, footer, navigation) remains in PHP.

---

## Features

- Custom post type `wolf_theme` with category and tag taxonomies
- Admin metabox manager with configurable field types (text, URL, select, repeatable, datepicker)
- Settings page with tabbed UI and field dependency support
- Template loader with theme override support
- React archive with sidebar filtering and pagination
- React single theme view with hero, gallery, stats, features, comparison table, changelog, and testimonials sections
- Animated count-up stats on scroll (`IntersectionObserver` + `requestAnimationFrame`)
- Centralized offer/coupon system — one file to enable, disable, or swap promotions (`src/scripts/config/offers.js`)
- REST API fields sourced from remote `theme_meta.json`: features, key benefits, selling points, target audience, use cases, included plugins, design features, testimonials, pricing
- Schema.org `Product` microdata

---

## Development Setup

### Requirements

- PHP 8.1+
- Node.js 20+
- Composer
- A local WordPress install (tested with LocalWP / Docker)

### Install

```bash
composer install
npm install
```

### Build

```bash
# Development — watch + BrowserSync (proxies http://localhost:8080/)
npm run start

# Production build
npm run build
```

### Linting

```bash
npm run lint:php    # WordPress + VIP standards
npm run format:php  # Auto-fix PHP
npm run lint:js
npm run lint:css
npm run type-check  # TypeScript (no emit)
```

---

## Deployment

Automated via GitHub Actions (`.github/workflows/deploy.yml`):

- Push to `master` → deploys to **production**
- Push to `dev` → deploys to **staging**

The workflow runs `npm ci && npm run build`, rsyncs the `build/` output to the server, then SSHs in to run `git pull` + `composer install`. The `build/` directory is gitignored — the server never needs Node.

Secrets required: `SSH_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY`, `SSH_PORT`.

---

## REST API

```
GET /wp-json/wp/v2/wolf_theme?per_page=12&page=1&_embed
```

Data passed from PHP to React via `wp_localize_script` as `window.wolfStoreData`:

```js
window.wolfStoreData = {
    restUrl:    '/wp-json/wp/v2/wolf_theme',
    restNonce:  '...',
    perPage:    12,
    pagination: 'numbers',
    siteUrl:    'https://example.com',
}
```

---

## Status

| Area | Status |
|---|---|
| Plugin bootstrap & CPT | ✅ Done |
| Taxonomies | ✅ Done |
| Admin metaboxes | ✅ Done |
| Settings page | ✅ Done |
| Template loader | ✅ Done |
| React archive view | ✅ Done |
| Sidebar taxonomy filter | ✅ Done |
| React single view | ✅ Done |
| REST API field exposure | ✅ Done |
| Offer / coupon system | ✅ Done |
| SCSS styling | 🚧 In progress |
| Elementor widget | 🚧 In progress |

---

## Roadmap

- **Multi-select taxonomy filter** — allow visitors to filter by multiple categories/tags simultaneously in the archive sidebar
- **Search bar** — keyword search across theme name, taxonomy, and metadata directly in the archive
- **Related themes** — display similar themes by category at the bottom of single theme pages
- **Entrance animations** — scroll-triggered reveal animations on key sections and UI elements
- **Performance** — REST response caching, lazy loading optimisations, bundle size audit
- **PHP unit test coverage** — expand test suite to cover the Meta resolution chain and REST field registration

---

## Author

**Constantin Saguin** — WordPress developer with a focus on modern, maintainable plugin architecture and React-powered frontend experiences.

- Looking for new opportunities — open to freelance and full-time roles.
