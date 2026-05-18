/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/* harmony import */ var _ThemeSidebar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThemeSidebar */ "./src/scripts/components/ThemeSidebar.jsx");




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
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-single"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-single__main"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ThemeHero__WEBPACK_IMPORTED_MODULE_2__["default"], {
    theme: theme
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("aside", {
    className: "wolf-theme-single__sidebar"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ThemeSidebar__WEBPACK_IMPORTED_MODULE_3__["default"], {
    theme: theme
  })));
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



function ThemeHero({
  theme
}) {
  var _theme$theme_features;
  const thumbnail = theme.theme_thumbnail;
  const title = theme.title?.rendered;
  const excerpt = theme.excerpt?.rendered;
  const description = theme.theme_short_description;
  const longDescription = theme.theme_long_description;
  const demoUrl = theme.theme_demo_url;
  const buyUrl = theme.theme_purchase_url;
  const features = (_theme$theme_features = theme.theme_features) !== null && _theme$theme_features !== void 0 ? _theme$theme_features : [];
  const changelog = theme.theme_changelog;
  const [changelogOpen, setChangelogOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
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
  }, longDescription), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-hero__ctas"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: demoUrl,
    className: "wolf-theme-hero__cta wolf-theme-hero__cta--demo",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Live Demo"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: buyUrl,
    className: "wolf-theme-hero__cta wolf-theme-hero__cta--buy",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Purchase")), features.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-hero__features"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "wolf-theme-hero__section-title"
  }, "Features"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "wolf-theme-hero__features-list"
  }, features.map((feature, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    key: i
  }, feature)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ThemeChangelog__WEBPACK_IMPORTED_MODULE_1__["default"], {
    changelog: changelog
  })));
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

function ThemeSidebar({
  theme
}) {
  const version = theme.theme_latest_version;
  const builder = theme.theme_builder;
  const requires = theme.theme_requires;
  const tested = theme.theme_tested;
  const updated = theme.modified?.split('T')[0];
  const shortlink = theme.theme_shortlink;
  const demoUrl = theme.theme_demo_url;
  const buyUrl = theme.theme_purchase_url;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-sidebar"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-sidebar__ctas"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: buyUrl,
    className: "theme-button-primary wolf-theme-sidebar__btn wolf-theme-sidebar__btn--buy",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Purchase"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: demoUrl,
    className: "theme-button-secondary wolf-theme-sidebar__btn wolf-theme-sidebar__btn--demo",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Live Demo")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
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
  }, updated)), shortlink && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wolf-theme-sidebar__row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wolf-theme-sidebar__label"
  }, "Shortlink"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: shortlink,
    className: "wolf-theme-sidebar__value",
    target: "_blank",
    rel: "noopener noreferrer"
  }, shortlink))));
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
    console.log('start');
  }
  RenderRoot() {
    const root = document.getElementById('wolf-store-root');
    if (root) {
      console.log("root div OK");
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