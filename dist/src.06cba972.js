parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"D9Nj":[function(require,module,exports) {

},{}],"K0yk":[function(require,module,exports) {
"use strict";function e(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:void 0,s="?language=en-US&api_key=".concat("520586ec107ebeef4af3a185ee10ae9b");t&&(s+=t);var o="".concat(e).concat(s),r=new XMLHttpRequest;r.addEventListener("readystatechange",function(){this.readyState===this.DONE&&(this.responseText,a&&a(JSON.parse(this.responseText)))}),r.onerror=n,r.open("GET",o),r.setRequestHeader("Origin","*"),r.setRequestHeader("Content-Type","application/json"),r.send("{}")}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"H99C":[function(require,module,exports) {
"use strict";require("./styles.css");var e=t(require("./utils"));function t(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function i(e,t,a){return t&&n(e.prototype,t),a&&n(e,a),e}var o=function(){function t(){a(this,t),this.BASE_URL="https://api.themoviedb.org/3/",this.MOVIE_TYPES={popular:{name:"Popular TV shows",url:"".concat(this.BASE_URL,"tv/popular")},rated:{name:"Top Rated TV shows",url:"".concat(this.BASE_URL,"tv/top_rated")}},this.state={movies_type:"popular"}}return i(t,[{key:"main",value:function(){this.render_main_page()}},{key:"render_main_page",value:function(t){var a=this.MOVIE_TYPES[this.state.movies_type].url,n={state:this.state},i="";this.state.movie_page&&(i="&page=".concat(this.state.movie_page)),(0,e.default)(a,i,function(){alert("Ajax error!")},function(e){n.data=e,this.home_render(n)})}},{key:"movie_type_view",value:function(e){var t="";for(var a in this.MOVIE_TYPES){var n=this.MOVIE_TYPES[a],i="";e===a&&(i='checked="checked"'),t+='<label><input class="movie_type_radio" type="radio" name="movie_type" value="'.concat(a,'" onchange="this.handleMovieTypeClick(this, event)" ').concat(i,">\n                    ").concat(n.name,"\n                </label>")}return t='\n    <div>\n \n    <form id="select_movie_type" action="" method="post">\n        <fieldset> <legend><b>Movie type:</b></legend>\n        '.concat(t,"\n        </fieldset>\n        </form>\n    </div>\n    ")}},{key:"handleMovieTypeClick",value:function(e,t){this.state.movies_type=e.value,this.state.movie_page=1,this.home_render()}},{key:"render_pagination",value:function(e){var t='href="#" onclick="return handleMoviePage(this)"',a="<li><a ".concat(t,' data-page="1">First</a></li>');return e.page-1>1&&(a+="<li><a ".concat(t,' data-page="').concat(e.page-1,'">Prior</a></li>')),e.page+1<e.total_pages&&(a+="<li><a ".concat(t,' data-page="').concat(e.page+1,'">Next</a></li>')),a+="<li><a ".concat(t,' data-page="').concat(e.total_pages,'">Last</a></li>\n\n    <br>\n    page: ').concat(e.page,"\n    <br>\n    total pages: ").concat(e.total_pages)}},{key:"handleMoviePage",value:function(e){return this.state.movie_page=e.getAttribute("data-page"),this.render_main_page(),!1}},{key:"home_render",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,a="app";void 0!==t&&(a=t),document.getElementById(a).innerHTML="";var n,i=e.data.results,o="",r={page:e.data.page,total_results:e.data.total_results,total_pages:e.data.total_pages};for(var c in i){var l=i[c];o+='<li><a href="#" \n            data-type="'.concat(e.state.movies_type,'" \n            data-id="').concat(l.id,'" \n            data-name="').concat(l.name,'"\n            data-overview="').concat(l.overview,'"\n            \n            data-poster="').concat(l.poster_path,'"\n               \n            ').concat('onclick="handleMovie(this);return false;"',">").concat(l.name,"</a></li>")}n="\n    ".concat(movie_type_view(e.state.movies_type),"\n\n    <ul>\n        ").concat(o,'        \n    </ul>\n  \n    <div class="pagination">\n        <ul >\n            ').concat(this.render_pagination(r),"\n        </ul>\n    </div>\n    "),document.getElementById("app").innerHTML=n}},{key:"modal_view",value:function(e){var t="";return"handleMovie"===e.activity_page&&(t="\n            id: ".concat(e.object.getAttribute("data-id")," <br>\n            name: ").concat(e.object.getAttribute("data-name")," <br><br>\n            overview: ").concat(e.object.getAttribute("data-overview")," <br><br>\n            poster: ").concat(e.object.getAttribute("data-poster")," <br>        \n        "),"".concat(this.BASE_URL,"tv/popular")),document.getElementById("modal_body").innerHTML=t,btn.onclick(e),!1}},{key:"handleMovie",value:function(e){var t={activity_page:"handleMovie",object:e};this.modal_view(t)}}]),t}(),r=new o;r.main();
},{"./styles.css":"D9Nj","./utils":"K0yk"}]},{},["H99C"], null)
//# sourceMappingURL=/src.06cba972.js.map