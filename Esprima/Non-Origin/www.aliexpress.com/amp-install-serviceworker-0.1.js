(self.AMP=self.AMP||[]).push({n:"amp-install-serviceworker",v:"1903281741200",f:(function(AMP,_){
var h="function"==typeof Object.create?Object.create:function(a){function b(){}b.prototype=a;return new b},k;if("function"==typeof Object.setPrototypeOf)k=Object.setPrototypeOf;else{var m;a:{var n={a:!0},p={};try{p.__proto__=n;m=p.a;break a}catch(a){}m=!1}k=m?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var q=k;function r(a,b){b=void 0===b?"":b;try{return decodeURIComponent(a)}catch(c){return b}};var u=/(?:^[#?]?|&)([^=&]+)(?:=([^&]*))?/g;function v(a){var b=Object.create(null);if(!a)return b;for(var c;c=u.exec(a);){var d=r(c[1],c[1]),e=c[2]?r(c[2],c[2]):"";b[d]=e}return b};var w="";
function x(){var a,b=a||self;if(b.AMP_MODE)var c=b.AMP_MODE;else{c=b;var d=self.AMP_CONFIG||{},e=!!d.test||!1,g=v(c.location.originalHash||c.location.hash);d=d.spt;var f=v(c.location.search);w||(w=c.AMP_CONFIG&&c.AMP_CONFIG.v?c.AMP_CONFIG.v:"011903281741200");c=b.AMP_MODE={localDev:!1,development:!("1"!=g.development&&!c.AMP_DEV_MODE),examiner:"2"==g.development,filter:g.filter,geoOverride:g["amp-geo"],minified:!0,lite:void 0!=f.amp_lite,test:e,log:g.log,version:"1903281741200",rtvVersion:w,
singlePassType:d}}return c};self.log=self.log||{user:null,dev:null,userForEmbed:null};var y=self.log;function z(){if(!y.user)throw Error("failed to call initLogConstructor");return y.user}function A(a,b,c,d,e){z().assert(a,b,c,d,e,void 0,void 0,void 0,void 0,void 0,void 0)};function B(a){var b,c=a.ownerDocument.defaultView,d=c!=(c.__AMP_TOP||c);if(d){if(C(c,"url")){var e=D(c,"url");if(e)return e}if(!b)return null}a=E(a);a=F(a);return C(a,"url")?D(a,"url"):null}function G(a,b){a=a.__AMP_TOP||a;return D(a,b)}function H(a,b){var c=E(a);c=F(c);return D(c,b)}function E(a){return a.nodeType?G((a.ownerDocument||a).defaultView,"ampdoc").getAmpDoc(a):a}function F(a){a=E(a);return a.isSingleDoc()?a.win:a}
function D(a,b){C(a,b);var c=a.services;c||(c=a.services={});var d=c;a=d[b];a.obj||(a.obj=new a.ctor(a.context),a.ctor=null,a.context=null,a.resolve&&a.resolve(a.obj));return a.obj}function C(a,b){a=a.services&&a.services[b];return!(!a||!a.ctor&&!a.obj)};/*
 https://mths.be/cssescape v1.5.1 by @mathias | MIT license */
function I(a){return a||{}};function J(a,b){for(var c;a&&a!==c;a=a.parentElement)if(b(a))return a;return null}function K(a){return a.closest?a.closest("A"):J(a,function(a){var c=a.matches||a.webkitMatchesSelector||a.mozMatchesSelector||a.msMatchesSelector||a.oMatchesSelector;return c?c.call(a,"A"):!1})};var L;function N(a,b){var c=void 0,d=a,e=b;var g=function(a){try{return e(a)}catch(M){throw self.reportError(M),M;}};var f=O(),l=!1;c&&(l=c.capture);d.addEventListener("click",g,f?c:l)}function O(){if(void 0!==L)return L;L=!1;try{var a={get capture(){L=!0}};self.addEventListener("test-options",null,a);self.removeEventListener("test-options",null,a)}catch(b){}return L};var P=self.AMP_CONFIG||{},Q={thirdParty:P.thirdPartyUrl||"https://3p.ampproject.net",thirdPartyFrameHost:P.thirdPartyFrameHost||"ampproject.net",thirdPartyFrameRegex:("string"==typeof P.thirdPartyFrameRegex?new RegExp(P.thirdPartyFrameRegex):P.thirdPartyFrameRegex)||/^d-\d+\.ampproject\.net$/,cdn:P.cdnUrl||"https://cdn.ampproject.org",cdnProxyRegex:("string"==typeof P.cdnProxyRegex?new RegExp(P.cdnProxyRegex):P.cdnProxyRegex)||/^https:\/\/([a-zA-Z0-9_-]+\.)?cdn\.ampproject\.org$/,localhostRegex:/^https?:\/\/localhost(:\d+)?$/,
errorReporting:P.errorReportingUrl||"https://amp-error-reporting.appspot.com/r",localDev:P.localDev||!1};I({c:!0,v:!0,a:!0,ad:!0,action:!0});function R(a){var b=a.indexOf("#");return-1==b?a:a.substring(0,b)};function S(a){var b=!1;void 0===b&&(b=a.hasAttribute("hidden"));b?a.removeAttribute("hidden"):a.setAttribute("hidden","")};function T(a){a=AMP.BaseElement.call(this,a)||this;a.h=null;a.B=null;a.j=G(a.win,"platform").isSafari();return a}var U=AMP.BaseElement;T.prototype=h(U.prototype);T.prototype.constructor=T;if(q)q(T,U);else for(var V in U)if("prototype"!=V)if(Object.defineProperties){var W=Object.getOwnPropertyDescriptor(U,V);W&&Object.defineProperty(T,V,W)}else T[V]=U[V];T.C=U.prototype;
T.prototype.buildCallback=function(){var a=this,b=this.win;if("serviceWorker"in b.navigator){var c=B(this.element),d=this.element.getAttribute("src");c.assertHttpsUrl(d,this.element);if(!c.isProxyOrigin(d)&&!c.isProxyOrigin(b.location.href)||this.j)c.parse(b.location.href).origin==c.parse(d).origin?X(this).then(function(){return aa(a.win,d,a.element)}):this.user().error("amp-install-serviceworker","Did not install ServiceWorker because it does not match the current origin: "+d);else{var e=this.element.getAttribute("data-iframe-src");
if(e){c.assertHttpsUrl(e,this.element);var g=c.parse(e).origin,f=H(this.element,"documentInfo").get(),l=c.parse(f.sourceUrl),t=c.parse(f.canonicalUrl);A(g==l.origin||g==t.origin,"data-iframe-src (%s) should be a URL on the same origin as the source (%s) or canonical URL (%s) of the AMP-document.",g,l.origin,t.origin);this.h=e;X(this).then(function(){return ba(a)})}}(c.isProxyOrigin(d)||c.isProxyOrigin(b.location.href))&&this.j&&this.user().error("amp-install-serviceworker","Did not install ServiceWorker because of safari double keyring caching as it will not have any effect")}else ca(this)};
function X(a){return Promise.all([a.loadPromise(a.win),H(a.getAmpDoc(),"viewer").whenFirstVisible()])}function ba(a){return a.mutateElement(function(){S(a.element);var b=a.win.document.createElement("iframe");b.setAttribute("sandbox","allow-same-origin allow-scripts");b.src=a.h;a.element.appendChild(b)})}
function ca(a){if(a.getAmpDoc().isSingleDoc()){var b=a.getAmpDoc(),c=a.win,d=B(a.element),e=d.parse(c.location.href),g=a.element.getAttribute("data-no-service-worker-fallback-url-match"),f=a.element.getAttribute("data-no-service-worker-fallback-shell-url");if(g||f){A(g&&f,'Both, "%s" and "%s" must be specified for url-rewrite',"data-no-service-worker-fallback-url-match","data-no-service-worker-fallback-shell-url");f=R(f);try{var l=new RegExp(g)}catch(t){throw z().createError('Invalid "data-no-service-worker-fallback-url-match" expression',
t);}A(d.getSourceOrigin(e)==d.parse(f).origin,'Shell source origin "%s" must be the same as source origin "%s"',f,e.href);a.B=new Y(b,l,f,a.element);d.isSecure(f)&&da(a,f)}}}function da(a,b){X(a).then(function(){a.mutateElement(function(){return ea(a,b)})})}
function ea(a,b){var c=a.win.document.createElement("iframe");c.id="i-amphtml-shell-preload";c.setAttribute("src",b+"#preload");S(c);c.setAttribute("sandbox","allow-scripts allow-same-origin");var d=a.loadPromise(c);d.then(function(){c.parentElement&&c.parentElement.removeChild(c)});a.element.appendChild(c)}function Y(a,b,c,d){this.win=a.win;this.A=b;this.w=c;this.m=B(d);this.l=this.m.parse(c);a=a.getRootNode();b=this.o.bind(this);N(a,b)}
Y.prototype.o=function(a){if(!a.defaultPrevented&&(a=K(a.target))&&a.href){var b=this.m.parse(a.href);if(b.origin==this.l.origin&&b.pathname!=this.l.pathname&&this.A.test(b.href)&&!a.getAttribute("i-amphtml-orig-href")){var c=this.win;R(b.href)!=R(c.location.href)&&(a.setAttribute("i-amphtml-orig-href",a.href),a.href=this.w+"#href="+encodeURIComponent(""+b.pathname+b.search+b.hash))}}};
function aa(a,b,c){var d={};c.hasAttribute("data-scope")&&(d.scope=c.getAttribute("data-scope"));return a.navigator.serviceWorker.register(b,d).then(function(b){x().development&&z().info("amp-install-serviceworker","ServiceWorker registration successful with scope: ",b.scope);var d=b.installing;d?d.addEventListener("statechange",function(d){"activated"===d.target.state&&Z(b,a,c)}):b.active&&Z(b,a,c);return b},function(a){z().error("amp-install-serviceworker","ServiceWorker registration failed:",a)})}
function Z(a,b,c){fa(b,a);c.hasAttribute("data-prefetch")&&ga(a,b)}function fa(a,b){if("performance"in a){var c=a.performance.getEntriesByType("resource").filter(function(a){var b;if(b="script"===a.initiatorType){b=a.name;var c=Q.cdn;b=c.length>b.length?!1:0==b.lastIndexOf(c,0)}return b}).map(function(a){return a.name}),d=b.active;d.postMessage&&d.postMessage(JSON.stringify(I({type:"AMP__FIRST-VISIT-CACHING",payload:c})))}}
function ga(a,b){var c=b.document,d=[].map.call(c.querySelectorAll("a[data-rel=prefetch]"),function(a){return a.href});ha(c)?d.forEach(function(a){var b=c.createElement("link");b.setAttribute("rel","prefetch");b.setAttribute("href",a);c.head.appendChild(b)}):(a=a.active,a.postMessage&&a.postMessage(JSON.stringify(I({type:"AMP__LINK-PREFETCH",payload:d}))))}function ha(a){var b=a.createElement("link");return b.relList&&b.relList.supports?b.relList.supports("prefetch"):!1}
(function(a){a.registerElement("amp-install-serviceworker",T)})(self.AMP);
})});
//# sourceMappingURL=amp-install-serviceworker-0.1.js.map
