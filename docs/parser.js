(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["parser"] = factory();
	else
		root["parser"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/parser.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/operator.js":
/*!*************************!*\
  !*** ./src/operator.js ***!
  \*************************/
/*! exports provided: takeOperator, helpOperator, captureVsComparator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"takeOperator\", function() { return takeOperator; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"helpOperator\", function() { return helpOperator; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"captureVsComparator\", function() { return captureVsComparator; });\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\nvar takeOperator = function takeOperator(index, tokens) {\n  var providedKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;\n  // collect all the tokens that match whichever one is at index.\n  var key = providedKey || tokens[index].key;\n  var takeThese = tokens.filter(function (t) {\n    return t.key === key;\n  });\n  var theOtherTokens = tokens.filter(function (t) {\n    return t.key !== key;\n  });\n  return [takeThese, theOtherTokens];\n};\nvar helpOperator = function helpOperator(index, tokens) {\n  return takeOperator(index, tokens, 'help');\n};\nvar captureVsComparator = function captureVsComparator(index, tokens) {\n  // look\n  if (index === 0) throw Error(\"the \".concat(tokens[index].operation, \" operator requires a left side\"));\n  var i = index;\n  var t = tokens[i];\n  var iP = i - 1;\n  var tP = tokens[iP];\n  if (t.type === 'operator' && tP.type === 'operator') throw Error('cannot have adjacent vs operators');\n  var iN = i + 1;\n  var tN = tokens[iN];\n  var captured = false;\n  var comparisonTokens = [tP];\n\n  while (!captured) {\n    comparisonTokens.push(t);\n    if (tN !== undefined && tN.type === 'operator' && t.type === 'operator') throw Error('cannot have adjacent vs operators');\n\n    if ((tN === undefined || tN.type === 'field') && t.type === 'field') {\n      captured = true;\n    } else {\n      i += 1;\n      iN += 1;\n      t = tokens[i];\n      tN = tokens[iN];\n    }\n  }\n\n  comparisonTokens = comparisonTokens.filter(function (token) {\n    return token.type !== 'operation';\n  }); // if the comparison tokens contain multiple fields, throw an error.\n\n  var comparisonTokenFields = _toConsumableArray(new Set(comparisonTokens.map(function (ti) {\n    return ti.field;\n  })));\n\n  if (comparisonTokenFields.length > 1) throw Error(\"can't compare multiple tokens: \".concat(comparisonTokenFields)); // there should only be one field type in this comparison token set.\n\n  var restOfTokens = [].concat(_toConsumableArray(tokens.slice(0, index - 1)), _toConsumableArray(tokens.slice(iN, tokens.length)));\n\n  var otherTokenFields = _toConsumableArray(new Set(restOfTokens.map(function (ti) {\n    return ti.key || ti.field;\n  })));\n\n  if (otherTokenFields.includes(comparisonTokenFields[0])) throw Error('can\\'t include comparison field outside of comparison');\n  return [comparisonTokens, restOfTokens];\n};\n\n//# sourceURL=webpack://parser/./src/operator.js?");

/***/ }),

/***/ "./src/parser.js":
/*!***********************!*\
  !*** ./src/parser.js ***!
  \***********************/
/*! exports provided: getNextOperation, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getNextOperation\", function() { return getNextOperation; });\n/* harmony import */ var _operator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./operator */ \"./src/operator.js\");\n/* harmony import */ var _scanner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scanner */ \"./src/scanner.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n/*\nSumLang v0.2 - a very simple grammar for making a chart\n\nfields & operations -> Lexical Parser (scan)\noperations -> Syntactical Parser (parse) // BOTTOM-UP SHIFT-REDUCE LR(1), BABY (?)\n\nx (1) LEXICAL: scanning -> break chars and eat one char at a time.\nx  (2) SYNTACTICAL: parsing -> operation sets in order (mostly).\n      I already have this, essentially. There are no complex operations here.\n      There are simple operators which aren't really nested.\n      Don't get too fancy here.\n   (3) SEMANTIC: is the collections of statements in the program correct?\nx  (4) IR: transform to small set of IRs.1\n*/\n\nvar getNextOperation = function getNextOperation(tokens) {\n  return tokens.map(function (v, i) {\n    return [Object.assign({}, v), i];\n  }).filter(function (vi) {\n    return vi[0].type === 'operation';\n  })[0];\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (str, grammar) {\n  var tokens = Object(_scanner__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(str, grammar);\n  var instructions = [];\n  var tokenSetForInstructions = tokens.map(function (t) {\n    return t;\n  }).filter(function (t) {\n    return t.type === 'operation' || t.type === 'field';\n  });\n\n  while (tokenSetForInstructions.filter(function (t) {\n    return t.type === 'operation';\n  }).length) {\n    var _getNextOperation = getNextOperation(tokenSetForInstructions),\n        _getNextOperation2 = _slicedToArray(_getNextOperation, 2),\n        operator = _getNextOperation2[0],\n        index = _getNextOperation2[1];\n\n    var _operator$function = operator.function(index, tokenSetForInstructions),\n        _operator$function2 = _slicedToArray(_operator$function, 3),\n        operationArguments = _operator$function2[0],\n        restOfTokens = _operator$function2[1],\n        errors = _operator$function2[2];\n\n    if (errors) console.log(errors);\n    var operation = {\n      operation: operator.key,\n      key: operationArguments[0].key,\n      values: operationArguments.map(function (t) {\n        return t.value;\n      })\n    };\n    instructions.push(operation);\n    tokenSetForInstructions = restOfTokens;\n  }\n\n  while (tokenSetForInstructions.length) {\n    var _takeOperator = Object(_operator__WEBPACK_IMPORTED_MODULE_0__[\"takeOperator\"])(0, tokenSetForInstructions),\n        _takeOperator2 = _slicedToArray(_takeOperator, 2),\n        takeset = _takeOperator2[0],\n        otherTokens = _takeOperator2[1];\n\n    var _operation = {\n      operation: 'take',\n      key: takeset[0].key,\n      values: takeset.map(function (t) {\n        return t.value;\n      })\n    };\n    instructions.push(_operation);\n    tokenSetForInstructions = otherTokens;\n  }\n\n  var unmatchedTokens = tokens.filter(function (t) {\n    return t.type === undefined;\n  });\n  return {\n    instructions: instructions,\n    original: str,\n    tokens: tokens,\n    unmatchedTokens: unmatchedTokens\n  };\n});\n\n//# sourceURL=webpack://parser/./src/parser.js?");

/***/ }),

/***/ "./src/scanner.js":
/*!************************!*\
  !*** ./src/scanner.js ***!
  \************************/
/*! exports provided: noMatch, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"noMatch\", function() { return noMatch; });\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\nvar noMatch = function noMatch(value) {\n  return {\n    type: undefined,\n    value: value\n  };\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (str, grammar) {\n  var _ref;\n\n  // sort the gammar field values by length, so longest first always wins.\n  var sortedFields = (_ref = []).concat.apply(_ref, _toConsumableArray(grammar.fields.map(function (f) {\n    return f.values.map(function (fi) {\n      return [f.field, fi];\n    });\n  })));\n\n  sortedFields.sort(function (a, b) {\n    if (b[1].length < a[1].length) return -1;\n    if (b[1].length > a[1].length) return 1;\n    return 0;\n  });\n  var lexemes = [];\n  var substrings = str.split(',').map(function (s) {\n    return s.trim();\n  });\n  substrings.forEach(function (substring) {\n    var inputStr = substring.toLowerCase();\n\n    var _loop = function _loop() {\n      var stop = false;\n      /* eslint-disable no-loop-func */\n      // look through all the sorted fields, and matches longest string\n      // first regardless of field. The longest match should win.\n\n      sortedFields.forEach(function (f) {\n        if (!stop) {\n          var _f = _slicedToArray(f, 2),\n              field = _f[0],\n              value = _f[1];\n\n          var match = inputStr.startsWith(value.toLowerCase());\n\n          if (match) {\n            stop = true;\n            lexemes.push({\n              key: field,\n              value: value,\n              type: 'field'\n            });\n            inputStr = inputStr.slice(value.length).trim();\n          }\n        }\n      });\n\n      if (!stop) {\n        grammar.operations.forEach(function (o) {\n          if (stop) return;\n          var operation = o.operation,\n              key = o.key;\n          var fcn = o.function;\n          var match = inputStr.startsWith(operation.toLowerCase());\n\n          if (match) {\n            stop = true;\n            lexemes.push({\n              type: 'operation',\n              value: operation,\n              key: key,\n              function: fcn\n            });\n            inputStr = inputStr.slice(operation.length).trim();\n          }\n        });\n      }\n\n      if (!stop) {\n        var brokenUp = inputStr.split(' ');\n        inputStr = brokenUp.slice(1).join(' ').trim();\n        var s = brokenUp[0].split(',').join('').trim();\n        lexemes.push(noMatch(s));\n      }\n    };\n\n    while (inputStr.length) {\n      _loop();\n    }\n  });\n  return lexemes;\n});\n\n//# sourceURL=webpack://parser/./src/scanner.js?");

/***/ })

/******/ })["default"];
});