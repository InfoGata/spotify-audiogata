(()=>{function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},n={},a=t.parcelRequiree1e0;null==a&&((a=function(e){if(e in r)return r[e].exports;if(e in n){var t=n[e];delete n[e];var a={id:e,exports:{}};return r[e]=a,t.call(a.exports,a,a.exports),a.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},t.parcelRequiree1e0=a),a.register("4pmpg",(function(e,t){"use strict";var r=a("gBiMb"),n=a("aHqGi"),i=a("bGXgz"),o=a("eW3qV");function s(e){var t=new i(e),a=n(i.prototype.request,t);return r.extend(a,i.prototype,t),r.extend(a,t),a}var c=s(a("1qNYy"));c.Axios=i,c.create=function(e){return s(o(c.defaults,e))},c.Cancel=a("1N35X"),c.CancelToken=a("cdbqI"),c.isCancel=a("cbWLS"),c.all=function(e){return Promise.all(e)},c.spread=a("i4UJt"),c.isAxiosError=a("9yMNx"),e.exports=c,e.exports.default=c})),a.register("gBiMb",(function(e,t){"use strict";var r=a("aHqGi"),n=Object.prototype.toString;function i(e){return"[object Array]"===n.call(e)}function o(e){return void 0===e}function s(e){return null!==e&&"object"==typeof e}function c(e){if("[object Object]"!==n.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function u(e){return"[object Function]"===n.call(e)}function p(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),i(e))for(var r=0,n=e.length;r<n;r++)t.call(null,e[r],r,e);else for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.call(null,e[a],a,e)}e.exports={isArray:i,isArrayBuffer:function(e){return"[object ArrayBuffer]"===n.call(e)},isBuffer:function(e){return null!==e&&!o(e)&&null!==e.constructor&&!o(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:s,isPlainObject:c,isUndefined:o,isDate:function(e){return"[object Date]"===n.call(e)},isFile:function(e){return"[object File]"===n.call(e)},isBlob:function(e){return"[object Blob]"===n.call(e)},isFunction:u,isStream:function(e){return s(e)&&u(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)},forEach:p,merge:function e(){var t={};function r(r,n){c(t[n])&&c(r)?t[n]=e(t[n],r):c(r)?t[n]=e({},r):i(r)?t[n]=r.slice():t[n]=r}for(var n=0,a=arguments.length;n<a;n++)p(arguments[n],r);return t},extend:function(e,t,n){return p(t,(function(t,a){e[a]=n&&"function"==typeof t?r(t,n):t})),e},trim:function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}}})),a.register("aHqGi",(function(e,t){"use strict";e.exports=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}}})),a.register("bGXgz",(function(e,t){"use strict";var r=a("gBiMb"),n=a("74Y2B"),i=a("4OKYc"),o=a("eXgnr"),s=a("eW3qV"),c=a("8l8wy"),u=c.validators;function p(e){this.defaults=e,this.interceptors={request:new i,response:new i}}p.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=s(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=e.transitional;void 0!==t&&c.assertOptions(t,{silentJSONParsing:u.transitional(u.boolean,"1.0.0"),forcedJSONParsing:u.transitional(u.boolean,"1.0.0"),clarifyTimeoutError:u.transitional(u.boolean,"1.0.0")},!1);var r=[],n=!0;this.interceptors.request.forEach((function(t){"function"==typeof t.runWhen&&!1===t.runWhen(e)||(n=n&&t.synchronous,r.unshift(t.fulfilled,t.rejected))}));var a,i=[];if(this.interceptors.response.forEach((function(e){i.push(e.fulfilled,e.rejected)})),!n){var p=[o,void 0];for(Array.prototype.unshift.apply(p,r),p=p.concat(i),a=Promise.resolve(e);p.length;)a=a.then(p.shift(),p.shift());return a}for(var l=e;r.length;){var f=r.shift(),d=r.shift();try{l=f(l)}catch(e){d(e);break}}try{a=o(l)}catch(e){return Promise.reject(e)}for(;i.length;)a=a.then(i.shift(),i.shift());return a},p.prototype.getUri=function(e){return e=s(this.defaults,e),n(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},r.forEach(["delete","get","head","options"],(function(e){p.prototype[e]=function(t,r){return this.request(s(r||{},{method:e,url:t,data:(r||{}).data}))}})),r.forEach(["post","put","patch"],(function(e){p.prototype[e]=function(t,r,n){return this.request(s(n||{},{method:e,url:t,data:r}))}})),e.exports=p})),a.register("74Y2B",(function(e,t){"use strict";var r=a("gBiMb");function n(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,a){if(!t)return e;var i;if(a)i=a(t);else if(r.isURLSearchParams(t))i=t.toString();else{var o=[];r.forEach(t,(function(e,t){null!=e&&(r.isArray(e)?t+="[]":e=[e],r.forEach(e,(function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),o.push(n(t)+"="+n(e))})))})),i=o.join("&")}if(i){var s=e.indexOf("#");-1!==s&&(e=e.slice(0,s)),e+=(-1===e.indexOf("?")?"?":"&")+i}return e}})),a.register("4OKYc",(function(e,t){"use strict";var r=a("gBiMb");function n(){this.handlers=[]}n.prototype.use=function(e,t,r){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!r&&r.synchronous,runWhen:r?r.runWhen:null}),this.handlers.length-1},n.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},n.prototype.forEach=function(e){r.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=n})),a.register("eXgnr",(function(e,t){"use strict";var r=a("gBiMb"),n=a("7vPtK"),i=a("cbWLS"),o=a("1qNYy");function s(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return s(e),e.headers=e.headers||{},e.data=n.call(e,e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),r.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||o.adapter)(e).then((function(t){return s(e),t.data=n.call(e,t.data,t.headers,e.transformResponse),t}),(function(t){return i(t)||(s(e),t&&t.response&&(t.response.data=n.call(e,t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}})),a.register("7vPtK",(function(e,t){"use strict";var r=a("gBiMb"),n=a("1qNYy");e.exports=function(e,t,a){var i=this||n;return r.forEach(a,(function(r){e=r.call(i,e,t)})),e}})),a.register("1qNYy",(function(e,t){var r=a("ieOnZ"),n=a("gBiMb"),i=a("6FM61"),o=a("jmtzu"),s={"Content-Type":"application/x-www-form-urlencoded"};function c(e,t){!n.isUndefined(e)&&n.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var u,p={transitional:{silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},adapter:(("undefined"!=typeof XMLHttpRequest||void 0!==r&&"[object process]"===Object.prototype.toString.call(r))&&(u=a("eQidV")),u),transformRequest:[function(e,t){return i(t,"Accept"),i(t,"Content-Type"),n.isFormData(e)||n.isArrayBuffer(e)||n.isBuffer(e)||n.isStream(e)||n.isFile(e)||n.isBlob(e)?e:n.isArrayBufferView(e)?e.buffer:n.isURLSearchParams(e)?(c(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):n.isObject(e)||t&&"application/json"===t["Content-Type"]?(c(t,"application/json"),function(e,t,r){if(n.isString(e))try{return(t||JSON.parse)(e),n.trim(e)}catch(e){if("SyntaxError"!==e.name)throw e}return(r||JSON.stringify)(e)}(e)):e}],transformResponse:[function(e){var t=this.transitional,r=t&&t.silentJSONParsing,a=t&&t.forcedJSONParsing,i=!r&&"json"===this.responseType;if(i||a&&n.isString(e)&&e.length)try{return JSON.parse(e)}catch(e){if(i){if("SyntaxError"===e.name)throw o(e,this,"E_JSON_PARSE");throw e}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300}};p.headers={common:{Accept:"application/json, text/plain, */*"}},n.forEach(["delete","get","head"],(function(e){p.headers[e]={}})),n.forEach(["post","put","patch"],(function(e){p.headers[e]=n.merge(s)})),e.exports=p})),a.register("ieOnZ",(function(e,t){var r,n,a=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function s(e){if(r===setTimeout)return setTimeout(e,0);if((r===i||!r)&&setTimeout)return r=setTimeout,setTimeout(e,0);try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:i}catch(e){r=i}try{n="function"==typeof clearTimeout?clearTimeout:o}catch(e){n=o}}();var c,u=[],p=!1,l=-1;function f(){p&&c&&(p=!1,c.length?u=c.concat(u):l=-1,u.length&&d())}function d(){if(!p){var e=s(f);p=!0;for(var t=u.length;t;){for(c=u,u=[];++l<t;)c&&c[l].run();l=-1,t=u.length}c=null,p=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===o||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function m(e,t){this.fun=e,this.array=t}function h(){}a.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];u.push(new m(e,t)),1!==u.length||p||s(d)},m.prototype.run=function(){this.fun.apply(null,this.array)},a.title="browser",a.browser=!0,a.env={},a.argv=[],a.version="",a.versions={},a.on=h,a.addListener=h,a.once=h,a.off=h,a.removeListener=h,a.removeAllListeners=h,a.emit=h,a.prependListener=h,a.prependOnceListener=h,a.listeners=function(e){return[]},a.binding=function(e){throw new Error("process.binding is not supported")},a.cwd=function(){return"/"},a.chdir=function(e){throw new Error("process.chdir is not supported")},a.umask=function(){return 0}})),a.register("6FM61",(function(e,t){"use strict";var r=a("gBiMb");e.exports=function(e,t){r.forEach(e,(function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])}))}})),a.register("jmtzu",(function(e,t){"use strict";e.exports=function(e,t,r,n,a){return e.config=t,r&&(e.code=r),e.request=n,e.response=a,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}})),a.register("eQidV",(function(e,t){"use strict";var r=a("gBiMb"),n=a("lBJvL"),i=a("biJ6e"),o=a("74Y2B"),s=a("dSFv7"),c=a("kIv68"),u=a("bS2Id"),p=a("bRI0M");e.exports=function(e){return new Promise((function(t,a){var l=e.data,f=e.headers,d=e.responseType;r.isFormData(l)&&delete f["Content-Type"];var m=new XMLHttpRequest;if(e.auth){var h=e.auth.username||"",g=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";f.Authorization="Basic "+btoa(h+":"+g)}var v=s(e.baseURL,e.url);function y(){if(m){var r="getAllResponseHeaders"in m?c(m.getAllResponseHeaders()):null,i={data:d&&"text"!==d&&"json"!==d?m.response:m.responseText,status:m.status,statusText:m.statusText,headers:r,config:e,request:m};n(t,a,i),m=null}}if(m.open(e.method.toUpperCase(),o(v,e.params,e.paramsSerializer),!0),m.timeout=e.timeout,"onloadend"in m?m.onloadend=y:m.onreadystatechange=function(){m&&4===m.readyState&&(0!==m.status||m.responseURL&&0===m.responseURL.indexOf("file:"))&&setTimeout(y)},m.onabort=function(){m&&(a(p("Request aborted",e,"ECONNABORTED",m)),m=null)},m.onerror=function(){a(p("Network Error",e,null,m)),m=null},m.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),a(p(t,e,e.transitional&&e.transitional.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED",m)),m=null},r.isStandardBrowserEnv()){var b=(e.withCredentials||u(v))&&e.xsrfCookieName?i.read(e.xsrfCookieName):void 0;b&&(f[e.xsrfHeaderName]=b)}"setRequestHeader"in m&&r.forEach(f,(function(e,t){void 0===l&&"content-type"===t.toLowerCase()?delete f[t]:m.setRequestHeader(t,e)})),r.isUndefined(e.withCredentials)||(m.withCredentials=!!e.withCredentials),d&&"json"!==d&&(m.responseType=e.responseType),"function"==typeof e.onDownloadProgress&&m.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&m.upload&&m.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){m&&(m.abort(),a(e),m=null)})),l||(l=null),m.send(l)}))}})),a.register("lBJvL",(function(e,t){"use strict";var r=a("bRI0M");e.exports=function(e,t,n){var a=n.config.validateStatus;n.status&&a&&!a(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}})),a.register("bRI0M",(function(e,t){"use strict";var r=a("jmtzu");e.exports=function(e,t,n,a,i){var o=new Error(e);return r(o,t,n,a,i)}})),a.register("biJ6e",(function(e,t){"use strict";var r=a("gBiMb");e.exports=r.isStandardBrowserEnv()?{write:function(e,t,n,a,i,o){var s=[];s.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),r.isString(a)&&s.push("path="+a),r.isString(i)&&s.push("domain="+i),!0===o&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}})),a.register("dSFv7",(function(e,t){"use strict";var r=a("40pC5"),n=a("6GfjI");e.exports=function(e,t){return e&&!r(t)?n(e,t):t}})),a.register("40pC5",(function(e,t){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}})),a.register("6GfjI",(function(e,t){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}})),a.register("kIv68",(function(e,t){"use strict";var r=a("gBiMb"),n=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,a,i,o={};return e?(r.forEach(e.split("\n"),(function(e){if(i=e.indexOf(":"),t=r.trim(e.substr(0,i)).toLowerCase(),a=r.trim(e.substr(i+1)),t){if(o[t]&&n.indexOf(t)>=0)return;o[t]="set-cookie"===t?(o[t]?o[t]:[]).concat([a]):o[t]?o[t]+", "+a:a}})),o):o}})),a.register("bS2Id",(function(e,t){"use strict";var r=a("gBiMb");e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function a(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=a(window.location.href),function(t){var n=r.isString(t)?a(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}})),a.register("cbWLS",(function(e,t){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}})),a.register("eW3qV",(function(e,t){"use strict";var r=a("gBiMb");e.exports=function(e,t){t=t||{};var n={},a=["url","method","data"],i=["headers","auth","proxy","params"],o=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],s=["validateStatus"];function c(e,t){return r.isPlainObject(e)&&r.isPlainObject(t)?r.merge(e,t):r.isPlainObject(t)?r.merge({},t):r.isArray(t)?t.slice():t}function u(a){r.isUndefined(t[a])?r.isUndefined(e[a])||(n[a]=c(void 0,e[a])):n[a]=c(e[a],t[a])}r.forEach(a,(function(e){r.isUndefined(t[e])||(n[e]=c(void 0,t[e]))})),r.forEach(i,u),r.forEach(o,(function(a){r.isUndefined(t[a])?r.isUndefined(e[a])||(n[a]=c(void 0,e[a])):n[a]=c(void 0,t[a])})),r.forEach(s,(function(r){r in t?n[r]=c(e[r],t[r]):r in e&&(n[r]=c(void 0,e[r]))}));var p=a.concat(i).concat(o).concat(s),l=Object.keys(e).concat(Object.keys(t)).filter((function(e){return-1===p.indexOf(e)}));return r.forEach(l,u),n}})),a.register("8l8wy",(function(e,t){"use strict";var r=a("kGKMV"),n={};["object","boolean","number","function","string","symbol"].forEach((function(e,t){n[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}}));var i={},o=r.version.split(".");function s(e,t){for(var r=t?t.split("."):o,n=e.split("."),a=0;a<3;a++){if(r[a]>n[a])return!0;if(r[a]<n[a])return!1}return!1}n.transitional=function(e,t,n){var a=t&&s(t);function o(e,t){return"[Axios v"+r.version+"] Transitional option '"+e+"'"+t+(n?". "+n:"")}return function(r,n,s){if(!1===e)throw new Error(o(n," has been removed in "+t));return a&&!i[n]&&(i[n]=!0,console.warn(o(n," has been deprecated since v"+t+" and will be removed in the near future"))),!e||e(r,n,s)}},e.exports={isOlderVersion:s,assertOptions:function(e,t,r){if("object"!=typeof e)throw new TypeError("options must be an object");for(var n=Object.keys(e),a=n.length;a-- >0;){var i=n[a],o=t[i];if(o){var s=e[i],c=void 0===s||o(s,i,e);if(!0!==c)throw new TypeError("option "+i+" must be "+c)}else if(!0!==r)throw Error("Unknown option "+i)}},validators:n}})),a.register("kGKMV",(function(e,t){e.exports=JSON.parse('{"name":"axios","version":"0.21.4","description":"Promise based HTTP client for the browser and node.js","main":"index.js","scripts":{"test":"grunt test","start":"node ./sandbox/server.js","build":"NODE_ENV=production grunt build","preversion":"npm test","version":"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json","postversion":"git push && git push --tags","examples":"node ./examples/server.js","coveralls":"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js","fix":"eslint --fix lib/**/*.js"},"repository":{"type":"git","url":"https://github.com/axios/axios.git"},"keywords":["xhr","http","ajax","promise","node"],"author":"Matt Zabriskie","license":"MIT","bugs":{"url":"https://github.com/axios/axios/issues"},"homepage":"https://axios-http.com","devDependencies":{"coveralls":"^3.0.0","es6-promise":"^4.2.4","grunt":"^1.3.0","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^23.0.0","grunt-karma":"^4.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^4.0.2","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1","karma":"^6.3.2","karma-chrome-launcher":"^3.1.0","karma-firefox-launcher":"^2.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^4.3.6","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.8","karma-webpack":"^4.0.2","load-grunt-tasks":"^3.5.2","minimist":"^1.2.0","mocha":"^8.2.1","sinon":"^4.5.0","terser-webpack-plugin":"^4.2.3","typescript":"^4.0.5","url-search-params":"^0.10.0","webpack":"^4.44.2","webpack-dev-server":"^3.11.0"},"browser":{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},"jsdelivr":"dist/axios.min.js","unpkg":"dist/axios.min.js","typings":"./index.d.ts","dependencies":{"follow-redirects":"^1.14.0"},"bundlesize":[{"path":"./dist/axios.min.js","threshold":"5kB"}]}')})),a.register("1N35X",(function(e,t){"use strict";function r(e){this.message=e}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,e.exports=r})),a.register("cdbqI",(function(e,t){"use strict";var r=a("1N35X");function n(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var n=this;e((function(e){n.reason||(n.reason=new r(e),t(n.reason))}))}n.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},n.source=function(){var e;return{token:new n((function(t){e=t})),cancel:e}},e.exports=n})),a.register("i4UJt",(function(e,t){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}})),a.register("9yMNx",(function(e,t){"use strict";e.exports=function(e){return"object"==typeof e&&!0===e.isAxiosError}}));var i;i=a("4pmpg");const o=e(i).create(),s=e=>{application.postUiMessage(e)},c=(e,t)=>{localStorage.setItem("access_token",e),localStorage.setItem("refresh_token",t)},u=async()=>{const t=localStorage.getItem("refresh_token");if(t)try{const r=new URLSearchParams;r.append("grant_type","refresh_token"),r.append("refresh_token",t),r.append("client_id",localStorage.getItem("clientId")||"");const n=await e(i).post("https://accounts.spotify.com/api/token",r,{headers:{"Content-Type":"application/x-www-form-urlencoded"}});if(n.data.access_token&&n.data.refresh_token)return c(n.data.access_token,n.data.refresh_token),n.data.access_token}catch{return localStorage.getItem("access_token")}};function p(e){return e.map((e=>({albumId:e.album&&e.album.uri,apiId:e.uri,artistId:e.artists[0].uri,artistName:e.artists[0].name,duration:e.duration_ms/1e3,images:e.album.images,name:e.name})))}function l(e){return e.map((e=>({apiId:e.uri,name:e.name,images:[]})))}function f(e){return e.map((e=>({apiId:e.uri,artistId:e.artists[0].uri,artistName:e.artists[0].name,name:e.name,images:[]})))}o.interceptors.request.use((e=>{const t=localStorage.getItem("access_token");return t&&(e.headers.Authorization="Bearer "+t),e}),(e=>{Promise.reject(e)})),o.interceptors.response.use((e=>e),(async t=>{const r=t.config;if(401===t.response.status&&!r._retry){r._retry=!0;const t=await u();return e(i).defaults.headers.common.Authorization="Bearer "+t,o(r)}}));async function d(e){const t=`https://api.spotify.com/v1/search?q=${encodeURIComponent(e.query)}&type=album,artist,track`,r=(await o.get(t)).data,n=p(r.tracks?.items||[]),a=f(r.albums?.items||[]),i=l(r.artists?.items||[]);return{tracks:{items:n,pageInfo:r.tracks&&{resultsPerPage:r.tracks.limit,totalResults:r.tracks.total,offset:r.tracks.offset,nextPage:r.tracks.next||void 0,prevPage:r.tracks.previous||void 0}},albums:{items:a,pageInfo:r.albums&&{resultsPerPage:r.albums.limit,totalResults:r.albums.total,offset:r.albums.offset,nextPage:r.albums.next||void 0,prevPage:r.albums.previous||void 0}},artists:{items:i,pageInfo:r.artists&&{resultsPerPage:r.artists.limit,totalResults:r.artists.total,offset:r.artists.offset,nextPage:r.artists.next||void 0,prevPage:r.artists.previous||void 0}}}}async function m(e){let t=`https://api.spotify.com/v1/search?q=${encodeURIComponent(e.query)}&type=track`;e.page?.nextPage?t=e.page.nextPage:e.page?.prevPage&&(t=e.page.prevPage);const r=(await o.get(t)).data;return{items:p(r.tracks?.items||[]),pageInfo:r.artists&&{resultsPerPage:r.artists.limit,totalResults:r.artists.total,offset:r.artists.offset,nextPage:r.artists.next||void 0,prevPage:r.artists.previous||void 0}}}async function h(e){let t=`https://api.spotify.com/v1/search?q=${encodeURIComponent(e.query)}&type=album`;e.page?.nextPage?t=e.page.nextPage:e.page?.prevPage&&(t=e.page.prevPage);const r=(await o.get(t)).data;return{items:f(r.albums?.items||[]),pageInfo:r.albums&&{resultsPerPage:r.albums.limit,totalResults:r.albums.total,offset:r.albums.offset,nextPage:r.albums.next||void 0,prevPage:r.albums.previous||void 0}}}async function g(e){let t=`https://api.spotify.com/v1/search?q=${encodeURIComponent(e.query)}&type=track`;e.page?.nextPage?t=e.page.nextPage:e.page?.prevPage&&(t=e.page.prevPage);const r=(await o.get(t)).data;return{items:l(r.artists?.items||[]),pageInfo:r.artists&&{resultsPerPage:r.artists.limit,totalResults:r.artists.total,offset:r.artists.offset,nextPage:r.artists.next||void 0,prevPage:r.artists.previous||void 0}}}async function v(e){const t=`https://api.spotify.com/v1/albums/${e.apiId.split(":").pop()}/tracks?limit=50`,r=p((await o.get(t)).data.items);return r.forEach((t=>{t.albumApiId=e.apiId})),r}async function y(e){const t=`https://api.spotify.com/v1/artists/${e.apiId.split(":").pop()}/albums`;return f((await o.get(t)).data.items)}async function b(e){let t=`https://api.spotify.com/v1/playlists/${e.playlist.apiId}/tracks`;e.page?.nextPage?t=e.page.nextPage:e.page?.prevPage&&(t=e.page.prevPage);const r=await o.get(t);return{items:r.data.items.map((e=>({albumId:e.track?.album&&e.track.album.uri,apiId:e.track?.uri,artistId:e.track?.artists[0].uri,artistName:e.track?.artists[0].name,duration:(e.track?.duration_ms||0)/1e3,images:e.track?.album.images.map((e=>({url:e.url,height:e.height||0,width:e.width||0})))||[],name:e.track?.name||""}))),pageInfo:{resultsPerPage:r.data.limit,offset:r.data.offset,totalResults:r.data.total,nextPage:r.data.next||void 0,prevPage:r.data.previous||void 0}}}async function w(e){const t=await o.get("https://api.spotify.com/v1/me/playlists");return{items:t.data.items.map((e=>({name:e.name,images:e.images.map((e=>({width:e.width||0,height:e.height||0,url:e.url}))),apiId:e.id}))),pageInfo:{resultsPerPage:t.data.limit,offset:t.data.offset,totalResults:t.data.total,nextPage:t.data.next||void 0,prevPage:t.data.previous||void 0}}}async function x(){return{tracks:{items:p((await o.get("https://api.spotify.com/v1/me/top/tracks")).data.items)}}}const k=new class{name="spotify";constructor(){this.deviceId="",this.init()}init(){window.onSpotifyWebPlaybackSDKReady=this.initializePlayer.bind(this)}initializePlayer=()=>{const e=new window.Spotify.Player({getOAuthToken:async e=>{const t=await u();t&&e(t)},name:"Web Playback SDK Quick Start Player"});e.addListener("initialization_error",(e=>{console.error(e)})),e.addListener("authentication_error",(e=>{console.error(e)})),e.addListener("account_error",(e=>{console.error(e)})),e.addListener("playback_error",(e=>{console.error(e)})),e.addListener("player_state_changed",(async t=>{t?this.interval=setInterval((async()=>{let t=await e.getCurrentState();await application.setTrackTime(t.position/1e3),t.paused&&0===t.position&&(this.interval&&clearInterval(this.interval),await application.endTrack())}),1e3):this.interval&&clearInterval(this.interval)})),e.addListener("ready",(({device_id:e})=>{console.log("Ready with Device ID",e),this.deviceId=e})),e.addListener("not_ready",(({device_id:e})=>{console.log("Device ID has gone offline",e)})),e.connect()};loadScript(){const e=document.createElement("script");e.id="spotify-player",e.type="text/javascript",e.async=!1,e.defer=!0,e.src="https://sdk.scdn.co/spotify-player.js",document.head.appendChild(e)}async play(e){if(!this.deviceId)return;const t=`https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`,r=e.apiId||"";await o.put(t,{uris:[r]},{headers:{"Content-Type":"application/json"}})}async pause(){this.deviceId&&await o.put("https://api.spotify.com/v1/me/player/pause",{headers:{"Content-Type":"application/json"}})}async resume(){this.deviceId&&await o.put(`https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`,{headers:{"Content-Type":"application/json"}})}async seek(e){this.deviceId&&await o.put("https://api.spotify.com/v1/me/player/seek?position_ms="+1e3*e,{headers:{"Content-Type":"application/json"}})}async setVolume(e){await o.put("https://api.spotify.com/v1/me/player/volume?volume_percent="+100*e,{headers:{"Content-Type":"application/json"}})}},P=()=>{k.loadScript(),application.onSearchAll=d,application.onGetAlbumTracks=v,application.onGetArtistAlbums=y,application.onGetPlaylistTracks=b,application.onSearchTracks=m,application.onSearchArtists=g,application.onSearchAlbums=h,application.onGetUserPlaylists=w,application.onGetTopItems=x,application.onPlay=k.play.bind(k),application.onPause=k.pause.bind(k),application.onResume=k.resume.bind(k),application.onSeek=k.seek.bind(k),application.onSetVolume=k.setVolume.bind(k)};application.onDeepLinkMessage=async e=>{application.postUiMessage({type:"deeplink",url:e})};application.onUiMessage=async e=>{switch(e.type){case"logout":localStorage.removeItem("access_token"),localStorage.removeItem("refresh_token");break;case"set-keys":localStorage.setItem("clientId",e.clientId);break;case"check-login":const t=localStorage.getItem("access_token"),r=localStorage.getItem("refresh_token");t&&r&&s({type:"login"});const n=document.location.host.split(".");n.shift();const a=await application.getPluginId(),i=n.join("."),o=`${document.location.protocol}//${i}`,u=localStorage.getItem("clientId")??"";s({type:"info",origin:o,pluginId:a,clientId:u});break;case"login":c(e.accessToken,e.refreshToken),P()}},(()=>{const e=localStorage.getItem("access_token"),t=localStorage.getItem("refresh_token");e&&t&&P()})()})();