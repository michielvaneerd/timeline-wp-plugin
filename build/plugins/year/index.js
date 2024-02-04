/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/shared/image.js":
/*!*****************************!*\
  !*** ./src/shared/image.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Widget: () => (/* binding */ Widget),
/* harmony export */   init: () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);




let imageId,
  imageSource,
  imageInfo,
  image,
  _setMeta,
  _meta = null;
const updateImageId = newValue => {
  const obj = {
    ..._meta,
    mve_timeline_image: newValue ? newValue.id : null,
    mve_timeline_image_src: newValue ? JSON.stringify(newValue.sizes) : null
  };
  if (!newValue) {
    obj.mve_timeline_image_source = null;
    obj.mve_timeline_image_info = null;
    obj.mve_timeline_image_src = null;
  }
  _setMeta(obj);
};
const updateImageSource = newValue => {
  _setMeta({
    ..._meta,
    mve_timeline_image_source: newValue
  });
};
const updateImageInfo = newValue => {
  _setMeta({
    ..._meta,
    mve_timeline_image_info: newValue
  });
};
const init = function (meta, setMeta) {
  var _meta$mve_timeline_im, _meta$mve_timeline_im2;
  _meta = meta;
  _setMeta = setMeta;
  imageId = meta['mve_timeline_image'];
  imageSource = (_meta$mve_timeline_im = meta['mve_timeline_image_source']) !== null && _meta$mve_timeline_im !== void 0 ? _meta$mve_timeline_im : '';
  imageInfo = (_meta$mve_timeline_im2 = meta['mve_timeline_image_info']) !== null && _meta$mve_timeline_im2 !== void 0 ? _meta$mve_timeline_im2 : '';
  image = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => select('core').getMedia(imageId), [imageId]);
};
const Widget = function () {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUploadCheck, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalText, {
    upperCase: true
  }, "Image"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUpload, {
    onSelect: updateImageId,
    allowedTypes: ['image'],
    value: imageId,
    render: ({
      open
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, image && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        display: 'block'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ResponsiveWrapper, {
      naturalWidth: image.media_details.width,
      naturalHeight: image.media_details.height
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: image.source_url
    }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        display: 'block'
      }
    }, !image && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      variant: "secondary",
      onClick: open
    }, "Open Media Library"), image && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      onClick: () => updateImageId(null),
      isLink: true,
      isDestructive: true
    }, "Remove image")))
  }), image && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    value: imageSource,
    onChange: updateImageSource,
    label: "Source"
  }), image && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    value: imageInfo,
    onChange: updateImageInfo,
    label: "Info"
  }));
};

/***/ }),

/***/ "./src/shared/intro.js":
/*!*****************************!*\
  !*** ./src/shared/intro.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Widget: () => (/* binding */ Widget),
/* harmony export */   init: () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);


let _meta,
  _setMeta,
  metaFieldValue = null;
const updateMetaValue = newValue => {
  _setMeta({
    ..._meta,
    mve_timeline_intro: newValue
  });
};
const init = function (meta, setMeta) {
  _meta = meta;
  _setMeta = setMeta;
  metaFieldValue = meta['mve_timeline_intro'];
};
const Widget = function () {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
    placeholder: "Intro...",
    allowedFormats: ['core/bold', 'core/italic', 'mve-timeline/internal-link'],
    label: "MVE Timeline Intro",
    value: metaFieldValue,
    onChange: updateMetaValue,
    style: {
      backgroundColor: 'white',
      padding: '1rem',
      border: '1px solid #C0C0C0'
    }
  });
};

/***/ }),

/***/ "./src/shared/links.js":
/*!*****************************!*\
  !*** ./src/shared/links.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Widget: () => (/* binding */ Widget),
/* harmony export */   init: () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);






let _meta,
  _setMeta,
  metaFieldValue = null;
const init = function (meta, setMeta) {
  _meta = meta;
  _setMeta = setMeta;
  metaFieldValue = meta['mve_timeline_links'];
  if (!metaFieldValue) {
    metaFieldValue = [];
  } else {
    metaFieldValue = JSON.parse(metaFieldValue); // [{"name": "", "url": ""}]
  }
};
const Widget = function () {
  const [valueName, setValueName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [valueUrl, setValueUrl] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const addMetaValue = () => {
    metaFieldValue.push({
      name: valueName,
      url: valueUrl
    });
    _setMeta({
      ..._meta,
      mve_timeline_links: JSON.stringify(metaFieldValue)
    });
    setValueName('');
    setValueUrl('');
  };
  const removeLink = valueToRemove => {
    const newMetaFieldValue = [];
    for (const val of metaFieldValue) {
      if (val.name === valueToRemove.name && val.url === valueToRemove.url) {} else {
        newMetaFieldValue.push(val);
      }
    }
    _setMeta({
      ..._meta,
      mve_timeline_links: JSON.stringify(newMetaFieldValue)
    });
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    style: {
      overflowX: 'auto',
      listStyleType: 'none',
      padding: 0,
      margin: 0,
      marginBottom: '1rem'
    }
  }, metaFieldValue.map(link => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    key: link.url,
    style: {
      whiteSpace: 'nowrap'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
    isDestructive: true,
    size: "small",
    onClick: () => removeLink(link)
  }, "X"), " ", link.name, " - ", link.url))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
    value: valueName,
    onChange: newValue => setValueName(newValue),
    label: "Title"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
    value: valueUrl,
    onChange: newValue => setValueUrl(newValue),
    label: "URL"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
    size: "small",
    variant: "secondary",
    onClick: addMetaValue,
    disabled: !(valueName && valueUrl)
  }, "Add link"));
};

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/core-data":
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["coreData"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/edit-post":
/*!**********************************!*\
  !*** external ["wp","editPost"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["editPost"];

/***/ }),

/***/ "@wordpress/plugins":
/*!*********************************!*\
  !*** external ["wp","plugins"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["plugins"];

/***/ }),

/***/ "@wordpress/rich-text":
/*!**********************************!*\
  !*** external ["wp","richText"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["richText"];

/***/ })

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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************************!*\
  !*** ./src/plugins/year/index.js ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/edit-post */ "@wordpress/edit-post");
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_rich_text__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/rich-text */ "@wordpress/rich-text");
/* harmony import */ var _wordpress_rich_text__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _shared_image_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/image.js */ "./src/shared/image.js");
/* harmony import */ var _shared_links_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/links.js */ "./src/shared/links.js");
/* harmony import */ var _shared_intro_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../shared/intro.js */ "./src/shared/intro.js");












wp.domReady(() => {
  let locked = false;
  (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.subscribe)(() => {
    const requiredMeta = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.select)('core/editor').getEditedPostAttribute('meta');
    const tag = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.select)('core/editor').getEditedPostAttribute('mve_timeline');
    if (requiredMeta && tag) {
      if (!requiredMeta.mve_timeline_year || tag.length === 0) {
        if (!locked) {
          locked = true;
          (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.dispatch)('core/editor').lockPostSaving('requiredValueLock');
        }
      } else {
        if (locked) {
          locked = false;
          (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.dispatch)('core/editor').unlockPostSaving('requiredValueLock');
        }
      }
    }
  });
});
(0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_1__.registerPlugin)('mve-timeline', {
  render: function () {
    var _meta$mve_timeline_ye, _meta$mve_timeline_ye2, _meta$mve_timeline_co;
    const postType = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => select('core/editor').getCurrentPostType(), []);
    const postId = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => select('core/editor').getCurrentPostId(), []);
    const {
      editEntityRecord
    } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useDispatch)('core');
    const [meta, setMeta] = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__.useEntityProp)('postType', postType, 'meta');
    (0,_shared_image_js__WEBPACK_IMPORTED_MODULE_8__.init)(meta, setMeta);
    (0,_shared_links_js__WEBPACK_IMPORTED_MODULE_9__.init)(meta, setMeta);
    (0,_shared_intro_js__WEBPACK_IMPORTED_MODULE_10__.init)(meta, setMeta);
    const valueYear = (_meta$mve_timeline_ye = meta['mve_timeline_year']) !== null && _meta$mve_timeline_ye !== void 0 ? _meta$mve_timeline_ye : '';
    const valueYearEnd = (_meta$mve_timeline_ye2 = meta['mve_timeline_year_end']) !== null && _meta$mve_timeline_ye2 !== void 0 ? _meta$mve_timeline_ye2 : '';
    const updateYear = newValue => {
      if (newValue === '') {
        setMeta({
          ...meta,
          mve_timeline_year: null
        });
      } else {
        newValue = parseInt(newValue, 10);
        setMeta({
          ...meta,
          mve_timeline_year: !isNaN(newValue) ? newValue.toString() : null
        });
      }
    };
    const updateYearEnd = newValue => {
      if (newValue === '') {
        setMeta({
          ...meta,
          mve_timeline_year_end: null
        });
      } else {
        newValue = parseInt(newValue, 10);
        setMeta({
          ...meta,
          mve_timeline_year_end: !isNaN(newValue) ? newValue.toString() : null
        });
      }
    };
    const hasContent = (_meta$mve_timeline_co = meta['mve_timeline_content']) !== null && _meta$mve_timeline_co !== void 0 ? _meta$mve_timeline_co : false;
    const updateHasContent = newValue => {
      setMeta({
        ...meta,
        mve_timeline_content: newValue
      });
    };
    const tags = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
      return select('core').getEntityRecords('taxonomy', 'mve_timeline', {
        orderBy: 'name',
        'order': 'asc',
        'per_page': -1
      }); // name and slug
    });
    const currentTags = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => select('core/editor').getEditedPostAttribute('mve_timeline'), []);
    function updateTimeline(value) {
      value = parseInt(value, 10);
      editEntityRecord('postType', 'mve_timeline_item', postId, {
        'mve_timeline': !isNaN(value) ? [parseInt(value, 10)] : []
      });
    }
    const options = [{
      value: null,
      label: 'Timeline...'
    }, ...(tags ? tags.map(tag => {
      return {
        value: tag.id,
        label: tag.name
      };
    }) : [])];
    const panelStyle = {
      backgroundColor: '#F3F3F3',
      padding: '.4rem',
      width: '100%'
    };
    const requiredMissingStyle = {
      backgroundColor: 'red',
      color: 'white'
    };
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2__.PluginDocumentSettingPanel, {
      title: "MVE Timeline",
      initialOpen: true,
      name: "mve_timeline_panel"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: panelStyle
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalHStack, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
      style: !valueYear ? requiredMissingStyle : null,
      onChange: updateYear,
      value: valueYear,
      label: "Year start"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
      onChange: updateYearEnd,
      value: valueYearEnd,
      label: "Year end"
    })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: panelStyle
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
      style: !currentTags || currentTags.length === 0 ? requiredMissingStyle : null,
      label: "Timeline",
      options: options,
      onChange: updateTimeline,
      value: currentTags ? currentTags[0] : ''
    }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: panelStyle
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.CheckboxControl, {
      label: "Has content",
      checked: hasContent,
      onChange: updateHasContent
    }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: panelStyle
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalVStack, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_shared_image_js__WEBPACK_IMPORTED_MODULE_8__.Widget, null)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: panelStyle
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalVStack, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalText, {
      upperCase: true
    }, "Intro"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_shared_intro_js__WEBPACK_IMPORTED_MODULE_10__.Widget, null)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: panelStyle
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalVStack, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalText, {
      upperCase: true
    }, "Links"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_shared_links_js__WEBPACK_IMPORTED_MODULE_9__.Widget, null)))));
  }
});
const MyPageList = ({
  pages,
  onChange,
  value
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    style: {
      minWidth: '300px'
    },
    __nextHasNoMarginBottom: true,
    value: value,
    label: "Select page",
    onChange: onChange,
    options: pages.map(function (page) {
      return {
        value: page.id,
        label: `${page.meta.mve_timeline_year} - ${page.title.raw}`
      };
    })
  });
};
const MyCustomButton = ({
  isActive,
  onChange,
  value,
  activeAttributes,
  contentRef
}) => {
  const [popoverAnchor, setPopoverAnchor] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(contentRef.current);
  const allowedBlocks = ['core/paragraph', 'mve-timeline/intro'];
  const postId = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => select('core/editor').getCurrentPostId(), []);
  const selectedBlock = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    return select('core/block-editor').getSelectedBlock();
  }, []);
  if (selectedBlock && !allowedBlocks.includes(selectedBlock.name)) {
    return null;
  }
  const currentTags = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => select('core/editor').getEditedPostAttribute('mve_timeline'), []);
  const pages = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    return select('core').getEntityRecords('postType', 'mve_timeline_item', currentTags && postId ? {
      'mve_timeline': currentTags,
      'exclude': [postId]
    } : {});
  }, [currentTags, postId]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__.BlockControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarButton, {
    icon: "admin-links",
    title: "Internal link",
    onClick: () => {
      onChange((0,_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_7__.toggleFormat)(value, {
        type: 'mve-timeline/internal-link'
      }));
    },
    isActive: isActive
  }), isActive && pages && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Popover, {
    anchor: popoverAnchor,
    variant: "toolbar"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Card, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.CardBody, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(MyPageList, {
    pages: pages,
    value: activeAttributes?.name,
    onChange: newValue => {
      const changed = (0,_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_7__.applyFormat)(value, {
        type: 'mve-timeline/internal-link',
        attributes: {
          name: newValue
        }
      });
      onChange(changed);
    }
  })))));
};

// const MyCustomButton2 = ({ isActive, onChange, value, activeAttributes }) => {

//     const selectedBlock = useSelect((select) => {
//         return select('core/block-editor').getSelectedBlock();
//     }, []);

//     if (selectedBlock && selectedBlock.name !== 'core/paragraph') {
//         return null;
//     }

//     console.log(selectedBlock.name);

//     return (
//         <BlockControls>
//             <ToolbarButton
//                 icon="editor-code"
//                 title="Sample output"
//                 onClick={() => {
//                     onChange(
//                         toggleFormat(value, {
//                             type: 'my-custom-format/sample-output',
//                         })
//                     );
//                 }}
//                 isActive={isActive}
//             />
//             {isActive && <Popover variant="toolbar">
//                 <URLInput value={activeAttributes.name ?? ''} onChange={(url, post) => {
//                     const newVal = applyFormat(value, {
//                         type: 'my-custom-format/sample-output',
//                         attributes: {
//                             name: url
//                         }
//                     });
//                     console.log(newVal);
//                     console.log(url);
//                     console.log(post);
//                     onChange(newVal);
//                 }} />
//             </Popover>}
//         </BlockControls>
//     );
// };

(0,_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_7__.registerFormatType)('mve-timeline/internal-link', {
  title: 'Internal link',
  tagName: 'a',
  className: 'mve-internal-link',
  attributes: {
    name: 'data-internal-id'
  },
  edit: MyCustomButton
});

//addFilter('editor.BlockEdit', 'mve-timeline/link', InternalLink);
})();

/******/ })()
;
//# sourceMappingURL=index.js.map