(()=>{function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},n={},i=t.parcelRequiree1e0;null==i&&((i=function(e){if(e in r)return r[e].exports;if(e in n){var t=n[e];delete n[e];var i={id:e,exports:{}};return r[e]=i,t.call(i.exports,i,i.exports),i.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){n[e]=t},t.parcelRequiree1e0=i),i.register("4pmpg",(function(e,t){"use strict";var r=i("gBiMb"),n=i("aHqGi"),a=i("bGXgz"),o=i("eW3qV");function s(e){var t=new a(e),i=n(a.prototype.request,t);return r.extend(i,a.prototype,t),r.extend(i,t),i}var c=s(i("1qNYy"));c.Axios=a,c.create=function(e){return s(o(c.defaults,e))},c.Cancel=i("1N35X"),c.CancelToken=i("cdbqI"),c.isCancel=i("cbWLS"),c.all=function(e){return Promise.all(e)},c.spread=i("i4UJt"),c.isAxiosError=i("9yMNx"),e.exports=c,e.exports.default=c})),i.register("gBiMb",(function(e,t){"use strict";var r=i("aHqGi"),n=Object.prototype.toString;function a(e){return"[object Array]"===n.call(e)}function o(e){return void 0===e}function s(e){return null!==e&&"object"==typeof e}function c(e){if("[object Object]"!==n.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function u(e){return"[object Function]"===n.call(e)}function p(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),a(e))for(var r=0,n=e.length;r<n;r++)t.call(null,e[r],r,e);else for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.call(null,e[i],i,e)}e.exports={isArray:a,isArrayBuffer:function(e){return"[object ArrayBuffer]"===n.call(e)},isBuffer:function(e){return null!==e&&!o(e)&&null!==e.constructor&&!o(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:s,isPlainObject:c,isUndefined:o,isDate:function(e){return"[object Date]"===n.call(e)},isFile:function(e){return"[object File]"===n.call(e)},isBlob:function(e){return"[object Blob]"===n.call(e)},isFunction:u,isStream:function(e){return s(e)&&u(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)},forEach:p,merge:function e(){var t={};function r(r,n){c(t[n])&&c(r)?t[n]=e(t[n],r):c(r)?t[n]=e({},r):a(r)?t[n]=r.slice():t[n]=r}for(var n=0,i=arguments.length;n<i;n++)p(arguments[n],r);return t},extend:function(e,t,n){return p(t,(function(t,i){e[i]=n&&"function"==typeof t?r(t,n):t})),e},trim:function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}}})),i.register("aHqGi",(function(e,t){"use strict";e.exports=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}}})),i.register("bGXgz",(function(e,t){"use strict";var r=i("gBiMb"),n=i("74Y2B"),a=i("4OKYc"),o=i("eXgnr"),s=i("eW3qV"),c=i("8l8wy"),u=c.validators;function p(e){this.defaults=e,this.interceptors={request:new a,response:new a}}p.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=s(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=e.transitional;void 0!==t&&c.assertOptions(t,{silentJSONParsing:u.transitional(u.boolean,"1.0.0"),forcedJSONParsing:u.transitional(u.boolean,"1.0.0"),clarifyTimeoutError:u.transitional(u.boolean,"1.0.0")},!1);var r=[],n=!0;this.interceptors.request.forEach((function(t){"function"==typeof t.runWhen&&!1===t.runWhen(e)||(n=n&&t.synchronous,r.unshift(t.fulfilled,t.rejected))}));var i,a=[];if(this.interceptors.response.forEach((function(e){a.push(e.fulfilled,e.rejected)})),!n){var p=[o,void 0];for(Array.prototype.unshift.apply(p,r),p=p.concat(a),i=Promise.resolve(e);p.length;)i=i.then(p.shift(),p.shift());return i}for(var l=e;r.length;){var f=r.shift(),d=r.shift();try{l=f(l)}catch(e){d(e);break}}try{i=o(l)}catch(e){return Promise.reject(e)}for(;a.length;)i=i.then(a.shift(),a.shift());return i},p.prototype.getUri=function(e){return e=s(this.defaults,e),n(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},r.forEach(["delete","get","head","options"],(function(e){p.prototype[e]=function(t,r){return this.request(s(r||{},{method:e,url:t,data:(r||{}).data}))}})),r.forEach(["post","put","patch"],(function(e){p.prototype[e]=function(t,r,n){return this.request(s(n||{},{method:e,url:t,data:r}))}})),e.exports=p})),i.register("74Y2B",(function(e,t){"use strict";var r=i("gBiMb");function n(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,i){if(!t)return e;var a;if(i)a=i(t);else if(r.isURLSearchParams(t))a=t.toString();else{var o=[];r.forEach(t,(function(e,t){null!=e&&(r.isArray(e)?t+="[]":e=[e],r.forEach(e,(function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),o.push(n(t)+"="+n(e))})))})),a=o.join("&")}if(a){var s=e.indexOf("#");-1!==s&&(e=e.slice(0,s)),e+=(-1===e.indexOf("?")?"?":"&")+a}return e}})),i.register("4OKYc",(function(e,t){"use strict";var r=i("gBiMb");function n(){this.handlers=[]}n.prototype.use=function(e,t,r){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!r&&r.synchronous,runWhen:r?r.runWhen:null}),this.handlers.length-1},n.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},n.prototype.forEach=function(e){r.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=n})),i.register("eXgnr",(function(e,t){"use strict";var r=i("gBiMb"),n=i("7vPtK"),a=i("cbWLS"),o=i("1qNYy");function s(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return s(e),e.headers=e.headers||{},e.data=n.call(e,e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),r.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||o.adapter)(e).then((function(t){return s(e),t.data=n.call(e,t.data,t.headers,e.transformResponse),t}),(function(t){return a(t)||(s(e),t&&t.response&&(t.response.data=n.call(e,t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}})),i.register("7vPtK",(function(e,t){"use strict";var r=i("gBiMb"),n=i("1qNYy");e.exports=function(e,t,i){var a=this||n;return r.forEach(i,(function(r){e=r.call(a,e,t)})),e}})),i.register("1qNYy",(function(e,t){var r=i("ieOnZ"),n=i("gBiMb"),a=i("6FM61"),o=i("jmtzu"),s={"Content-Type":"application/x-www-form-urlencoded"};function c(e,t){!n.isUndefined(e)&&n.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var u,p={transitional:{silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},adapter:(("undefined"!=typeof XMLHttpRequest||void 0!==r&&"[object process]"===Object.prototype.toString.call(r))&&(u=i("eQidV")),u),transformRequest:[function(e,t){return a(t,"Accept"),a(t,"Content-Type"),n.isFormData(e)||n.isArrayBuffer(e)||n.isBuffer(e)||n.isStream(e)||n.isFile(e)||n.isBlob(e)?e:n.isArrayBufferView(e)?e.buffer:n.isURLSearchParams(e)?(c(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):n.isObject(e)||t&&"application/json"===t["Content-Type"]?(c(t,"application/json"),function(e,t,r){if(n.isString(e))try{return(t||JSON.parse)(e),n.trim(e)}catch(e){if("SyntaxError"!==e.name)throw e}return(r||JSON.stringify)(e)}(e)):e}],transformResponse:[function(e){var t=this.transitional,r=t&&t.silentJSONParsing,i=t&&t.forcedJSONParsing,a=!r&&"json"===this.responseType;if(a||i&&n.isString(e)&&e.length)try{return JSON.parse(e)}catch(e){if(a){if("SyntaxError"===e.name)throw o(e,this,"E_JSON_PARSE");throw e}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300}};p.headers={common:{Accept:"application/json, text/plain, */*"}},n.forEach(["delete","get","head"],(function(e){p.headers[e]={}})),n.forEach(["post","put","patch"],(function(e){p.headers[e]=n.merge(s)})),e.exports=p})),i.register("ieOnZ",(function(e,t){var r,n,i=e.exports={};function a(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function s(e){if(r===setTimeout)return setTimeout(e,0);if((r===a||!r)&&setTimeout)return r=setTimeout,setTimeout(e,0);try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:a}catch(e){r=a}try{n="function"==typeof clearTimeout?clearTimeout:o}catch(e){n=o}}();var c,u=[],p=!1,l=-1;function f(){p&&c&&(p=!1,c.length?u=c.concat(u):l=-1,u.length&&d())}function d(){if(!p){var e=s(f);p=!0;for(var t=u.length;t;){for(c=u,u=[];++l<t;)c&&c[l].run();l=-1,t=u.length}c=null,p=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===o||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function m(e,t){this.fun=e,this.array=t}function h(){}i.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];u.push(new m(e,t)),1!==u.length||p||s(d)},m.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=h,i.addListener=h,i.once=h,i.off=h,i.removeListener=h,i.removeAllListeners=h,i.emit=h,i.prependListener=h,i.prependOnceListener=h,i.listeners=function(e){return[]},i.binding=function(e){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}})),i.register("6FM61",(function(e,t){"use strict";var r=i("gBiMb");e.exports=function(e,t){r.forEach(e,(function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])}))}})),i.register("jmtzu",(function(e,t){"use strict";e.exports=function(e,t,r,n,i){return e.config=t,r&&(e.code=r),e.request=n,e.response=i,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}})),i.register("eQidV",(function(e,t){"use strict";var r=i("gBiMb"),n=i("lBJvL"),a=i("biJ6e"),o=i("74Y2B"),s=i("dSFv7"),c=i("kIv68"),u=i("bS2Id"),p=i("bRI0M");e.exports=function(e){return new Promise((function(t,i){var l=e.data,f=e.headers,d=e.responseType;r.isFormData(l)&&delete f["Content-Type"];var m=new XMLHttpRequest;if(e.auth){var h=e.auth.username||"",g=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";f.Authorization="Basic "+btoa(h+":"+g)}var v=s(e.baseURL,e.url);function y(){if(m){var r="getAllResponseHeaders"in m?c(m.getAllResponseHeaders()):null,a={data:d&&"text"!==d&&"json"!==d?m.response:m.responseText,status:m.status,statusText:m.statusText,headers:r,config:e,request:m};n(t,i,a),m=null}}if(m.open(e.method.toUpperCase(),o(v,e.params,e.paramsSerializer),!0),m.timeout=e.timeout,"onloadend"in m?m.onloadend=y:m.onreadystatechange=function(){m&&4===m.readyState&&(0!==m.status||m.responseURL&&0===m.responseURL.indexOf("file:"))&&setTimeout(y)},m.onabort=function(){m&&(i(p("Request aborted",e,"ECONNABORTED",m)),m=null)},m.onerror=function(){i(p("Network Error",e,null,m)),m=null},m.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),i(p(t,e,e.transitional&&e.transitional.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED",m)),m=null},r.isStandardBrowserEnv()){var b=(e.withCredentials||u(v))&&e.xsrfCookieName?a.read(e.xsrfCookieName):void 0;b&&(f[e.xsrfHeaderName]=b)}"setRequestHeader"in m&&r.forEach(f,(function(e,t){void 0===l&&"content-type"===t.toLowerCase()?delete f[t]:m.setRequestHeader(t,e)})),r.isUndefined(e.withCredentials)||(m.withCredentials=!!e.withCredentials),d&&"json"!==d&&(m.responseType=e.responseType),"function"==typeof e.onDownloadProgress&&m.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&m.upload&&m.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){m&&(m.abort(),i(e),m=null)})),l||(l=null),m.send(l)}))}})),i.register("lBJvL",(function(e,t){"use strict";var r=i("bRI0M");e.exports=function(e,t,n){var i=n.config.validateStatus;n.status&&i&&!i(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}})),i.register("bRI0M",(function(e,t){"use strict";var r=i("jmtzu");e.exports=function(e,t,n,i,a){var o=new Error(e);return r(o,t,n,i,a)}})),i.register("biJ6e",(function(e,t){"use strict";var r=i("gBiMb");e.exports=r.isStandardBrowserEnv()?{write:function(e,t,n,i,a,o){var s=[];s.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),r.isString(i)&&s.push("path="+i),r.isString(a)&&s.push("domain="+a),!0===o&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}})),i.register("dSFv7",(function(e,t){"use strict";var r=i("40pC5"),n=i("6GfjI");e.exports=function(e,t){return e&&!r(t)?n(e,t):t}})),i.register("40pC5",(function(e,t){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}})),i.register("6GfjI",(function(e,t){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}})),i.register("kIv68",(function(e,t){"use strict";var r=i("gBiMb"),n=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,i,a,o={};return e?(r.forEach(e.split("\n"),(function(e){if(a=e.indexOf(":"),t=r.trim(e.substr(0,a)).toLowerCase(),i=r.trim(e.substr(a+1)),t){if(o[t]&&n.indexOf(t)>=0)return;o[t]="set-cookie"===t?(o[t]?o[t]:[]).concat([i]):o[t]?o[t]+", "+i:i}})),o):o}})),i.register("bS2Id",(function(e,t){"use strict";var r=i("gBiMb");e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function i(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=i(window.location.href),function(t){var n=r.isString(t)?i(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}})),i.register("cbWLS",(function(e,t){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}})),i.register("eW3qV",(function(e,t){"use strict";var r=i("gBiMb");e.exports=function(e,t){t=t||{};var n={},i=["url","method","data"],a=["headers","auth","proxy","params"],o=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],s=["validateStatus"];function c(e,t){return r.isPlainObject(e)&&r.isPlainObject(t)?r.merge(e,t):r.isPlainObject(t)?r.merge({},t):r.isArray(t)?t.slice():t}function u(i){r.isUndefined(t[i])?r.isUndefined(e[i])||(n[i]=c(void 0,e[i])):n[i]=c(e[i],t[i])}r.forEach(i,(function(e){r.isUndefined(t[e])||(n[e]=c(void 0,t[e]))})),r.forEach(a,u),r.forEach(o,(function(i){r.isUndefined(t[i])?r.isUndefined(e[i])||(n[i]=c(void 0,e[i])):n[i]=c(void 0,t[i])})),r.forEach(s,(function(r){r in t?n[r]=c(e[r],t[r]):r in e&&(n[r]=c(void 0,e[r]))}));var p=i.concat(a).concat(o).concat(s),l=Object.keys(e).concat(Object.keys(t)).filter((function(e){return-1===p.indexOf(e)}));return r.forEach(l,u),n}})),i.register("8l8wy",(function(e,t){"use strict";var r=i("kGKMV"),n={};["object","boolean","number","function","string","symbol"].forEach((function(e,t){n[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}}));var a={},o=r.version.split(".");function s(e,t){for(var r=t?t.split("."):o,n=e.split("."),i=0;i<3;i++){if(r[i]>n[i])return!0;if(r[i]<n[i])return!1}return!1}n.transitional=function(e,t,n){var i=t&&s(t);function o(e,t){return"[Axios v"+r.version+"] Transitional option '"+e+"'"+t+(n?". "+n:"")}return function(r,n,s){if(!1===e)throw new Error(o(n," has been removed in "+t));return i&&!a[n]&&(a[n]=!0,console.warn(o(n," has been deprecated since v"+t+" and will be removed in the near future"))),!e||e(r,n,s)}},e.exports={isOlderVersion:s,assertOptions:function(e,t,r){if("object"!=typeof e)throw new TypeError("options must be an object");for(var n=Object.keys(e),i=n.length;i-- >0;){var a=n[i],o=t[a];if(o){var s=e[a],c=void 0===s||o(s,a,e);if(!0!==c)throw new TypeError("option "+a+" must be "+c)}else if(!0!==r)throw Error("Unknown option "+a)}},validators:n}})),i.register("kGKMV",(function(e,t){e.exports=JSON.parse('{"name":"axios","version":"0.21.4","description":"Promise based HTTP client for the browser and node.js","main":"index.js","scripts":{"test":"grunt test","start":"node ./sandbox/server.js","build":"NODE_ENV=production grunt build","preversion":"npm test","version":"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json","postversion":"git push && git push --tags","examples":"node ./examples/server.js","coveralls":"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js","fix":"eslint --fix lib/**/*.js"},"repository":{"type":"git","url":"https://github.com/axios/axios.git"},"keywords":["xhr","http","ajax","promise","node"],"author":"Matt Zabriskie","license":"MIT","bugs":{"url":"https://github.com/axios/axios/issues"},"homepage":"https://axios-http.com","devDependencies":{"coveralls":"^3.0.0","es6-promise":"^4.2.4","grunt":"^1.3.0","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^23.0.0","grunt-karma":"^4.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^4.0.2","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1","karma":"^6.3.2","karma-chrome-launcher":"^3.1.0","karma-firefox-launcher":"^2.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^4.3.6","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.8","karma-webpack":"^4.0.2","load-grunt-tasks":"^3.5.2","minimist":"^1.2.0","mocha":"^8.2.1","sinon":"^4.5.0","terser-webpack-plugin":"^4.2.3","typescript":"^4.0.5","url-search-params":"^0.10.0","webpack":"^4.44.2","webpack-dev-server":"^3.11.0"},"browser":{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},"jsdelivr":"dist/axios.min.js","unpkg":"dist/axios.min.js","typings":"./index.d.ts","dependencies":{"follow-redirects":"^1.14.0"},"bundlesize":[{"path":"./dist/axios.min.js","threshold":"5kB"}]}')})),i.register("1N35X",(function(e,t){"use strict";function r(e){this.message=e}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,e.exports=r})),i.register("cdbqI",(function(e,t){"use strict";var r=i("1N35X");function n(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var n=this;e((function(e){n.reason||(n.reason=new r(e),t(n.reason))}))}n.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},n.source=function(){var e;return{token:new n((function(t){e=t})),cancel:e}},e.exports=n})),i.register("i4UJt",(function(e,t){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}})),i.register("9yMNx",(function(e,t){"use strict";e.exports=function(e){return"object"==typeof e&&!0===e.isAxiosError}}));var a;a=i("4pmpg");const o=e(a).create(),s=(e,t)=>{localStorage.setItem("access_token",e),localStorage.setItem("refresh_token",t)},c=async()=>{const t=localStorage.getItem("refresh_token");if(!t)return;const r=new URLSearchParams;r.append("grant_type","refresh_token"),r.append("refresh_token",t),r.append("client_id","b8f2fce4341b42e580e66a37302b358e");const n=await e(a).post("https://accounts.spotify.com/api/token",r,{headers:{"Content-Type":"application/x-www-form-urlencoded"}});return n.data.access_token&&n.data.refresh_token?(s(n.data.access_token,n.data.refresh_token),n.data.access_token):void 0};function u(e){return e.map((e=>({albumId:e.album&&e.album.uri,apiId:e.uri,artistId:e.artists[0].uri,artistName:e.artists[0].name,duration:e.duration_ms/1e3,images:e.album.images,name:e.name})))}function p(e){return e.map((e=>({apiId:e.uri,name:e.name,images:[]})))}function l(e){return e.map((e=>({apiId:e.uri,artistId:e.artists[0].uri,artistName:e.artists[0].name,name:e.name,images:[]})))}o.interceptors.request.use((e=>{const t=localStorage.getItem("access_token");return t&&(e.headers.Authorization="Bearer "+t),e}),(e=>{Promise.reject(e)})),o.interceptors.response.use((e=>e),(async t=>{const r=t.config;if(401===t.response.status&&!r._retry){r._retry=!0;const t=await c();return e(a).defaults.headers.common.Authorization="Bearer "+t,o(r)}}));async function f(e){const t=`https://api.spotify.com/v1/search?q=${encodeURIComponent(e.query)}&type=album,artist,track`,r=(await o.get(t)).data,n=u(r.tracks?.items||[]),i=l(r.albums?.items||[]),a=p(r.artists?.items||[]);return{tracks:{items:n,pageInfo:r.tracks&&{resultsPerPage:r.tracks.limit,totalResults:r.tracks.total,offset:r.tracks.offset,nextPage:r.tracks.next||void 0,prevPage:r.tracks.previous||void 0}},albums:{items:i,pageInfo:r.albums&&{resultsPerPage:r.albums.limit,totalResults:r.albums.total,offset:r.albums.offset,nextPage:r.albums.next||void 0,prevPage:r.albums.previous||void 0}},artists:{items:a,pageInfo:r.artists&&{resultsPerPage:r.artists.limit,totalResults:r.artists.total,offset:r.artists.offset,nextPage:r.artists.next||void 0,prevPage:r.artists.previous||void 0}}}}async function d(e){let t=`https://api.spotify.com/v1/search?q=${encodeURIComponent(e.query)}&type=track`;e.page?.nextPage?t=e.page.nextPage:e.page?.prevPage&&(t=e.page.prevPage);const r=(await o.get(t)).data;return{items:u(r.tracks?.items||[]),pageInfo:r.artists&&{resultsPerPage:r.artists.limit,totalResults:r.artists.total,offset:r.artists.offset,nextPage:r.artists.next||void 0,prevPage:r.artists.previous||void 0}}}async function m(e){let t=`https://api.spotify.com/v1/search?q=${encodeURIComponent(e.query)}&type=album`;e.page?.nextPage?t=e.page.nextPage:e.page?.prevPage&&(t=e.page.prevPage);const r=(await o.get(t)).data;return{items:l(r.albums?.items||[]),pageInfo:r.albums&&{resultsPerPage:r.albums.limit,totalResults:r.albums.total,offset:r.albums.offset,nextPage:r.albums.next||void 0,prevPage:r.albums.previous||void 0}}}async function h(e){let t=`https://api.spotify.com/v1/search?q=${encodeURIComponent(e.query)}&type=track`;e.page?.nextPage?t=e.page.nextPage:e.page?.prevPage&&(t=e.page.prevPage);const r=(await o.get(t)).data;return{items:p(r.artists?.items||[]),pageInfo:r.artists&&{resultsPerPage:r.artists.limit,totalResults:r.artists.total,offset:r.artists.offset,nextPage:r.artists.next||void 0,prevPage:r.artists.previous||void 0}}}async function g(e){const t=`https://api.spotify.com/v1/albums/${e.apiId.split(":").pop()}/tracks?limit=50`,r=u((await o.get(t)).data.items);return r.forEach((t=>{t.albumApiId=e.apiId})),r}async function v(e){const t=`https://api.spotify.com/v1/artists/${e.apiId.split(":").pop()}/albums`;return l((await o.get(t)).data.items)}async function y(e){let t=`https://api.spotify.com/v1/playlists/${e.playlist.apiId}/tracks`;e.page?.nextPage?t=e.page.nextPage:e.page?.prevPage&&(t=e.page.prevPage);const r=await o.get(t);return{items:r.data.items.map((e=>({albumId:e.track?.album&&e.track.album.uri,apiId:e.track?.uri,artistId:e.track?.artists[0].uri,artistName:e.track?.artists[0].name,duration:(e.track?.duration_ms||0)/1e3,images:e.track?.album.images.map((e=>({url:e.url,height:e.height||0,width:e.width||0})))||[],name:e.track?.name||""}))),pageInfo:{resultsPerPage:r.data.limit,offset:r.data.offset,totalResults:r.data.total,nextPage:r.data.next||void 0,prevPage:r.data.previous||void 0}}}async function b(e){const t=await o.get("https://api.spotify.com/v1/me/playlists");return{items:t.data.items.map((e=>({name:e.name,images:e.images.map((e=>({width:e.width||0,height:e.height||0,url:e.url}))),apiId:e.id}))),pageInfo:{resultsPerPage:t.data.limit,offset:t.data.offset,totalResults:t.data.total,nextPage:t.data.next||void 0,prevPage:t.data.previous||void 0}}}async function w(){return{tracks:{items:u((await o.get("https://api.spotify.com/v1/me/top/tracks")).data.items)}}}const x=new class{name="spotify";constructor(){this.deviceId="",this.accessToken="",this.internalTime=0,this.init()}init(){window.onSpotifyWebPlaybackSDKReady=this.initializePlayer.bind(this)}setAccessToken(e){this.accessToken=e}initializePlayer=()=>{const e=new window.Spotify.Player({getOAuthToken:async e=>{const t=await c();t&&e(t)},name:"Web Playback SDK Quick Start Player"});e.addListener("initialization_error",(e=>{console.error(e)})),e.addListener("authentication_error",(e=>{console.error(e)})),e.addListener("account_error",(e=>{console.error(e)})),e.addListener("playback_error",(e=>{console.error(e)})),e.addListener("player_state_changed",(async e=>{await application.setTrackTime(e.position/1e3),this.internalTime=e.position,e.paused&&0===e.position&&e.restrictions.disallow_resuming_reasons&&"not_paused"===e.restrictions.disallow_resuming_reasons[0]&&(this.interval&&clearInterval(this.interval),await application.endTrack())})),e.addListener("ready",(({device_id:e})=>{console.log("Ready with Device ID",e),this.deviceId=e})),e.addListener("not_ready",(({device_id:e})=>{console.log("Device ID has gone offline",e)})),e.connect()};loadScript(){const e=document.createElement("script");e.id="spotify-player",e.type="text/javascript",e.async=!1,e.defer=!0,e.src="https://sdk.scdn.co/spotify-player.js",document.head.appendChild(e)}async play(e){if(!this.deviceId)return;const t=`https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`,r=e.apiId||"";await o.put(t,{uris:[r]},{headers:{"Content-Type":"application/json"}}),this.interval=window.setInterval(this.updateTime,1e3)}async pause(){this.deviceId&&(await o.put("https://api.spotify.com/v1/me/player/pause",{headers:{"Content-Type":"application/json"}}),this.interval&&clearInterval(this.interval))}async resume(){this.deviceId&&(await o.put(`https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`,{headers:{"Content-Type":"application/json"}}),this.interval=window.setInterval(this.updateTime,1e3))}async seek(e){this.deviceId&&await o.put("https://api.spotify.com/v1/me/player/seek?position_ms="+1e3*e,{headers:{"Content-Type":"application/json"}})}async setVolume(e){await o.put("https://api.spotify.com/v1/me/player/volume?volume_percent="+100*e,{headers:{"Content-Type":"application/json"}})}updateTime=()=>{this.internalTime+=1e3,application.setTrackTime(this.internalTime/1e3)}},k=()=>{x.loadScript(),application.onSearchAll=f,application.onGetAlbumTracks=g,application.onGetArtistAlbums=v,application.onGetPlaylistTracks=y,application.onSearchTracks=d,application.onSearchArtists=h,application.onSearchAlbums=m,application.onGetUserPlaylists=b,application.onGetTopItems=w,application.onPlay=x.play.bind(x),application.onPause=x.pause.bind(x),application.onResume=x.resume.bind(x),application.onSeek=x.seek.bind(x),application.onSetVolume=x.setVolume.bind(x)};application.onDeepLinkMessage=async e=>{application.postUiMessage({type:"deeplink",url:e})},application.onUiMessage=e=>{if("init"===e){const e=document.location.host.split(".");e.shift();const t=e.join("."),r=`${document.location.protocol}//${t}`;application.postUiMessage({type:"origin",value:r})}else e.access_token&&(console.log(e),s(e.access_token,e.refresh_token),x.setAccessToken(e.access_token),k())},(()=>{const e=localStorage.getItem("access_token"),t=localStorage.getItem("refresh_token");e&&t&&(application.postUiMessage({type:"login"}),x.setAccessToken(e),k())})()})();