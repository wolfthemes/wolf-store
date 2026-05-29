/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/components/Archive.jsx"
/*!********************************************!*\
  !*** ./src/scripts/components/Archive.jsx ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Archive)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hooks_useThemes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hooks/useThemes */ "./src/scripts/components/hooks/useThemes.js");
/* harmony import */ var _ThemeCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ThemeCard */ "./src/scripts/components/ThemeCard.jsx");
/* harmony import */ var _SkeletonCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SkeletonCard */ "./src/scripts/components/SkeletonCard.jsx");
/* harmony import */ var _Pagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Pagination */ "./src/scripts/components/Pagination.jsx");
/* harmony import */ var _Sidebar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Sidebar */ "./src/scripts/components/Sidebar.jsx");







function Archive({
  taxonomy: taxonomyProp,
  termId: termIdProp,
  termName,
  perPage,
  pagination: paginationProp,
  featuredOnly,
  showSidebar = true
}) {
  const [page, setPage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1);
  const [activeTaxonomy, setActiveTaxonomy] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(taxonomyProp || '');
  const [activeTermId, setActiveTermId] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(parseInt(termIdProp) || 0);
  const {
    pagination: paginationGlobal,
    perPage: perPageGlobal
  } = window.wolfStoreData;
  const pagination = paginationProp || paginationGlobal;
  const skeletonCount = parseInt(perPage) || parseInt(perPageGlobal) || 12;
  const {
    themes,
    totalPages,
    loading,
    error
  } = (0,_hooks_useThemes__WEBPACK_IMPORTED_MODULE_1__.useThemes)({
    taxonomy: activeTaxonomy,
    termId: activeTermId,
    page,
    perPage: parseInt(perPage) || undefined,
    featuredOnly: featuredOnly === '1'
  });
  const handlePageChange = n => {
    setPage(n);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const handleFilterChange = (taxonomy, termId) => {
    setActiveTaxonomy(taxonomy);
    setActiveTermId(termId);
    setPage(1); // reset to page 1 on filter change
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-store-archive"
  }, termName && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "wolf-store-archive__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
    className: "wolf-store-archive__title"
  }, termName)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-store-archive__layout"
  }, showSidebar && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Sidebar__WEBPACK_IMPORTED_MODULE_5__["default"], {
    activeTaxonomy: activeTaxonomy,
    activeTermId: activeTermId,
    onChange: handleFilterChange
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-store-archive__content"
  }, error && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-store-error"
  }, error), !loading && !error && themes.length === 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "wolf-store-archive__empty"
  }, "No themes found."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-store-archive__grid"
  }, loading ? Array.from({
    length: skeletonCount
  }).map((_, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SkeletonCard__WEBPACK_IMPORTED_MODULE_3__["default"], {
    key: i
  })) : themes.map(theme => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ThemeCard__WEBPACK_IMPORTED_MODULE_2__["default"], {
    key: theme.id,
    theme: theme
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Pagination__WEBPACK_IMPORTED_MODULE_4__["default"], {
    page: page,
    totalPages: totalPages,
    onChange: handlePageChange,
    type: pagination
  }))));
}

/***/ },

/***/ "./src/scripts/components/Pagination.jsx"
/*!***********************************************!*\
  !*** ./src/scripts/components/Pagination.jsx ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Pagination)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function Pagination({
  page,
  totalPages,
  onChange,
  type
}) {
  if (totalPages <= 1) return null;
  if ('numbers' === type) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("nav", {
      className: "wolf-store-pagination",
      "aria-label": "Themes pagination"
    }, page > 1 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      className: "wolf-store-pagination__btn wolf-store-pagination__btn--prev",
      onClick: () => onChange(page - 1)
    }, "\u2039"), Array.from({
      length: totalPages
    }, (_, i) => i + 1).map(n => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      key: n,
      className: `wolf-store-pagination__btn${n === page ? ' wolf-store-pagination__btn--active' : ''}`,
      onClick: () => onChange(n),
      "aria-current": n === page ? 'page' : undefined
    }, n)), page < totalPages && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      className: "wolf-store-pagination__btn wolf-store-pagination__btn--next",
      onClick: () => onChange(page + 1)
    }, "\u203A"));
  }

  // 'none' or anything else — no pagination UI
  return null;
}

/***/ },

/***/ "./src/scripts/components/Sidebar.jsx"
/*!********************************************!*\
  !*** ./src/scripts/components/Sidebar.jsx ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Sidebar)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hooks_useTerms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hooks/useTerms */ "./src/scripts/components/hooks/useTerms.js");


function Sidebar({
  activeTaxonomy,
  activeTermId,
  onChange
}) {
  const {
    terms: cats
  } = (0,_hooks_useTerms__WEBPACK_IMPORTED_MODULE_1__.useTerms)('theme_cat');
  const {
    terms: tags
  } = (0,_hooks_useTerms__WEBPACK_IMPORTED_MODULE_1__.useTerms)('theme_tag');
  const handleClick = (e, taxonomy, termId) => {
    e.preventDefault();
    onChange(taxonomy, termId);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("aside", {
    className: "wolf-store-sidebar"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-store-sidebar__group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#",
    className: `wolf-store-sidebar__all${!activeTermId ? ' is-active' : ''}`,
    onClick: e => handleClick(e, '', 0)
  }, "All Themes")), cats.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-store-sidebar__group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "wolf-store-sidebar__title"
  }, "Categories"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "wolf-store-sidebar__list"
  }, cats.map(term => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    key: term.id
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#",
    className: `wolf-store-sidebar__term${activeTaxonomy === 'theme_cat' && activeTermId === term.id ? ' is-active' : ''}`,
    onClick: e => handleClick(e, 'theme_cat', term.id)
  }, term.name, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-store-sidebar__count"
  }, term.count)))))));
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
/* harmony import */ var _ThemeDescription__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeDescription */ "./src/scripts/components/ThemeDescription.jsx");
/* harmony import */ var _ThemeGallery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeGallery */ "./src/scripts/components/ThemeGallery.jsx");
/* harmony import */ var _ThemeTechnicals__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeTechnicals */ "./src/scripts/components/ThemeTechnicals.jsx");
/* harmony import */ var _ThemePricing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ThemePricing */ "./src/scripts/components/ThemePricing.jsx");
/* harmony import */ var _ThemeTestimonials__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ThemeTestimonials */ "./src/scripts/components/ThemeTestimonials.jsx");
/* harmony import */ var _ThemeFeatures__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ThemeFeatures */ "./src/scripts/components/ThemeFeatures.jsx");
/* harmony import */ var _ThemeChangelog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ThemeChangelog */ "./src/scripts/components/ThemeChangelog.jsx");
/* harmony import */ var _ThemeBrandStory__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ThemeBrandStory */ "./src/scripts/components/ThemeBrandStory.jsx");
/* harmony import */ var _SkeletonSingle__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./SkeletonSingle */ "./src/scripts/components/SkeletonSingle.jsx");





// import ThemeFooter    from './ThemeFooter';







function Single({
  postId
}) {
  const {
    theme,
    loading,
    error
  } = (0,_hooks_useTheme__WEBPACK_IMPORTED_MODULE_1__.useTheme)(postId);

  // if ( loading ) return <SkeletonSingle />;
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
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ThemeDescription__WEBPACK_IMPORTED_MODULE_3__["default"], {
    theme: theme
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ThemeGallery__WEBPACK_IMPORTED_MODULE_4__["default"], {
    theme: theme
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ThemePricing__WEBPACK_IMPORTED_MODULE_6__["default"], {
    theme: theme
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ThemeTestimonials__WEBPACK_IMPORTED_MODULE_7__["default"], {
    theme: theme
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ThemeFeatures__WEBPACK_IMPORTED_MODULE_8__["default"], {
    theme: theme
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ThemeBrandStory__WEBPACK_IMPORTED_MODULE_10__["default"], null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ThemeTechnicals__WEBPACK_IMPORTED_MODULE_5__["default"], {
    theme: theme
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ThemeChangelog__WEBPACK_IMPORTED_MODULE_9__["default"], {
    theme: theme
  })));
}

/***/ },

/***/ "./src/scripts/components/SkeletonCard.jsx"
/*!*************************************************!*\
  !*** ./src/scripts/components/SkeletonCard.jsx ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SkeletonCard)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function SkeletonCard() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("article", {
    className: "wolf-theme-card wolf-theme-card--skeleton"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-card__thumbnail-link"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-card__thumbnail wolf-skeleton"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-card__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-skeleton wolf-skeleton--title"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-skeleton wolf-skeleton--tagline"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-skeleton wolf-skeleton--tagline wolf-skeleton--tagline-short"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-card__cats"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-skeleton wolf-skeleton--cat"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("footer", {
    className: "wolf-theme-card__footer"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-skeleton wolf-skeleton--price"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-card__ctas"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-skeleton wolf-skeleton--btn"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-skeleton wolf-skeleton--btn"
  }))));
}

/***/ },

/***/ "./src/scripts/components/SkeletonSingle.jsx"
/*!***************************************************!*\
  !*** ./src/scripts/components/SkeletonSingle.jsx ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SkeletonSingle)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function SkeletonSingle() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-single"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-single__main"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-skeleton-single__hero"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-skeleton wolf-skeleton--single-title"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-skeleton wolf-skeleton--single-tagline"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-skeleton wolf-skeleton--single-thumbnail"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-skeleton wolf-skeleton--single-line"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-skeleton wolf-skeleton--single-line wolf-skeleton--single-line-short"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-skeleton wolf-skeleton--single-line"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("aside", {
    className: "wolf-theme-single__sidebar"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-skeleton-single__pricebox"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-skeleton wolf-skeleton--single-price-ref"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-skeleton wolf-skeleton--single-price-badge"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-skeleton wolf-skeleton--single-price-main"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-skeleton wolf-skeleton--single-price-sub"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-skeleton-single__ctas"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-skeleton wolf-skeleton--single-btn"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-skeleton wolf-skeleton--single-btn wolf-skeleton--single-btn-secondary"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-skeleton-single__meta"
  }, Array.from({
    length: 5
  }).map((_, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: i,
    className: "wolf-skeleton wolf-skeleton--single-meta-row"
  })))));
}

/***/ },

/***/ "./src/scripts/components/ThemeBenefits.jsx"
/*!**************************************************!*\
  !*** ./src/scripts/components/ThemeBenefits.jsx ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThemeBenefits)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function ThemeBenefits() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-benefits"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "wolf-theme-benefits__title"
  }, "What's Included"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "wolf-theme-benefits__list"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, "Lifetime theme access"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, "Ongoing updates included"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, "Direct support from the creator ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-benefits__info",
    title: "Support provided via our forum"
  }, "\u24D8")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, "7-day money-back guarantee")));
}

/***/ },

/***/ "./src/scripts/components/ThemeBrandStory.jsx"
/*!****************************************************!*\
  !*** ./src/scripts/components/ThemeBrandStory.jsx ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThemeBrandStory)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function ThemeBrandStory() {
  const {
    siteUrl
  } = window.wolfStoreData;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-brand-story wolf-theme-single__section"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-single__wrapper wolf-theme-single__wrapper--small"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-brand-story__container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-brand-story__inner"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-brand-story__avatar"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: `${siteUrl}/wp-content/plugins/wolf-store/assets/images/avatar.jpg`,
    alt: "Constantin \u2014 WolfThemes founder"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-brand-story__content"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "wolf-theme-brand-story__title"
  }, "Built by WolfThemes"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "wolf-theme-brand-story__text"
  }, "I'm Constantin, founder of WolfThemes. For over 14 years, I've been creating WordPress themes for musicians, artists, photographers, and creative professionals worldwide. My goal has always been simple \u2014 themes that feel genuinely premium, stay maintainable long-term, and come with real support when you need it."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "wolf-theme-brand-story__text"
  }, "When you buy from WolfThemes, you're buying directly from the person who built it. No marketplace middleman. Just direct support from the creator."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-brand-story__stats"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-brand-story__stat"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-brand-story__stat-value"
  }, "35,000+"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-brand-story__stat-label"
  }, "customers")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-brand-story__stat"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-brand-story__stat-value"
  }, "14+"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-brand-story__stat-label"
  }, "years experience")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-brand-story__stat"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-brand-story__stat-value"
  }, "4.5/5"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-brand-story__stat-label"
  }, "avg rating \xB7 1,500+ reviews"))))))));
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

function ThemeCTAs({
  theme,
  layout = 'row'
}) {
  const demoUrl = theme.theme_demo_url;
  const buyUrl = theme.theme_purchase_url;
  if (!demoUrl && !buyUrl) return null;
  const title = theme.title?.rendered;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `wolf-theme-ctas wolf-theme-ctas--${layout}`
  }, buyUrl && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: buyUrl,
    className: "theme-button-primary wolf-core-button-size-md wolf-theme-ctas__btn wolf-theme-ctas__btn--buy",
    rel: "noopener noreferrer"
  }, "Get ", title), demoUrl && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: demoUrl,
    className: "theme-button-secondary wolf-core-button-size-md wolf-theme-ctas__btn wolf-theme-ctas__btn--demo",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Live Demo"));
}

/***/ },

/***/ "./src/scripts/components/ThemeCard.jsx"
/*!**********************************************!*\
  !*** ./src/scripts/components/ThemeCard.jsx ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThemeCard)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * ThemeCard
 *
 * Used in archive grids and the (future) Elementor widget.
 * Pulls from the same REST fields as Single.jsx.
 *
 * @param {object} theme  Full theme REST object
 */
function ThemeCard({
  theme
}) {
  var _theme$_embedded$wpT, _theme$theme_pricing, _ref, _ref2;
  const title = theme.title?.rendered;
  const permalink = theme.link;
  const thumbnail = theme.theme_thumbnail;
  const tagline = theme.theme_short_description;
  const demoUrl = theme.theme_demo_url;
  const buyUrl = theme.theme_purchase_url;
  const categories = (_theme$_embedded$wpT = theme._embedded?.['wp:term']?.[0]) !== null && _theme$_embedded$wpT !== void 0 ? _theme$_embedded$wpT : [];
  const version = theme.theme_latest_version;
  const {
    tf_price,
    price_monthly,
    price_annual,
    price_lifetime
  } = (_theme$theme_pricing = theme.theme_pricing) !== null && _theme$theme_pricing !== void 0 ? _theme$theme_pricing : {};
  const heroPrice = (_ref = (_ref2 = price_annual !== null && price_annual !== void 0 ? price_annual : price_lifetime) !== null && _ref2 !== void 0 ? _ref2 : price_monthly) !== null && _ref !== void 0 ? _ref : null;
  const heroPeriod = price_annual ? '/yr' : price_lifetime ? ' lifetime' : price_monthly ? '/mo' : '';
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("article", {
    className: "wolf-theme-card"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: permalink,
    className: "wolf-theme-card__thumbnail-link",
    tabIndex: "-1",
    "aria-hidden": "true"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-card__thumbnail"
  }, thumbnail ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: thumbnail,
    alt: title,
    loading: "lazy"
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-card__thumbnail-placeholder"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-card__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "wolf-theme-card__title"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: permalink
  }, title)), tagline && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "wolf-theme-card__tagline"
  }, tagline), categories.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-card__cats"
  }, categories.map(term => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    key: term.id,
    href: term.link,
    className: "wolf-theme-card__cat"
  }, term.name)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("footer", {
    className: "wolf-theme-card__footer"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-card__price"
  }, heroPrice ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-card__price-main"
  }, "$", heroPrice, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-card__price-period"
  }, heroPeriod)), tf_price && tf_price > heroPrice && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-card__price-tf"
  }, "$", tf_price, " on TF")) : tf_price ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-card__price-main"
  }, "$", tf_price) : null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-card__ctas"
  }, demoUrl && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: demoUrl,
    className: "theme-button-secondary wolf-theme-card__btn wolf-theme-card__btn--demo",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Demo"), buyUrl && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: buyUrl,
    className: "theme-button-primary wolf-theme-card__btn wolf-theme-card__btn--buy",
    rel: "noopener noreferrer"
  }, "Buy"))));
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
  theme
}) {
  const changelog = theme?.theme_changelog;
  const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  if (!changelog) return null;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-changelog wolf-theme-single__section"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-single__wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "wolf-theme-changelog__toggle",
    onClick: () => setOpen(!open)
  }, open ? 'Hide changelog ↑' : 'View changelog ↓'), open && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-changelog__content",
    dangerouslySetInnerHTML: {
      __html: changelog
    }
  })));
}

/***/ },

/***/ "./src/scripts/components/ThemeDescription.jsx"
/*!*****************************************************!*\
  !*** ./src/scripts/components/ThemeDescription.jsx ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThemeDescription)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ThemeCTAs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ThemeCTAs */ "./src/scripts/components/ThemeCTAs.jsx");
/* harmony import */ var _ThemeBenefits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ThemeBenefits */ "./src/scripts/components/ThemeBenefits.jsx");



function ThemeDescription({
  theme
}) {
  const title = theme.title?.rendered;
  const excerpt = theme.excerpt?.rendered;
  const description = theme.theme_short_description;
  const longDescription = theme.theme_long_description;
  const demoUrl = theme.theme_demo_url;
  const mockup = theme.theme_mockup;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-description wolf-theme-single__section"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-single__wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-single-description__column"
  }, excerpt && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-description__excerpt",
    dangerouslySetInnerHTML: {
      __html: excerpt
    }
  }), longDescription && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-description__description"
  }, longDescription), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ThemeBenefits__WEBPACK_IMPORTED_MODULE_2__["default"], null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ThemeCTAs__WEBPACK_IMPORTED_MODULE_1__["default"], {
    theme: theme,
    layout: "row"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-single-description__column"
  }, mockup && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-description__mockup"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: demoUrl,
    target: "_blank",
    rel: "noopener noreferrer"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: mockup,
    alt: title
  }))))));
}

/***/ },

/***/ "./src/scripts/components/ThemeFeatures.jsx"
/*!**************************************************!*\
  !*** ./src/scripts/components/ThemeFeatures.jsx ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThemeFeatures)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function ThemeFeatures({
  theme
}) {
  var _theme$theme_features;
  const features = (_theme$theme_features = theme.theme_features) !== null && _theme$theme_features !== void 0 ? _theme$theme_features : [];
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-features wolf-theme-single__section"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-single__wrapper"
  }, features.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-features__features"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "wolf-theme-features__section-title"
  }, "Features"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "wolf-theme-features__features-list"
  }, features.map((feature, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    key: i
  }, feature))))));
}

/***/ },

/***/ "./src/scripts/components/ThemeGallery.jsx"
/*!*************************************************!*\
  !*** ./src/scripts/components/ThemeGallery.jsx ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThemeGallery)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function ThemeGallery({
  theme
}) {
  var _theme$theme_gallery;
  const images = (_theme$theme_gallery = theme.theme_gallery) !== null && _theme$theme_gallery !== void 0 ? _theme$theme_gallery : [];
  if (!images.length) return null;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-gallery wolf-theme-single__section"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-single__wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-gallery__grid"
  }, images.map((src, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    key: i,
    href: src,
    "data-fancybox": "theme-gallery",
    className: "wolf-theme-gallery__item"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: src,
    alt: `Screenshot ${i + 1}`,
    loading: "lazy"
  }))))));
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
/* harmony import */ var _ThemeCTAs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ThemeCTAs */ "./src/scripts/components/ThemeCTAs.jsx");
/* harmony import */ var _ThemePriceBox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ThemePriceBox */ "./src/scripts/components/ThemePriceBox.jsx");




function ThemeHero({
  theme
}) {
  const thumbnail = theme.theme_hero;
  const video = theme.theme_video;
  const title = theme.title?.rendered;
  const description = theme.theme_short_description;
  const demoUrl = theme.theme_demo_url;
  const buyUrl = theme.theme_purchase_url;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-hero"
  }, (video || thumbnail) && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-hero__thumbnail"
  }, video ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("video", {
    src: video,
    autoPlay: true,
    muted: true,
    loop: true,
    playsInline: true
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: thumbnail,
    alt: title
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "faded-edges-overlay"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "noise-overlay"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-hero__content wolf-core-font-light"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
    className: "wolf-theme-hero__title"
  }, title), description && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "wolf-theme-hero__tagline"
  }, description)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ThemePriceBox__WEBPACK_IMPORTED_MODULE_2__["default"], {
    theme: theme
  }));
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
/* harmony import */ var _ThemeCTAs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ThemeCTAs */ "./src/scripts/components/ThemeCTAs.jsx");


function ThemePriceBox({
  theme
}) {
  var _theme$theme_pricing;
  const {
    tf_price,
    price_annual,
    price_annual_3sites
  } = (_theme$theme_pricing = theme.theme_pricing) !== null && _theme$theme_pricing !== void 0 ? _theme$theme_pricing : {};
  if (!tf_price && !price_annual) return null;
  const saving = price_annual && tf_price ? Math.round(tf_price - price_annual) : 0;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-price-box"
  }, tf_price && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-price-box__reference"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-price-box__reference-label"
  }, "On ThemeForest"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-price-box__reference-price"
  }, "$", tf_price)), price_annual ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-price-box__wolf"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-price-box__hero"
  }, saving > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-price-box__badge"
  }, "Save $", saving, " \u2014 support always included"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-price-box__hero-amount"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("sup", null, "$"), price_annual, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-price-box__hero-period"
  }, "/year")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-price-box__hero-label"
  }, "1 site")), price_annual_3sites && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-price-box__secondary"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-price-box__secondary-price"
  }, "$", price_annual_3sites, "/yr"), "\xA0", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-price-box__secondary-label"
  }, "for 3 sites"))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-price-box__coming-soon"
  }, "New pricing coming soon"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ThemeCTAs__WEBPACK_IMPORTED_MODULE_1__["default"], {
    theme: theme,
    layout: "column"
  }));
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
 * WolfThemes vs ThemeForest pricing comparison.
 * Annual-only model. Two tiers: 1 site and 3 sites.
 * Pulls all prices from theme_pricing (REST field).
 *
 * @param {object} theme  Full theme REST object
 */
function ThemePricing({
  theme
}) {
  var _theme$theme_pricing;
  const buyUrl = theme.theme_purchase_url;
  const title = theme.title?.rendered;
  const {
    tf_price,
    price_annual,
    price_annual_3sites
  } = (_theme$theme_pricing = theme.theme_pricing) !== null && _theme$theme_pricing !== void 0 ? _theme$theme_pricing : {};
  const fmt = price => price ? `$${price}` : '—';
  const tfSaving = price_annual && tf_price ? Math.round(tf_price - price_annual) : null;
  const rows = [{
    feature: 'Price',
    wolf: price_annual ? `$${price_annual}/yr — updates & continuous support` : '—',
    tf: tf_price ? `$${tf_price} one-time + support renewal` : '—',
    wolfWins: true
  }, {
    feature: 'Updates',
    wolf: 'Always included - Frequent',
    tf: 'Included (major updates only)',
    wolfWins: true
  }, {
    feature: 'Support',
    wolf: 'Priority Support - Always included — reply within 24h',
    tf: '6 months only — reply within 48h',
    wolfWins: true
  }, {
    feature: 'Multiple sites',
    wolf: price_annual_3sites ? `3-site license at $${price_annual_3sites}/yr` : 'Available',
    tf: 'Separate purchase per site',
    wolfWins: true
  }, {
    feature: 'Money-back',
    wolf: '7-day guarantee',
    tf: 'No refunds',
    wolfWins: true
  }, {
    feature: 'Buy direct',
    wolf: 'Yes — from the author',
    tf: 'Marketplace cut on every sale',
    wolfWins: true
  }];
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-pricing wolf-theme-single__section"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-single__wrapper wolf-theme-single__wrapper--small"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "wolf-theme-pricing__title"
  }, "Where to buy"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "wolf-theme-pricing__intro"
  }, "Buy directly from us and get more for less \u2014 support never expires."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
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
  }, "Direct from the author")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-pricing__card-prices"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-pricing__plan wolf-theme-pricing__plan--hero"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-pricing__plan-meta"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-pricing__plan-label"
  }, "1 site"), "\xA0", tfSaving > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-pricing__plan-saving"
  }, "$", tfSaving, " less than ThemeForest")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-pricing__plan-price"
  }, fmt(price_annual), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("small", null, "/yr"))), price_annual_3sites && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-pricing__plan"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-pricing__plan-label"
  }, "3 sites"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-pricing__plan-price"
  }, fmt(price_annual_3sites), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("small", null, "/yr"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "wolf-theme-pricing__card-note"
  }, "Updates & support included \u2014 always.")), buyUrl && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: buyUrl,
    className: "wolf-theme-pricing__card-cta--wolf theme-button-primary wolf-core-button-size-md",
    rel: "noopener noreferrer"
  }, "Get ", title)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
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
  }, fmt(tf_price))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-pricing__plan wolf-theme-pricing__plan--muted"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-pricing__plan-label"
  }, "Support included"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-pricing__plan-price"
  }, "Limited time")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-pricing__plan wolf-theme-pricing__plan--muted"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-pricing__plan-label"
  }, "Multi-site"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-pricing__plan-price"
  }, "Not available"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://wlfthm.es/tf",
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
  }, row.tf)))))));
}

/***/ },

/***/ "./src/scripts/components/ThemeTechnicals.jsx"
/*!****************************************************!*\
  !*** ./src/scripts/components/ThemeTechnicals.jsx ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThemeTechnicals)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ThemePriceBox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ThemePriceBox */ "./src/scripts/components/ThemePriceBox.jsx");
/* harmony import */ var _ThemeCTAs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ThemeCTAs */ "./src/scripts/components/ThemeCTAs.jsx");



function ThemeTechnicals({
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
    className: "wolf-theme-technicals wolf-theme-single__section"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-single__wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-technicals__benefits"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "wolf-theme-technicals__section-title"
  }, "What's Included"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "wolf-theme-technicals__benefits-list"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, "Lifetime theme access"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, "Ongoing updates included"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, "Direct support from the creator ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-technicals__info",
    title: "Support provided via our forum"
  }, "\u24D8")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, "7-day money-back guarantee"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-technicals__support"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "wolf-theme-technicals__section-title"
  }, "Support"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "wolf-theme-technicals__support-links"
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
    className: "wolf-theme-technicals__terms"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "wolf-theme-technicals__section-title"
  }, "Categories"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-technicals__categories"
  }, categories.map(term => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    key: term.id,
    href: term.link,
    className: "wolf-theme-technicals__category"
  }, term.name)))), tags.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-technicals__terms"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "wolf-theme-technicals__section-title"
  }, "Tags"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-technicals__tags tagcloud"
  }, tags.map(term => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    key: term.id,
    href: term.link,
    className: "wolf-theme-technicals__tag"
  }, term.name)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-technicals__meta"
  }, version && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-technicals__row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-technicals__label"
  }, "Version"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-technicals__value"
  }, version)), builder && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-technicals__row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-technicals__label"
  }, "Builder"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-technicals__value"
  }, builder)), requires && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-technicals__row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-technicals__label"
  }, "Requires WP"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-technicals__value"
  }, requires, "+")), tested && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-technicals__row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-technicals__label"
  }, "Tested up to"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-technicals__value"
  }, tested)), updated && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-technicals__row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-technicals__label"
  }, "Last Update"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-technicals__value"
  }, updated)))));
}

/***/ },

/***/ "./src/scripts/components/ThemeTestimonials.jsx"
/*!******************************************************!*\
  !*** ./src/scripts/components/ThemeTestimonials.jsx ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThemeTestimonials)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function ThemeTestimonials({
  theme
}) {
  var _theme$theme_testimon;
  const title = theme.title?.rendered;
  const testimonials = (_theme$theme_testimon = theme.theme_testimonials) !== null && _theme$theme_testimon !== void 0 ? _theme$theme_testimon : [];
  if (!testimonials?.length) return null;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-testimonials wolf-theme-single__section wolf-core-font-light"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-single__wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "wolf-theme-testimonials__title"
  }, "What customers say about ", title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-testimonials__grid"
  }, testimonials.map((t, i) => {
    var _t$rating;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: i,
      className: "wolf-theme-testimonials__item"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "wolf-theme-testimonials__stars"
    }, '★'.repeat((_t$rating = t.rating) !== null && _t$rating !== void 0 ? _t$rating : 5)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "wolf-theme-testimonials__text"
    }, t.text), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "wolf-theme-testimonials__author"
    }, "\u2014 ", t.author));
  }))));
}

/***/ },

/***/ "./src/scripts/components/hooks/useTerms.js"
/*!**************************************************!*\
  !*** ./src/scripts/components/hooks/useTerms.js ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useTerms: () => (/* binding */ useTerms)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function useTerms(taxonomy) {
  const [terms, setTerms] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!taxonomy) return;
    const {
      restNonce
    } = window.wolfStoreData;
    fetch(`/wp-json/wp/v2/${taxonomy}?per_page=100&hide_empty=1`, {
      headers: {
        'X-WP-Nonce': restNonce
      }
    }).then(res => res.json()).then(data => {
      setTerms(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [taxonomy]);
  return {
    terms,
    loading
  };
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

/***/ "./src/scripts/components/hooks/useThemes.js"
/*!***************************************************!*\
  !*** ./src/scripts/components/hooks/useThemes.js ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useThemes: () => (/* binding */ useThemes)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function useThemes({
  taxonomy = '',
  termId = 0,
  page = 1,
  perPage: perPageProp = undefined,
  featuredOnly = false
} = {}) {
  const [themes, setThemes] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [totalPages, setTotalPages] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1);
  const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const {
    restUrl,
    restNonce,
    perPage: perPageGlobal
  } = window.wolfStoreData;
  const perPage = parseInt(perPageProp) || parseInt(perPageGlobal) || 12;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams({
      _embed: 1,
      per_page: featuredOnly ? 100 : perPage,
      // ← fetch all when filtering featured
      page
    });
    if (taxonomy && termId) {
      params.set(taxonomy, termId);
    }
    fetch(`${restUrl}?${params}`, {
      headers: {
        'X-WP-Nonce': restNonce
      }
    }).then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const total = parseInt(res.headers.get('X-Wp-Total')) || 0;
      const pages = featuredOnly ? 1 : total ? Math.ceil(total / perPage) : 1;
      setTotalPages(pages);
      return res.json();
    }).then(data => {
      const filtered = featuredOnly ? data.filter(t => t.theme_featured) : data;
      const sorted = [...filtered.filter(t => t.theme_featured), ...filtered.filter(t => !t.theme_featured)];
      setThemes(sorted);
      setLoading(false);
    }).catch(err => {
      setError(err.message);
      setLoading(false);
    });
  }, [taxonomy, termId, page, perPage, featuredOnly]);
  return {
    themes,
    totalPages,
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
/* harmony import */ var _components_Archive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Archive */ "./src/scripts/components/Archive.jsx");






class WolfStore {
  constructor() {
    (0,auto_bind__WEBPACK_IMPORTED_MODULE_2__["default"])(this);
    this.RenderRoot();
  }
  RenderRoot() {
    document.querySelectorAll('[data-type="archive"], [data-type="single"]').forEach(root => {
      const {
        type,
        postId,
        taxonomy,
        termId,
        termName,
        perPage,
        pagination
      } = root.dataset;
      const app = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createRoot)(root);
      if ('single' === type) {
        app.render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Single__WEBPACK_IMPORTED_MODULE_3__["default"], {
          postId: postId
        }));
      }
      if ('archive' === type) {
        app.render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Archive__WEBPACK_IMPORTED_MODULE_4__["default"], {
          taxonomy: taxonomy,
          termId: termId,
          termName: termName,
          perPage: perPage,
          pagination: pagination,
          featuredOnly: root.dataset.featuredOnly,
          showSidebar: root.dataset.showSidebar !== 'false'
        }));
      }
    });
  }
}
new WolfStore();
})();

/******/ })()
;
//# sourceMappingURL=app.js.map