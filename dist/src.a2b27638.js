// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles.css");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// https://api.themoviedb.org/3/tv/top_rated?api_key=520586ec107ebeef4af3a185ee10ae9b&language=en-US&page=1
var App =
/*#__PURE__*/
function () {
  function App() {
    _classCallCheck(this, App);

    _defineProperty(this, "state", {
      movies_type: "popular"
    });

    // TODO: Add @babel/plugin-proposal-class-properties (https://git.io/vb4SL) to the 'plugins' section of your Babel config to enable transformation.
    this.root = document.getElementById("app");
    this.API_KEY = "520586ec107ebeef4af3a185ee10ae9b";
    this.URL_BASE = "https://api.themoviedb.org/3/";
    this.URL_PARAMS = "?language=en-US&api_key=".concat(this.API_KEY);
    this.MOVIE_TYPES = {
      popular: {
        name: "Popular TV shows",
        url: "".concat(this.URL_BASE, "tv/popular").concat(this.URL_PARAMS)
      },
      rated: {
        name: "Top Rated TV shows",
        url: "".concat(this.URL_BASE, "tv/top_rated").concat(this.URL_PARAMS)
      }
    }; //this.state = {movies_type: "popular"};
  }

  _createClass(App, [{
    key: "removeElements",
    value: function removeElements(parent_element) {
      // clear html childrens
      while (parent_element.firstChild) {
        parent_element.removeChild(parent_element.firstChild);
      }
    }
  }, {
    key: "main",
    value: function main() {
      this.home_page_view();
    }
  }, {
    key: "home_page_view",
    value: function home_page_view(data) {
      var movie_url = this.MOVIE_TYPES[this.state.movies_type]["url"]; // let res = {state: this.state};

      var aditional_params = this.state.movie_page ? "&page=".concat(this.state.movie_page) : "";
      var url = "".concat(movie_url).concat(aditional_params);
      fetch(url).then(function (resp) {
        return resp.json();
      }).then(function (data) {
        console.log(data); // res["data"] = data;

        app.home_page_render(data, "app");
      }).catch(function (error) {
        console.log(JSON.stringify(error));
      });
    }
  }, {
    key: "home_page_render",
    value: function home_page_render(data) {
      var _this = this;

      var root_id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var root_id_element = this.root;

      if (root_id !== undefined) {
        root_id_element = root_id;
      }

      this.removeElements(this.root);
      var results = data["results"];
      var movies = ""; // choice movie type Popular/Rated
      // TODO: check index hasOwnProprty ???

      var _loop = function _loop(index) {
        var movie_type = _this.MOVIE_TYPES[index];
        var id = "radio-".concat(index, "-id");
        row = document.createElement('div');
        var radio = document.createElement("input");
        radio.setAttribute('id', id);
        radio.setAttribute('type', 'radio');
        radio.setAttribute('name', 'radio_group_movie_type');
        radio.setAttribute('value', index);

        if (_this.state.movies_type === index) {
          radio.setAttribute('checked', 'checked');
        }

        row.appendChild(radio);
        radio.addEventListener('change', function (e) {
          //e.preventDefault();
          console.log(index);
          _this.state.movie_type = index;

          _this.home_page_view();
        });
        var label = document.createElement('label');
        label.setAttribute('for', id);
        label.innerText = movie_type["name"]; // radio.innerText = 'fddfgdfg';

        row.appendChild(label);

        _this.root.appendChild(row);
      };

      for (var index in this.MOVIE_TYPES) {
        var row;

        _loop(index);
      } // this.pagination_render(data, root_html);
      // pagination


      var pagination = {
        page: data["page"],
        total_results: data["total_results"],
        total_pages: data["total_pages"]
      }; // movies

      var _loop2 = function _loop2(index) {
        var movie = results[index];
        var anchor = document.createElement("a");
        var li = document.createElement("li");
        anchor.setAttribute("href", "#");
        anchor.innerText = movie.name; // TODO: UGLY ???
        // let event_handler = this.handle_home_page_movie_click;

        anchor.addEventListener("click", function (e) {
          e.preventDefault();

          _this.handle_home_page_movie_click({
            event_page: 'main_page_movie_click',
            movie_type: _this.state.movies_type,
            object: movie
          }); //this.handleMovie(this);

        });
        li.appendChild(anchor);

        _this.root.appendChild(li);
      };

      for (var index in results) {
        _loop2(index);
      }

      var res = "\n    ".concat(this.movie_type_view(data.state.movies_type), "\n\n    <ul>\n        ").concat(movies, "        \n    </ul>\n  \n    <div class=\"pagination\">\n        <ul >\n            ").concat(this.render_pagination(pagination), "\n        </ul>\n    </div>\n    "); //document.getElementById("app").innerHTML = res;
    } // ************************* Movie Type Selector ***************************************

  }, {
    key: "movie_type_view",
    value: function movie_type_view(active_movie_type) {
      // let res = '';
      var res = "";
      var res2 = ""; //    res2 = radioInput;

      for (var index in this.MOVIE_TYPES) {
        var mtype = this.MOVIE_TYPES[index];
        var active = "";
        var radioInput = document.createElement("input");
        radioInput.setAttribute("type", "radio");
        radioInput.setAttribute("name", "movie_type");

        if (active_movie_type === index) {
          radioInput.setAttribute("checked", "checked");
        }

        radioInput.addEventListener("onchange", this.handleRadioChange);
        res2 += radioInput;
      }

      for (var _index in this.MOVIE_TYPES) {
        var _mtype = this.MOVIE_TYPES[_index];
        var _active = "";

        if (active_movie_type === _index) {
          _active = 'checked="checked"';
        }

        res += "<label><input class=\"movie_type_radio\" type=\"radio\" name=\"movie_type\" value=\"".concat(_index, "\" onchange=\"app.handleMovieTypeClick(this, event)\" ").concat(_active, ">\n                    ").concat(_mtype.name, "\n                </label>");
      }

      res = "\n    <div>\n \n    <form id=\"select_movie_type\" action=\"\" method=\"post\">\n        <fieldset> <legend><b>Movie type:</b></legend>\n        ".concat(res, "\n        </fieldset>\n        </form>\n    </div>\n    ");
      return res2;
    }
  }, {
    key: "handleRadioChange",
    value: function handleRadioChange(obj, e) {
      // let movie_type = obj.value;
      this.state["movies_type"] = obj.value;
      this.state.movie_page = 1;
      this.home_render();
    } // ************************* Movie Type Selector ***************************************

  }, {
    key: "render_pagination",
    value: function render_pagination(data) {
      var handler = "href=\"#\" onclick=\"return handleMoviePage(this)\"";
      var res = "<li><a ".concat(handler, " data-page=\"1\">First</a></li>");

      if (data.page - 1 > 1) {
        res += "<li><a ".concat(handler, " data-page=\"").concat(data.page - 1, "\">Prior</a></li>");
      }

      if (data.page + 1 < data.total_pages) {
        res += "<li><a ".concat(handler, " data-page=\"").concat(data.page + 1, "\">Next</a></li>");
      }

      res += "<li><a ".concat(handler, " data-page=\"").concat(data.total_pages, "\">Last</a></li>\n\n    <br>\n    page: ").concat(data.page, "\n    <br>\n    total pages: ").concat(data.total_pages);
      return res;
    }
  }, {
    key: "handle_home_page_movie_click",
    value: function handle_home_page_movie_click(data) {
      // TODO: add all modal pages !
      var aditional_params = ""; // let activity_page = data.activity_page;
      // let e = data.object.getAttribute('data-name');
      // TODO: poster fix ?

      var res = "";
      var movie_url = "";

      if (data.event_page === "main_page_movie_click") {
        res = "\n            id: ".concat(data.object.id, " <br>\n            name: ").concat(data.object.name, " <br><br>\n            overview: ").concat(data.object.overview, " <br><br>\n            poster: ").concat(data.object['poster_path'], " <br>        \n        "); // ???????????????
        // movie_url = `${this.URL_BASE}tv/popular`;
      }

      document.getElementById("modal_body").innerHTML = res;
      btn.onclick(data);
      return false;
    }
  }]);

  return App;
}();

var app = new App();
app.main();
},{"./styles.css":"src/styles.css"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58592" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map