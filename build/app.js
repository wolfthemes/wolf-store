/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/components/ElementorContent.jsx"
/*!*****************************************************!*\
  !*** ./src/scripts/components/ElementorContent.jsx ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ElementorContent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * ElementorContent
 *
 * Renders the WordPress post content (content.rendered) from the REST API.
 * When the post is built with Elementor, this is the fully-rendered HTML
 * Elementor produces — including sections, columns, widgets, etc.
 *
 * The component is intentionally a thin wrapper: Elementor's own CSS
 * (elementor-frontend.css) is already enqueued by WordPress on the page,
 * so the markup renders correctly without any extra styles here.
 *
 * Usage:
 *   <ElementorContent content={ theme.content?.rendered } />
 *
 * @param {string}  content   HTML string from content.rendered
 * @param {string}  className Extra class for the wrapper (optional)
 */
function ElementorContent({
  content,
  className = ''
}) {
  if (!content) return null;

  // Strip the empty-paragraph WordPress sometimes wraps around Elementor output
  const cleaned = content.trim();
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `wolf-theme-elementor-content${className ? ' ' + className : ''}`,
    dangerouslySetInnerHTML: {
      __html: cleaned
    }
  });
}

/***/ },

/***/ "./src/scripts/components/Single.jsx"
/*!*******************************************!*\
  !*** ./src/scripts/components/Single.jsx ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Single)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hooks_useTheme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hooks/useTheme */ "./src/scripts/components/hooks/useTheme.js");
/* harmony import */ var _ThemeHero__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ThemeHero */ "./src/scripts/components/ThemeHero.jsx");
/* harmony import */ var _ThemeFooter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeFooter */ "./src/scripts/components/ThemeFooter.jsx");
/* harmony import */ var _ThemeSidebar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeSidebar */ "./src/scripts/components/ThemeSidebar.jsx");
/* harmony import */ var _ThemePricing__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemePricing */ "./src/scripts/components/ThemePricing.jsx");






function Single({
  postId
}) {
  const {
    theme,
    loading,
    error
  } = (0,_hooks_useTheme__WEBPACK_IMPORTED_MODULE_1__.useTheme)(postId);
  if (loading) return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-store-loading"
  }, "Loading...");
  if (error) return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-store-error"
  }, error);
  if (!theme) return null;
  const content = theme.content?.rendered;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-single"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-single__main"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ThemeHero__WEBPACK_IMPORTED_MODULE_2__["default"], {
    theme: theme
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ThemeFooter__WEBPACK_IMPORTED_MODULE_3__["default"], {
    theme: theme
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ThemePricing__WEBPACK_IMPORTED_MODULE_5__["default"], {
    theme: theme
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("aside", {
    className: "wolf-theme-single__sidebar"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ThemeSidebar__WEBPACK_IMPORTED_MODULE_4__["default"], {
    theme: theme
  })));
}

/***/ },

/***/ "./src/scripts/components/ThemeCTAs.jsx"
/*!**********************************************!*\
  !*** ./src/scripts/components/ThemeCTAs.jsx ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThemeCTAs)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * ThemeCTAs
 *
 * Reusable CTA buttons — demo + purchase.
 * Renders in both the hero and the sidebar.
 *
 * @param {string}  demoUrl   Live-demo URL
 * @param {string}  buyUrl    Purchase URL
 * @param {string}  layout    'row' (default) | 'column'
 */
function ThemeCTAs({
  demoUrl,
  buyUrl,
  layout = 'row'
}) {
  if (!demoUrl && !buyUrl) return null;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `wolf-theme-ctas wolf-theme-ctas--${layout}`
  }, buyUrl && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: buyUrl,
    className: "theme-button-primary wolf-core-button-size-md wolf-theme-ctas__btn wolf-theme-ctas__btn--buy",
    rel: "noopener noreferrer"
  }, "Purchase"), demoUrl && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: demoUrl,
    className: "theme-button-secondary wolf-core-button-size-md wolf-theme-ctas__btn wolf-theme-ctas__btn--demo",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Live Demo"));
}

/***/ },

/***/ "./src/scripts/components/ThemeChangelog.jsx"
/*!***************************************************!*\
  !*** ./src/scripts/components/ThemeChangelog.jsx ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThemeChangelog)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function ThemeChangelog({
  changelog
}) {
  const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  if (!changelog) return null;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-changelog"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "wolf-theme-changelog__toggle",
    onClick: () => setOpen(!open)
  }, open ? 'Hide changelog ↑' : 'View changelog ↓'), open && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-changelog__content",
    dangerouslySetInnerHTML: {
      __html: changelog
    }
  }));
}

/***/ },

/***/ "./src/scripts/components/ThemeFooter.jsx"
/*!************************************************!*\
  !*** ./src/scripts/components/ThemeFooter.jsx ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThemeFooter)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ThemeChangelog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ThemeChangelog */ "./src/scripts/components/ThemeChangelog.jsx");
/* harmony import */ var _ThemeCTAs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ThemeCTAs */ "./src/scripts/components/ThemeCTAs.jsx");




function ThemeFooter({
  theme
}) {
  var _theme$theme_features;
  const demoUrl = theme.theme_demo_url;
  const buyUrl = theme.theme_purchase_url;
  const features = (_theme$theme_features = theme.theme_features) !== null && _theme$theme_features !== void 0 ? _theme$theme_features : [];
  const changelog = theme.theme_changelog;
  const [changelogOpen, setChangelogOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-footer"
  }, features.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-hero__features"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "wolf-theme-hero__section-title"
  }, "Features"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "wolf-theme-hero__features-list"
  }, features.map((feature, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    key: i
  }, feature)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ThemeChangelog__WEBPACK_IMPORTED_MODULE_1__["default"], {
    changelog: changelog
  }));
}

/***/ },

/***/ "./src/scripts/components/ThemeHero.jsx"
/*!**********************************************!*\
  !*** ./src/scripts/components/ThemeHero.jsx ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThemeHero)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ThemeChangelog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ThemeChangelog */ "./src/scripts/components/ThemeChangelog.jsx");
/* harmony import */ var _ThemeCTAs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ThemeCTAs */ "./src/scripts/components/ThemeCTAs.jsx");
/* harmony import */ var _ElementorContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ElementorContent */ "./src/scripts/components/ElementorContent.jsx");





function ThemeHero({
  theme
}) {
  const thumbnail = theme.theme_thumbnail;
  const title = theme.title?.rendered;
  const excerpt = theme.excerpt?.rendered;
  const description = theme.theme_short_description;
  const longDescription = theme.theme_long_description;
  const demoUrl = theme.theme_demo_url;
  const buyUrl = theme.theme_purchase_url;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-hero"
  }, thumbnail && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-hero__thumbnail"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: demoUrl,
    target: "_blank",
    rel: "noopener noreferrer"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: thumbnail,
    alt: title
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-hero__content"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
    className: "wolf-theme-hero__title"
  }, title), description && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "wolf-theme-hero__tagline"
  }, description), excerpt && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-hero__excerpt",
    dangerouslySetInnerHTML: {
      __html: excerpt
    }
  }), longDescription && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-hero__description"
  }, longDescription), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ThemeCTAs__WEBPACK_IMPORTED_MODULE_2__["default"], {
    demoUrl: demoUrl,
    buyUrl: buyUrl,
    layout: "row"
  })));
}

/***/ },

/***/ "./src/scripts/components/ThemePriceBox.jsx"
/*!**************************************************!*\
  !*** ./src/scripts/components/ThemePriceBox.jsx ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThemePriceBox)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * ThemePriceBox
 *
 * Evaluation zone — price display only, no CTAs.
 * Annual is the hero, monthly shown as entry anchor below.
 * TF price struck at top sets the reference point.
 */
function ThemePriceBox({
  theme
}) {
  var _theme$theme_pricing;
  const {
    tf_price,
    price_monthly,
    price_annual,
    price_lifetime
  } = (_theme$theme_pricing = theme.theme_pricing) !== null && _theme$theme_pricing !== void 0 ? _theme$theme_pricing : {};
  if (!tf_price && !price_annual && !price_monthly && !price_lifetime) return null;
  const hasSaving = price_annual && tf_price && price_annual < tf_price;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-price-box"
  }, tf_price && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-price-box__reference"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-price-box__reference-label"
  }, "On ThemeForest"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-price-box__reference-price"
  }, "$", tf_price)), price_annual || price_monthly || price_lifetime ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-price-box__wolf"
  }, price_annual ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-price-box__hero"
  }, hasSaving && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-price-box__badge"
  }, "Best value \u2014 save $", Math.round(tf_price - price_annual)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-price-box__hero-amount"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("sup", null, "$"), price_annual, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-price-box__hero-period"
  }, "/year"))) : price_lifetime ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-price-box__hero"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-price-box__hero-amount"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("sup", null, "$"), price_lifetime, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-price-box__hero-period"
  }, " lifetime"))) : null, price_monthly && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-price-box__secondary"
  }, "or ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, "$", price_monthly), "/mo")) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-price-box__coming-soon"
  }, "New pricing coming soon"));
}

/***/ },

/***/ "./src/scripts/components/ThemePricing.jsx"
/*!*************************************************!*\
  !*** ./src/scripts/components/ThemePricing.jsx ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThemePricing)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * ThemePricing
 *
 * WolfThemes vs ThemeForest pricing comparison table.
 * Renders at the bottom of the main column in Single.jsx.
 * Gracefully handles unset Freemius prices with placeholder rows.
 *
 * @param {object} theme  Full theme REST object
 */
function ThemePricing({
  theme
}) {
  const buyUrl = theme.theme_purchase_url;
  const tfPrice = theme.theme_tf_price;
  const priceMonthly = theme.theme_price_monthly;
  const priceAnnual = theme.theme_price_annual;
  const priceLifetime = theme.theme_price_lifetime;
  const fmt = price => price ? `$${price}` : '—';
  const rows = [{
    feature: 'License',
    wolf: 'Flexible (monthly, annual, lifetime)',
    tf: 'Regular / Extended only',
    wolfWins: true
  }, {
    feature: 'Updates',
    wolf: '✓ Always included',
    tf: '✓ 6 months included',
    wolfWins: true
  }, {
    feature: 'Support',
    wolf: '✓ Included',
    tf: '✓ 6 months included',
    wolfWins: false
  }, {
    feature: 'Money-back',
    wolf: '✓ 7-day guarantee',
    tf: '✗ No refunds',
    wolfWins: true
  }, {
    feature: 'Direct from author',
    wolf: '✓ Yes',
    tf: '✗ Marketplace cut',
    wolfWins: true
  }];
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-pricing"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "wolf-theme-pricing__title"
  }, "Where to buy"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "wolf-theme-pricing__intro"
  }, "Get more flexibility buying directly from us."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-pricing__cards"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-pricing__card wolf-theme-pricing__card--wolf"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-pricing__card-header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-pricing__card-badge"
  }, "Best value"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "wolf-theme-pricing__card-title"
  }, "WolfThemes.com"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "wolf-theme-pricing__card-sub"
  }, "Buy directly from the author")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-pricing__card-prices"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-pricing__plan"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-pricing__plan-label"
  }, "Monthly"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-pricing__plan-price"
  }, fmt(priceMonthly), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("small", null, "/mo"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-pricing__plan"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-pricing__plan-label"
  }, "Annual"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-pricing__plan-price"
  }, fmt(priceAnnual), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("small", null, "/yr"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-pricing__plan"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-pricing__plan-label"
  }, "Lifetime"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-pricing__plan-price"
  }, fmt(priceLifetime)))), buyUrl && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: buyUrl,
    className: "wolf-theme-pricing__card-cta theme-button-primary wolf-core-button-size-md",
    rel: "noopener noreferrer"
  }, "Purchase on WolfThemes")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-pricing__card wolf-theme-pricing__card--tf"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-pricing__card-header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "wolf-theme-pricing__card-title"
  }, "ThemeForest"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "wolf-theme-pricing__card-sub"
  }, "Available on the marketplace")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-pricing__card-prices"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-pricing__plan"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-pricing__plan-label"
  }, "Regular license"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-pricing__plan-price"
  }, fmt(tfPrice), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("small", null, " one-time"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-pricing__plan wolf-theme-pricing__plan--muted"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-pricing__plan-label"
  }, "Extended license"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-pricing__plan-price"
  }, "\u2014")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-pricing__plan wolf-theme-pricing__plan--muted"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-pricing__plan-label"
  }, "Lifetime"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-pricing__plan-price"
  }, "\u2717"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://themeforest.net/user/wolfthemes/portfolio",
    className: "wolf-theme-pricing__card-cta theme-button-secondary wolf-core-button-size-md",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "View on ThemeForest"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
    className: "wolf-theme-pricing__table"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "\uD83D\uDC3A WolfThemes"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "ThemeForest"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, rows.map((row, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
    key: i,
    className: row.wolfWins ? 'wolf-theme-pricing__row--win' : ''
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "wolf-theme-pricing__feature"
  }, row.feature), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "wolf-theme-pricing__cell wolf-theme-pricing__cell--wolf"
  }, row.wolf), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "wolf-theme-pricing__cell wolf-theme-pricing__cell--tf"
  }, row.tf))))));
}

/***/ },

/***/ "./src/scripts/components/ThemeSidebar.jsx"
/*!*************************************************!*\
  !*** ./src/scripts/components/ThemeSidebar.jsx ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThemeSidebar)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ThemePriceBox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ThemePriceBox */ "./src/scripts/components/ThemePriceBox.jsx");


function ThemeSidebar({
  theme
}) {
  var _theme$theme_features, _theme$_embedded$wpT, _theme$_embedded$wpT2;
  const version = theme.theme_latest_version;
  const builder = theme.theme_builder;
  const requires = theme.theme_requires;
  const tested = theme.theme_tested;
  const updated = theme.modified?.split('T')[0];
  const shortlink = theme.theme_shortlink;
  const demoUrl = theme.theme_demo_url;
  const buyUrl = theme.theme_purchase_url;
  const features = (_theme$theme_features = theme.theme_features) !== null && _theme$theme_features !== void 0 ? _theme$theme_features : [];
  const slug = theme.theme_slug;
  const categories = (_theme$_embedded$wpT = theme._embedded?.['wp:term']?.[0]) !== null && _theme$_embedded$wpT !== void 0 ? _theme$_embedded$wpT : [];
  const tags = (_theme$_embedded$wpT2 = theme._embedded?.['wp:term']?.[1]) !== null && _theme$_embedded$wpT2 !== void 0 ? _theme$_embedded$wpT2 : [];
  const wikiUrl = `https://wiki.wolfthemes.com/`;
  const docUrl = `https://doc.wolfthemes.com/theme/${slug}/`;
  const forumUrl = `https://wolfthemes.com/support/`;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-sidebar"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ThemePriceBox__WEBPACK_IMPORTED_MODULE_1__["default"], {
    theme: theme
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-sidebar__ctas"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: buyUrl,
    className: "theme-button-primary wolf-core-button-size-md wolf-theme-sidebar__btn wolf-theme-sidebar__btn--buy",
    rel: "noopener noreferrer"
  }, "Purchase"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: demoUrl,
    className: "theme-button-secondary wolf-core-button-size-md wolf-theme-sidebar__btn wolf-theme-sidebar__btn--demo",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Live Demo")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-sidebar__benefits"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "wolf-theme-sidebar__section-title"
  }, "What's Included"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "wolf-theme-sidebar__benefits-list"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, "Product updates & improvements"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, "Customer support ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-sidebar__info",
    title: "Support is provided via our forum"
  }, "\u24D8")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, "7 days money-back guarantee"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-sidebar__support"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "wolf-theme-sidebar__section-title"
  }, "Support"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "wolf-theme-sidebar__support-links"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: docUrl,
    target: "_blank",
    rel: "noopener noreferrer"
  }, "\uD83D\uDCD6 Documentation")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: wikiUrl,
    target: "_blank",
    rel: "noopener noreferrer"
  }, "\uD83D\uDDC2\uFE0F Knowledge Base")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: forumUrl,
    target: "_blank",
    rel: "noopener noreferrer"
  }, "\uD83D\uDCAC Support Forum")))), categories.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-sidebar__terms"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "wolf-theme-sidebar__section-title"
  }, "Categories"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-sidebar__categories"
  }, categories.map(term => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    key: term.id,
    href: term.link,
    className: "wolf-theme-sidebar__category"
  }, term.name)))), tags.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-sidebar__terms"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "wolf-theme-sidebar__section-title"
  }, "Tags"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-sidebar__tags tagcloud"
  }, tags.map(term => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    key: term.id,
    href: term.link,
    className: "wolf-theme-sidebar__tag"
  }, term.name)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-sidebar__meta"
  }, version && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-sidebar__row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-sidebar__label"
  }, "Version"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-sidebar__value"
  }, version)), builder && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-sidebar__row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-sidebar__label"
  }, "Builder"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-sidebar__value"
  }, builder)), requires && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-sidebar__row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-sidebar__label"
  }, "Requires WP"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-sidebar__value"
  }, requires, "+")), tested && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-sidebar__row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-sidebar__label"
  }, "Tested up to"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-sidebar__value"
  }, tested)), updated && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-sidebar__row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-sidebar__label"
  }, "Last Update"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-sidebar__value"
  }, updated))));
}

/***/ },

/***/ "./src/scripts/components/hooks/useTheme.js"
/*!**************************************************!*\
  !*** ./src/scripts/components/hooks/useTheme.js ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useTheme: () => (/* binding */ useTheme)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function useTheme(postId) {
  const [theme, setTheme] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!postId) return;
    const {
      restUrl,
      restNonce
    } = window.wolfStoreData;
    fetch(`${restUrl}/${postId}?_embed`, {
      headers: {
        'X-WP-Nonce': restNonce
      }
    }).then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    }).then(data => {
      setTheme(data);
      setLoading(false);
    }).catch(err => {
      setError(err.message);
      setLoading(false);
    });
  }, [postId]);
  return {
    theme,
    loading,
    error
  };
}

/***/ },

/***/ "react"
/*!************************!*\
  !*** external "React" ***!
  \************************/
(module) {

module.exports = window["React"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "./node_modules/auto-bind/index.js"
/*!*****************************************!*\
  !*** ./node_modules/auto-bind/index.js ***!
  \*****************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ autoBind)
/* harmony export */ });
// Gets all non-builtin properties up the prototype chain.
const getAllProperties = object => {
	const properties = new Set();

	do {
		for (const key of Reflect.ownKeys(object)) {
			properties.add([object, key]);
		}
	} while ((object = Reflect.getPrototypeOf(object)) && object !== Object.prototype);

	return properties;
};

function autoBind(self, {include, exclude} = {}) {
	const filter = key => {
		const match = pattern => typeof pattern === 'string' ? key === pattern : pattern.test(key);

		if (include) {
			return include.some(match); // eslint-disable-line unicorn/no-array-callback-reference
		}

		if (exclude) {
			return !exclude.some(match); // eslint-disable-line unicorn/no-array-callback-reference
		}

		return true;
	};

	for (const [object, key] of getAllProperties(self.constructor.prototype)) {
		if (key === 'constructor' || !filter(key)) {
			continue;
		}

		const descriptor = Reflect.getOwnPropertyDescriptor(object, key);
		if (descriptor && typeof descriptor.value === 'function') {
			self[key] = self[key].bind(self);
		}
	}

	return self;
}


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*******************************!*\
  !*** ./src/scripts/plugin.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var auto_bind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! auto-bind */ "./node_modules/auto-bind/index.js");
/* harmony import */ var _components_Single__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Single */ "./src/scripts/components/Single.jsx");





class WolfStore {
  constructor() {
    (0,auto_bind__WEBPACK_IMPORTED_MODULE_2__["default"])(this);
    this.RenderRoot();
  }
  RenderRoot() {
    const root = document.getElementById('wolf-store-root');
    if (root) {
      const {
        type,
        postId
      } = root.dataset;
      const app = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createRoot)(root);
      if ('single' === type) {
        app.render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Single__WEBPACK_IMPORTED_MODULE_3__["default"], {
          postId: postId
        }));
      }
    }
  }
}
new WolfStore();
})();

/******/ })()
;
//# sourceMappingURL=app.js.map