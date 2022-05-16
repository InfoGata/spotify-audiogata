(()=>{function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},n={},i=t.parcelRequiree1e0;null==i&&((i=function(e){if(e in r)return r[e].exports;if(e in n){var t=n[e];delete n[e];var i={id:e,exports:{}};return r[e]=i,t.call(i.exports,i,i.exports),i.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},t.parcelRequiree1e0=i);var o;i.register("4pmpg",(function(e,t){"use strict";var r=i("gBiMb"),n=i("aHqGi"),o=i("bGXgz"),s=i("eW3qV");function a(e){var t=new o(e),i=n(o.prototype.request,t);return r.extend(i,o.prototype,t),r.extend(i,t),i}var c=a(i("1qNYy"));c.Axios=o,c.create=function(e){return a(s(c.defaults,e))},c.Cancel=i("1N35X"),c.CancelToken=i("cdbqI"),c.isCancel=i("cbWLS"),c.all=function(e){return Promise.all(e)},c.spread=i("i4UJt"),c.isAxiosError=i("9yMNx"),e.exports=c,e.exports.default=c})),i.register("gBiMb",(function(e,t){"use strict";var r=i("aHqGi"),n=Object.prototype.toString;function o(e){return"[object Array]"===n.call(e)}function s(e){return void 0===e}function a(e){return null!==e&&"object"==typeof e}function c(e){if("[object Object]"!==n.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function u(e){return"[object Function]"===n.call(e)}function l(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),o(e))for(var r=0,n=e.length;r<n;r++)t.call(null,e[r],r,e);else for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.call(null,e[i],i,e)}e.exports={isArray:o,isArrayBuffer:function(e){return"[object ArrayBuffer]"===n.call(e)},isBuffer:function(e){return null!==e&&!s(e)&&null!==e.constructor&&!s(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:a,isPlainObject:c,isUndefined:s,isDate:function(e){return"[object Date]"===n.call(e)},isFile:function(e){return"[object File]"===n.call(e)},isBlob:function(e){return"[object Blob]"===n.call(e)},isFunction:u,isStream:function(e){return a(e)&&u(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)},forEach:l,merge:function e(){var t={};function r(r,n){c(t[n])&&c(r)?t[n]=e(t[n],r):c(r)?t[n]=e({},r):o(r)?t[n]=r.slice():t[n]=r}for(var n=0,i=arguments.length;n<i;n++)l(arguments[n],r);return t},extend:function(e,t,n){return l(t,(function(t,i){e[i]=n&&"function"==typeof t?r(t,n):t})),e},trim:function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}}})),i.register("aHqGi",(function(e,t){"use strict";e.exports=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}}})),i.register("bGXgz",(function(e,t){"use strict";var r=i("gBiMb"),n=i("74Y2B"),o=i("4OKYc"),s=i("eXgnr"),a=i("eW3qV"),c=i("8l8wy"),u=c.validators;function l(e){this.defaults=e,this.interceptors={request:new o,response:new o}}l.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=a(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=e.transitional;void 0!==t&&c.assertOptions(t,{silentJSONParsing:u.transitional(u.boolean,"1.0.0"),forcedJSONParsing:u.transitional(u.boolean,"1.0.0"),clarifyTimeoutError:u.transitional(u.boolean,"1.0.0")},!1);var r=[],n=!0;this.interceptors.request.forEach((function(t){"function"==typeof t.runWhen&&!1===t.runWhen(e)||(n=n&&t.synchronous,r.unshift(t.fulfilled,t.rejected))}));var i,o=[];if(this.interceptors.response.forEach((function(e){o.push(e.fulfilled,e.rejected)})),!n){var l=[s,void 0];for(Array.prototype.unshift.apply(l,r),l=l.concat(o),i=Promise.resolve(e);l.length;)i=i.then(l.shift(),l.shift());return i}for(var p=e;r.length;){var f=r.shift(),d=r.shift();try{p=f(p)}catch(e){d(e);break}}try{i=s(p)}catch(e){return Promise.reject(e)}for(;o.length;)i=i.then(o.shift(),o.shift());return i},l.prototype.getUri=function(e){return e=a(this.defaults,e),n(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},r.forEach(["delete","get","head","options"],(function(e){l.prototype[e]=function(t,r){return this.request(a(r||{},{method:e,url:t,data:(r||{}).data}))}})),r.forEach(["post","put","patch"],(function(e){l.prototype[e]=function(t,r,n){return this.request(a(n||{},{method:e,url:t,data:r}))}})),e.exports=l})),i.register("74Y2B",(function(e,t){"use strict";var r=i("gBiMb");function n(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,i){if(!t)return e;var o;if(i)o=i(t);else if(r.isURLSearchParams(t))o=t.toString();else{var s=[];r.forEach(t,(function(e,t){null!=e&&(r.isArray(e)?t+="[]":e=[e],r.forEach(e,(function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),s.push(n(t)+"="+n(e))})))})),o=s.join("&")}if(o){var a=e.indexOf("#");-1!==a&&(e=e.slice(0,a)),e+=(-1===e.indexOf("?")?"?":"&")+o}return e}})),i.register("4OKYc",(function(e,t){"use strict";var r=i("gBiMb");function n(){this.handlers=[]}n.prototype.use=function(e,t,r){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!r&&r.synchronous,runWhen:r?r.runWhen:null}),this.handlers.length-1},n.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},n.prototype.forEach=function(e){r.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=n})),i.register("eXgnr",(function(e,t){"use strict";var r=i("gBiMb"),n=i("7vPtK"),o=i("cbWLS"),s=i("1qNYy");function a(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return a(e),e.headers=e.headers||{},e.data=n.call(e,e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),r.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||s.adapter)(e).then((function(t){return a(e),t.data=n.call(e,t.data,t.headers,e.transformResponse),t}),(function(t){return o(t)||(a(e),t&&t.response&&(t.response.data=n.call(e,t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}})),i.register("7vPtK",(function(e,t){"use strict";var r=i("gBiMb"),n=i("1qNYy");e.exports=function(e,t,i){var o=this||n;return r.forEach(i,(function(r){e=r.call(o,e,t)})),e}})),i.register("1qNYy",(function(e,t){var r=i("ieOnZ"),n=i("gBiMb"),o=i("6FM61"),s=i("jmtzu"),a={"Content-Type":"application/x-www-form-urlencoded"};function c(e,t){!n.isUndefined(e)&&n.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var u,l={transitional:{silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},adapter:(("undefined"!=typeof XMLHttpRequest||void 0!==r&&"[object process]"===Object.prototype.toString.call(r))&&(u=i("eQidV")),u),transformRequest:[function(e,t){return o(t,"Accept"),o(t,"Content-Type"),n.isFormData(e)||n.isArrayBuffer(e)||n.isBuffer(e)||n.isStream(e)||n.isFile(e)||n.isBlob(e)?e:n.isArrayBufferView(e)?e.buffer:n.isURLSearchParams(e)?(c(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):n.isObject(e)||t&&"application/json"===t["Content-Type"]?(c(t,"application/json"),function(e,t,r){if(n.isString(e))try{return(t||JSON.parse)(e),n.trim(e)}catch(e){if("SyntaxError"!==e.name)throw e}return(r||JSON.stringify)(e)}(e)):e}],transformResponse:[function(e){var t=this.transitional,r=t&&t.silentJSONParsing,i=t&&t.forcedJSONParsing,o=!r&&"json"===this.responseType;if(o||i&&n.isString(e)&&e.length)try{return JSON.parse(e)}catch(e){if(o){if("SyntaxError"===e.name)throw s(e,this,"E_JSON_PARSE");throw e}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300}};l.headers={common:{Accept:"application/json, text/plain, */*"}},n.forEach(["delete","get","head"],(function(e){l.headers[e]={}})),n.forEach(["post","put","patch"],(function(e){l.headers[e]=n.merge(a)})),e.exports=l})),i.register("ieOnZ",(function(e,t){var r,n,i=e.exports={};function o(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function a(e){if(r===setTimeout)return setTimeout(e,0);if((r===o||!r)&&setTimeout)return r=setTimeout,setTimeout(e,0);try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:o}catch(e){r=o}try{n="function"==typeof clearTimeout?clearTimeout:s}catch(e){n=s}}();var c,u=[],l=!1,p=-1;function f(){l&&c&&(l=!1,c.length?u=c.concat(u):p=-1,u.length&&d())}function d(){if(!l){var e=a(f);l=!0;for(var t=u.length;t;){for(c=u,u=[];++p<t;)c&&c[p].run();p=-1,t=u.length}c=null,l=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===s||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function m(){}i.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];u.push(new h(e,t)),1!==u.length||l||a(d)},h.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=m,i.addListener=m,i.once=m,i.off=m,i.removeListener=m,i.removeAllListeners=m,i.emit=m,i.prependListener=m,i.prependOnceListener=m,i.listeners=function(e){return[]},i.binding=function(e){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}})),i.register("6FM61",(function(e,t){"use strict";var r=i("gBiMb");e.exports=function(e,t){r.forEach(e,(function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])}))}})),i.register("jmtzu",(function(e,t){"use strict";e.exports=function(e,t,r,n,i){return e.config=t,r&&(e.code=r),e.request=n,e.response=i,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}})),i.register("eQidV",(function(e,t){"use strict";var r=i("gBiMb"),n=i("lBJvL"),o=i("biJ6e"),s=i("74Y2B"),a=i("dSFv7"),c=i("kIv68"),u=i("bS2Id"),l=i("bRI0M");e.exports=function(e){return new Promise((function(t,i){var p=e.data,f=e.headers,d=e.responseType;r.isFormData(p)&&delete f["Content-Type"];var h=new XMLHttpRequest;if(e.auth){var m=e.auth.username||"",g=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";f.Authorization="Basic "+btoa(m+":"+g)}var y=a(e.baseURL,e.url);function v(){if(h){var r="getAllResponseHeaders"in h?c(h.getAllResponseHeaders()):null,o={data:d&&"text"!==d&&"json"!==d?h.response:h.responseText,status:h.status,statusText:h.statusText,headers:r,config:e,request:h};n(t,i,o),h=null}}if(h.open(e.method.toUpperCase(),s(y,e.params,e.paramsSerializer),!0),h.timeout=e.timeout,"onloadend"in h?h.onloadend=v:h.onreadystatechange=function(){h&&4===h.readyState&&(0!==h.status||h.responseURL&&0===h.responseURL.indexOf("file:"))&&setTimeout(v)},h.onabort=function(){h&&(i(l("Request aborted",e,"ECONNABORTED",h)),h=null)},h.onerror=function(){i(l("Network Error",e,null,h)),h=null},h.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),i(l(t,e,e.transitional&&e.transitional.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED",h)),h=null},r.isStandardBrowserEnv()){var b=(e.withCredentials||u(y))&&e.xsrfCookieName?o.read(e.xsrfCookieName):void 0;b&&(f[e.xsrfHeaderName]=b)}"setRequestHeader"in h&&r.forEach(f,(function(e,t){void 0===p&&"content-type"===t.toLowerCase()?delete f[t]:h.setRequestHeader(t,e)})),r.isUndefined(e.withCredentials)||(h.withCredentials=!!e.withCredentials),d&&"json"!==d&&(h.responseType=e.responseType),"function"==typeof e.onDownloadProgress&&h.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&h.upload&&h.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){h&&(h.abort(),i(e),h=null)})),p||(p=null),h.send(p)}))}})),i.register("lBJvL",(function(e,t){"use strict";var r=i("bRI0M");e.exports=function(e,t,n){var i=n.config.validateStatus;n.status&&i&&!i(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}})),i.register("bRI0M",(function(e,t){"use strict";var r=i("jmtzu");e.exports=function(e,t,n,i,o){var s=new Error(e);return r(s,t,n,i,o)}})),i.register("biJ6e",(function(e,t){"use strict";var r=i("gBiMb");e.exports=r.isStandardBrowserEnv()?{write:function(e,t,n,i,o,s){var a=[];a.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),r.isString(i)&&a.push("path="+i),r.isString(o)&&a.push("domain="+o),!0===s&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}})),i.register("dSFv7",(function(e,t){"use strict";var r=i("40pC5"),n=i("6GfjI");e.exports=function(e,t){return e&&!r(t)?n(e,t):t}})),i.register("40pC5",(function(e,t){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}})),i.register("6GfjI",(function(e,t){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}})),i.register("kIv68",(function(e,t){"use strict";var r=i("gBiMb"),n=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,i,o,s={};return e?(r.forEach(e.split("\n"),(function(e){if(o=e.indexOf(":"),t=r.trim(e.substr(0,o)).toLowerCase(),i=r.trim(e.substr(o+1)),t){if(s[t]&&n.indexOf(t)>=0)return;s[t]="set-cookie"===t?(s[t]?s[t]:[]).concat([i]):s[t]?s[t]+", "+i:i}})),s):s}})),i.register("bS2Id",(function(e,t){"use strict";var r=i("gBiMb");e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function i(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=i(window.location.href),function(t){var n=r.isString(t)?i(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}})),i.register("cbWLS",(function(e,t){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}})),i.register("eW3qV",(function(e,t){"use strict";var r=i("gBiMb");e.exports=function(e,t){t=t||{};var n={},i=["url","method","data"],o=["headers","auth","proxy","params"],s=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],a=["validateStatus"];function c(e,t){return r.isPlainObject(e)&&r.isPlainObject(t)?r.merge(e,t):r.isPlainObject(t)?r.merge({},t):r.isArray(t)?t.slice():t}function u(i){r.isUndefined(t[i])?r.isUndefined(e[i])||(n[i]=c(void 0,e[i])):n[i]=c(e[i],t[i])}r.forEach(i,(function(e){r.isUndefined(t[e])||(n[e]=c(void 0,t[e]))})),r.forEach(o,u),r.forEach(s,(function(i){r.isUndefined(t[i])?r.isUndefined(e[i])||(n[i]=c(void 0,e[i])):n[i]=c(void 0,t[i])})),r.forEach(a,(function(r){r in t?n[r]=c(e[r],t[r]):r in e&&(n[r]=c(void 0,e[r]))}));var l=i.concat(o).concat(s).concat(a),p=Object.keys(e).concat(Object.keys(t)).filter((function(e){return-1===l.indexOf(e)}));return r.forEach(p,u),n}})),i.register("8l8wy",(function(e,t){"use strict";var r=i("kGKMV"),n={};["object","boolean","number","function","string","symbol"].forEach((function(e,t){n[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}}));var o={},s=r.version.split(".");function a(e,t){for(var r=t?t.split("."):s,n=e.split("."),i=0;i<3;i++){if(r[i]>n[i])return!0;if(r[i]<n[i])return!1}return!1}n.transitional=function(e,t,n){var i=t&&a(t);function s(e,t){return"[Axios v"+r.version+"] Transitional option '"+e+"'"+t+(n?". "+n:"")}return function(r,n,a){if(!1===e)throw new Error(s(n," has been removed in "+t));return i&&!o[n]&&(o[n]=!0,console.warn(s(n," has been deprecated since v"+t+" and will be removed in the near future"))),!e||e(r,n,a)}},e.exports={isOlderVersion:a,assertOptions:function(e,t,r){if("object"!=typeof e)throw new TypeError("options must be an object");for(var n=Object.keys(e),i=n.length;i-- >0;){var o=n[i],s=t[o];if(s){var a=e[o],c=void 0===a||s(a,o,e);if(!0!==c)throw new TypeError("option "+o+" must be "+c)}else if(!0!==r)throw Error("Unknown option "+o)}},validators:n}})),i.register("kGKMV",(function(e,t){e.exports=JSON.parse('{"name":"axios","version":"0.21.4","description":"Promise based HTTP client for the browser and node.js","main":"index.js","scripts":{"test":"grunt test","start":"node ./sandbox/server.js","build":"NODE_ENV=production grunt build","preversion":"npm test","version":"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json","postversion":"git push && git push --tags","examples":"node ./examples/server.js","coveralls":"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js","fix":"eslint --fix lib/**/*.js"},"repository":{"type":"git","url":"https://github.com/axios/axios.git"},"keywords":["xhr","http","ajax","promise","node"],"author":"Matt Zabriskie","license":"MIT","bugs":{"url":"https://github.com/axios/axios/issues"},"homepage":"https://axios-http.com","devDependencies":{"coveralls":"^3.0.0","es6-promise":"^4.2.4","grunt":"^1.3.0","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^23.0.0","grunt-karma":"^4.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^4.0.2","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1","karma":"^6.3.2","karma-chrome-launcher":"^3.1.0","karma-firefox-launcher":"^2.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^4.3.6","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.8","karma-webpack":"^4.0.2","load-grunt-tasks":"^3.5.2","minimist":"^1.2.0","mocha":"^8.2.1","sinon":"^4.5.0","terser-webpack-plugin":"^4.2.3","typescript":"^4.0.5","url-search-params":"^0.10.0","webpack":"^4.44.2","webpack-dev-server":"^3.11.0"},"browser":{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},"jsdelivr":"dist/axios.min.js","unpkg":"dist/axios.min.js","typings":"./index.d.ts","dependencies":{"follow-redirects":"^1.14.0"},"bundlesize":[{"path":"./dist/axios.min.js","threshold":"5kB"}]}')})),i.register("1N35X",(function(e,t){"use strict";function r(e){this.message=e}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,e.exports=r})),i.register("cdbqI",(function(e,t){"use strict";var r=i("1N35X");function n(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var n=this;e((function(e){n.reason||(n.reason=new r(e),t(n.reason))}))}n.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},n.source=function(){var e;return{token:new n((function(t){e=t})),cancel:e}},e.exports=n})),i.register("i4UJt",(function(e,t){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}})),i.register("9yMNx",(function(e,t){"use strict";e.exports=function(e){return"object"==typeof e&&!0===e.isAxiosError}})),o=i("4pmpg");const s=e(o).create(),a=(e,t)=>{localStorage.setItem("access_token",e),localStorage.setItem("refresh_token",t)},c=async()=>{const t=localStorage.getItem("refresh_token"),r=new URLSearchParams;r.append("grant_type","refresh_token"),r.append("refresh_token",t),r.append("client_id","b8f2fce4341b42e580e66a37302b358e");const n=await e(o).post("https://accounts.spotify.com/api/token",r,{headers:{"Content-Type":"application/x-www-form-urlencoded"}});if(n.data.access_token&&n.data.refresh_token)return a(n.data.access_token,n.data.refresh_token),n.data.access_token};function u(e){return e.map((e=>({albumId:e.album&&e.album.uri,apiId:e.uri,artistId:e.artists[0].uri,artistName:e.artists[0].name,duration:e.duration_ms/1e3,from:"spotify",images:e.album.images,name:e.name})))}function l(e){return e.map((e=>({apiId:e.uri,artistId:e.artists[0].uri,artistName:e.artists[0].name,from:"spotify",name:e.name})))}s.interceptors.request.use((e=>{const t=localStorage.getItem("access_token");return t&&(e.headers.Authorization="Bearer "+t),e}),(e=>{Promise.reject(e)})),s.interceptors.response.use((e=>e),(async t=>{const r=t.config;if(401===t.response.status&&!r._retry){r._retry=!0;const t=await c();return e(o).defaults.headers.common.Authorization="Bearer "+t,s(r)}}));const p=new class{constructor(){this.name="spotify",this.apiUrl="https://api.spotify.com/v1",this.initializePlayer=()=>{const e=new window.Spotify.Player({getOAuthToken:async e=>{e(await c())},name:"Web Playback SDK Quick Start Player"});e.addListener("initialization_error",(e=>{console.error(e)})),e.addListener("authentication_error",(e=>{console.error(e)})),e.addListener("account_error",(e=>{console.error(e)})),e.addListener("playback_error",(e=>{console.error(e)})),e.addListener("player_state_changed",(async e=>{await application.setTrackTime(e.position/1e3),this.internalTime=e.position,e.paused&&0===e.position&&e.restrictions.disallow_resuming_reasons&&"not_paused"===e.restrictions.disallow_resuming_reasons[0]&&(this.interval&&clearInterval(this.interval),await application.endTrack())})),e.addListener("ready",(({device_id:e})=>{console.log("Ready with Device ID",e),this.deviceId=e})),e.addListener("not_ready",(({device_id:e})=>{console.log("Device ID has gone offline",e)})),e.connect()},this.updateTime=()=>{this.internalTime+=1e3,application.setTrackTime(this.internalTime/1e3)},this.deviceId="",this.accessToken="",this.internalTime=0,this.init()}init(){window.onSpotifyWebPlaybackSDKReady=this.initializePlayer.bind(this)}setAccessToken(e){this.accessToken=e}loadScript(){const e=document.createElement("script");e.id="spotify-player",e.type="text/javascript",e.async=!1,e.defer=!0,e.src="https://sdk.scdn.co/spotify-player.js",document.head.appendChild(e)}async play(e){if(!this.deviceId)return;const t=`${this.apiUrl}/me/player/play?device_id=${this.deviceId}`,r=e.apiId||"";await s.put(t,{uris:[r]},{headers:{"Content-Type":"application/json"}}),this.interval=window.setInterval(this.updateTime,1e3)}async pause(){this.deviceId&&(await s.put("https://api.spotify.com/v1/me/player/pause",{headers:{"Content-Type":"application/json"}}),this.interval&&clearInterval(this.interval))}async resume(){this.deviceId&&(await s.put(`https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`,{headers:{"Content-Type":"application/json"}}),this.interval=window.setInterval(this.updateTime,1e3))}async seek(e){this.deviceId&&await s.put("https://api.spotify.com/v1/me/player/seek?position_ms="+1e3*e,{headers:{"Content-Type":"application/json"}})}async setVolume(e){await s.put("https://api.spotify.com/v1/me/player/volume?volume_percent="+100*e,{headers:{"Content-Type":"application/json"}})}async searchAll(e){if(!this.accessToken)return{tracks:[],albums:[],artists:[]};const t=`${this.apiUrl}/search?q=${encodeURIComponent(e)}&type=album,artist,track`,r=(await s.get(t)).data,n=u(r.tracks.items),i=l(r.albums.items),o=function(e){return e.map((e=>({apiId:e.uri,from:"spotify",name:e.name})))}(r.artists.items);return{tracks:n,albums:i,artists:o}}async getAlbumTracks(e){if(!this.accessToken)return[];const t=e.apiId.split(":").pop(),r=`${this.apiUrl}/albums/${t}/tracks?limit=50`,n=u((await s.get(r)).data.items);return n.forEach((t=>{t.albumId=e.apiId})),n}async getArtistAlbums(e){if(!this.accessToken)return[];const t=e.apiId.split(":").pop(),r=`${this.apiUrl}/artists/${t}/albums`;return l((await s.get(r)).data.items)}async getPlaylistTracks(e){const t=`https://api.spotify.com/v1/playlists/${e.apiId}`;return(await s.get(t)).data.tracks.items.map((e=>({albumId:e.track.album&&e.track.album.uri,apiId:e.track.uri,artistId:e.track.artists[0].uri,artistName:e.track.artists[0].name,duration:e.track.duration_ms/1e3,from:"spotify",images:e.track.album.images,name:e.track.name,source:""})))}async getUserPlaylists(){return(await s.get("https://api.spotify.com/v1/me/playlists")).data.items.map((e=>({name:e.name,images:e.images,apiId:e.id})))}},f=()=>{p.loadScript(),application.searchAll=p.searchAll.bind(p),application.getAlbumTracks=p.getAlbumTracks.bind(p),application.getArtistAlbums=p.getArtistAlbums.bind(p),application.play=p.play.bind(p),application.pause=p.pause.bind(p),application.resume=p.resume.bind(p),application.seek=p.seek.bind(p),application.setVolume=p.setVolume.bind(p),application.getUserPlaylists=p.getUserPlaylists.bind(p),application.getPlaylistTracks=p.getPlaylistTracks.bind(p)};application.onDeepLinkMessage=async e=>{application.postUiMessage({type:"deeplink",url:e})},application.onUiMessage=e=>{if("init"===e){const e=document.location.host.split(".");e.shift();const t=e.join("."),r=`${document.location.protocol}//${t}`;application.postUiMessage({type:"origin",value:r})}else e.access_token&&(console.log(e),a(e.access_token,e.refresh_token),p.setAccessToken(e.access_token),f())},(()=>{const e=localStorage.getItem("access_token"),t=localStorage.getItem("refresh_token");e&&t&&(application.postUiMessage({type:"login"}),p.setAccessToken(e),f())})()})();