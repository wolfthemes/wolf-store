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
| Build | Webpack via `@wordpress/scripts` |
| Styles | SCSS |
| Standards | PSR-4 autoloading via Composer, PSR-12 coding style |

---

## Architecture

The plugin follows a strict separation of concerns, inspired by WooCommerce's architecture.

```
wolf-store/
├── Functions/
│   ├── Admin/           # Admin UI: metaboxes, settings panel, columns
│   ├── Config/          # Pure configuration classes (metaboxes, options, taxonomies)
│   ├── Core/            # Plugin bootstrap, constants, utilities
│   ├── Frontend/        # Template loading, asset enqueuing, hooks
│   ├── Post_Types/      # Custom post type registration
│   └── Taxonomies/      # Custom taxonomy registration
├── src/
│   ├── scripts/
│   │   ├── plugin.js            # JS entry point
│   │   └── wolf-store/          # React app
│   │       ├── index.jsx        # React root — mounts on #wolf-store-root
│   │       ├── components/      # Archive, Single, ThemeCard, Pagination
│   │       └── hooks/           # useThemes, useTheme (WP REST API)
│   └── styles/          # SCSS
├── templates/           # PHP templates (theme-overridable)
│   ├── archive-wolf_theme.php
│   ├── single-wolf_theme.php
│   └── partials/
├── build/               # Compiled assets (git-ignored)
└── wolf-store.php       # Plugin entry point
```

### Key Patterns

**Singleton + global helper** — `wolf_store()` returns the main plugin instance, following WooCommerce's `WC()` pattern.

**Config/Handler separation** — configuration is isolated in `Config/` classes (plain arrays, no side effects). Handlers read from config and wire up WordPress hooks. This makes configuration easy to read and test independently.

**Template hierarchy** — templates follow WordPress's override convention. A theme can override any template by placing a file in `wp-content/themes/your-theme/wolf-store/`.

**React island** — PHP templates render a single `<div id="wolf-store-root">` mount point. React takes over from there, fetching data via the WP REST API (`/wp-json/wp/v2/wolf_theme`). The WordPress theme (header, footer, navigation) remains in PHP — no full headless setup required.

---

## Features

- Custom post type `wolf_theme` with category and tag taxonomies
- Admin metabox manager with configurable field types (text, URL, select, repeatable, datepicker)
- Settings page with tabbed UI and field dependency support
- Template loader with theme override support
- React archive and single product views consuming the WP REST API
- Schema.org `Product` microdata
- Body class and generator tag hooks

---

## Development Setup

### Requirements

- PHP 8.1+
- Node.js 18+
- Composer
- A local WordPress install (tested with LocalWP)

### Install

```bash
# PHP dependencies
composer install

# JS dependencies
npm install
```

### Build

```bash
# Development with watch + BrowserSync
npm run start

# Production build
npm run build
```

### Deployment

Deployment is automated via GitHub Actions. Any push to the `master` branch triggers a workflow that SSHs into my server and runs `git pull` + `composer install` on the staging environment.

_Note that once the project is shipped, the "master/main" branch will be reserved to production and we will deploy on staging environment via a "dev" or "stage" branch_

```
.github/workflows/deploy.yml
```

Secrets required in the GitHub repository:
- `SSH_HOST`
- `SSH_USER`
- `SSH_PRIVATE_KEY`
- `SSH_PORT`

### REST API

The React frontend consumes the standard WP REST API endpoint:

```
GET /wp-json/wp/v2/wolf_theme?per_page=12&page=1&_embed
```

Data passed from PHP to React via `wp_localize_script`:

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
| PHP archive template | ✅ Done |
| PHP single template | ✅ Done |
| React archive view | 🚧 In progress |
| React single view | 🚧 In progress |
| REST API field exposure | 🚧 In progress |
| SCSS styling | 🚧 In progress |

---

## Author

**Constantin Saguin** — WordPress developer with a focus on modern, maintainable plugin architecture and React-powered frontend experiences.

- Looking for new opportunities — open to freelance and full-time roles.
