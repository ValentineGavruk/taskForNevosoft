/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadPhoto = loadPhoto;

var _getLinkPhoto = __webpack_require__(3);

var _getImage = __webpack_require__(2);

var _writeFile = __webpack_require__(4);

function loadPhoto() {

    (0, _getLinkPhoto.getLinkPhoto)(null, downloadImage);

    function downloadImage(fileName) {
        (0, _getImage.getImage)(fileName, _writeFile.writeFile);
    }
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _loadPhoto = __webpack_require__(0);

window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

if (window.requestFileSystem) {
    (0, _loadPhoto.loadPhoto)();
} else {
    var content = document.getElementById('content');
    content.innerHTML = '<div class="alert alert-danger" role="alert">Простите,ваш браузер не поддерживает "File API" .</div>';
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getImage = getImage;
function getImage(data, cb) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            var file = reader.result;
            cb(file, data);
        };
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', '/download/' + data);
    xhr.responseType = 'blob';
    xhr.send();
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLinkPhoto = getLinkPhoto;
function getLinkPhoto(data, cb) {
    $.ajax({
        url: '/images',
        method: 'GET',
        crossDomain: true,
        complete: function complete(jqXHR, textStatus) {
            var paths = JSON.parse(jqXHR.responseText);
            var files = paths.path;
            files.forEach(function (file) {
                cb(file);
            });
        }
    });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.writeFile = writeFile;
function writeFile(file, name) {

    var change = false;

    window.requestFileSystem(window.TEMPORARY, 10 * 1024 * 1024, onReadFile, errorHandler);

    function errorHandler(err) {

        switch (err.code) {
            case 8:
                change = true;
                window.requestFileSystem(window.TEMPORARY, 10 * 1024 * 1024, onInitFs, errorHandler);
                window.requestFileSystem(window.TEMPORARY, 10 * 1024 * 1024, onReadFile, errorHandler);
                break;
        }
        ;
    };

    function onInitFs(fs) {
        fs.root.getFile(name, { create: true }, function (fileEntry) {

            fileEntry.createWriter(function (fileWriter) {

                fileWriter.onwriteend = function (e) {
                    console.log('Write completed.');
                };

                fileWriter.onerror = function (e) {
                    console.log('Write failed: ' + e.toString());
                };
                var blob = new Blob([file], { type: 'image/jpg' });

                fileWriter.write(blob);
            }, errorHandler);
        }, errorHandler);
    }

    function onReadFile(fs) {
        fs.root.getFile(name, {}, function (fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader();
                reader.onloadend = function (e) {
                    var span = document.createElement('span');
                    if (change) {
                        span.innerHTML = ['<img class="thumb" src="', e.target.result, '" title="', file.name, '"/><i class="icon-change fa fa-check fa-2x" aria-hidden="true"></i>'].join('');
                    } else {
                        span.innerHTML = ['<img class="thumb" src="', e.target.result, '" title="', file.name, '"/>'].join('');
                    }
                    document.getElementById('list').insertBefore(span, null);
                };
                reader.readAsText(file);
            }, errorHandler);
        }, errorHandler);
    }
}

/***/ })
/******/ ]);