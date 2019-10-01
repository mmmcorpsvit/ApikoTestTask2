parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"D9Nj":[function(require,module,exports) {

},{}],"Iw//":[function(require,module,exports) {
"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function n(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var r=function(){function t(){e(this,t),this.a=1}return n(t,[{key:"setInitialState",value:function(e){this.state=e}}]),t}();exports.default=r;
},{}],"K0yk":[function(require,module,exports) {
function e(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:void 0,s="?language=en-US&api_key=".concat("520586ec107ebeef4af3a185ee10ae9b");t&&(s+=t);var o="".concat(e).concat(s),i=new XMLHttpRequest;i.addEventListener("readystatechange",function(){this.readyState===this.DONE&&(this.responseText,a&&a(JSON.parse(this.responseText)))}),i.onerror=n,i.open("GET",o),i.setRequestHeader("Origin","*"),i.setRequestHeader("Content-Type","application/json"),i.send("{}")}
},{}],"H99C":[function(require,module,exports) {
"use strict";require("./styles.css");var t=a(require("./state")),e=require("./utils");function a(t){return t&&t.__esModule?t:{default:t}}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){for(var a=0;a<e.length;a++){var n=e[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function i(t,e,a){return e&&o(t.prototype,e),a&&o(t,a),t}var c=function(){function a(){n(this,a),this.BASE_URL="https://api.themoviedb.org/3/",this.MOVIE_TYPES={popular:{name:"Popular TV shows",url:"".concat(this.BASE_URL,"tv/popular")},rated:{name:"Top Rated TV shows",url:"".concat(this.BASE_URL,"tv/top_rated")}},this.state=new t.default,this.main()}return i(a,[{key:"main",value:function(){this.state.setInitialState({movies_type:"popular"}),this.render_main_page()}},{key:"render_main_page",value:function(t){var a=this.MOVIE_TYPES[this.state.movies_type].url,n={state:this.state},o="";this.state.movie_page&&(o="&page=".concat(this.state.movie_page)),(0,e.ajax)(a,o,function(){alert("Ajax error!")},function(t){n.data=t,d(n)})}}]),a}(),r=new c;function s(t){var e="";for(var a in MOVIE_TYPES){var n=MOVIE_TYPES[a],o="";t===a&&(o='checked="checked"'),e+='<label><input class="movie_type_radio" type="radio" name="movie_type" value="'.concat(a,'" onchange="handleMovieTypeClick(this, event)" ').concat(o,">\n                    ").concat(n.name,"\n                </label>")}return e='\n    <div>\n \n    <form id="select_movie_type" action="" method="post">\n        <fieldset> <legend><b>Movie type:</b></legend>\n        '.concat(e,"\n        </fieldset>\n        </form>\n    </div>\n    ")}function l(t,e){state.movies_type=t.value,state.movie_page=1,home_view()}function p(t){var e='href="#" onclick="return handleMoviePage(this)"',a="<li><a ".concat(e,' data-page="1">First</a></li>');return t.page-1>1&&(a+="<li><a ".concat(e,' data-page="').concat(t.page-1,'">Prior</a></li>')),t.page+1<t.total_pages&&(a+="<li><a ".concat(e,' data-page="').concat(t.page+1,'">Next</a></li>')),a+="<li><a ".concat(e,' data-page="').concat(t.total_pages,'">Last</a></li>\n\n    <br>\n    page: ').concat(t.page,"\n    <br>\n    total pages: ").concat(t.total_pages)}function u(t){return state.movie_page=t.getAttribute("data-page"),render_main_page(),!1}function d(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,a="app";void 0!==e&&(a=e),document.getElementById(a).innerHTML="";var n,o=t.data.results,i="",c={page:t.data.page,total_results:t.data.total_results,total_pages:t.data.total_pages};for(var r in o){var l=o[r];i+='<li><a href="#" \n            data-type="'.concat(t.state.movies_type,'" \n            data-id="').concat(l.id,'" \n            data-name="').concat(l.name,'"\n            data-overview="').concat(l.overview,'"\n            \n            data-poster="').concat(l.poster_path,'"\n               \n            ').concat('onclick="handleMovie(this);return false;"',">").concat(l.name,"</a></li>")}n="\n    ".concat(s(t.state.movies_type),"\n\n    <ul>\n        ").concat(i,'        \n    </ul>\n  \n    <div class="pagination">\n        <ul >\n            ').concat(p(c),"\n        </ul>\n    </div>\n    "),document.getElementById("app").innerHTML=n}function v(t){var e="";return"handleMovie"===t.activity_page&&(e="\n            id: ".concat(t.object.getAttribute("data-id")," <br>\n            name: ").concat(t.object.getAttribute("data-name")," <br><br>\n            overview: ").concat(t.object.getAttribute("data-overview")," <br><br>\n            poster: ").concat(t.object.getAttribute("data-poster")," <br>        \n        "),"".concat(BASE_URL,"tv/popular")),document.getElementById("modal_body").innerHTML=e,btn.onclick(t),!1}function g(t){v({activity_page:"handleMovie",object:t})}
},{"./styles.css":"D9Nj","./state":"Iw//","./utils":"K0yk"}]},{},["H99C"], null)
//# sourceMappingURL=/src.b090047f.js.map