!function(){var n="BrowserSubscriptionHelper",c="chrome",a="error",d="info",i="pushNotifications",u="undefined",t="Unsupported Browser.",l="granted",p="denied",h="subscriptions",r="type",f="push",e="display-push-promos",o=".js-push-subscribe",s="rapidnofollow",m="subscriptionFail";function b(e,i,t){this.init(e,i,t)}b.prototype={init:function(e,i,t){var n=this;n.beaconer=i,n.tracker=t,n.config={bucket:e.bucket,confirmationNotification:e.confirmationNotification||{},overlay:e.overlay||{},serviceWorkerScope:e.serviceWorkerScope||"/",serviceWorkerUrl:e.serviceWorkerUrl,spaceId:e.spaceId,subscriptionService:e.subscriptionService||{},supportedBrowsers:e.supportedBrowsers||{},userAgent:e.userAgent||{}},n._setIsPrivateSession(),n._attachPermissionUpdateHandle(),this._updateAttributesForSubscribedUser()},checkIsPrivateSession:function(e){var i=this;typeof i.isPrivateSession===u?i._setIsPrivateSession(e):e&&e(null,i.isPrivateSession)},checkIsSupportedBrowser:function(){for(var e=this,i=e.config.userAgent,t=i.browserName,n=i.browserVersion,r=i.os||i.osName,o=e.config.supportedBrowsers[t]||{},s=!1,c=!1,a=o.os&&o.os.length,u=0;u<a;u++)if(-1<r.indexOf(o.os[u])){c=!0;break}return!e.isPrivateSession&&(!o.minVersion||n>=o.minVersion)&&(!o.maxVersion||n<=o.maxVersion)&&(!o.useServiceWorker||o.useServiceWorker&&"serviceWorker"in navigator)&&c&&(s=!0),s},checkSubscriptionChurn:function(a){var u=this;u.checkIsSupportedBrowser(i)?u.fetchPushPermission(function(e,t){e||!t||t&&"granted"!==t.state?a&&a(e,{isOnboardError:null,pushManagerChurn:null}):u.getSubscriptionLog(function(e,i){e?a&&a(e):t&&i?function(e,i){var t=u._parseGCMSubscriptionId(i)||null,n=e.deviceId||null,r=e.subscriptionState||null,o=i&&i.error===m,s=!n&&"granted"===e.state&&"started"===i.onboardState,c="subsPushMngrResync";if(o&&(c="subsOnepushResync"),o||s)return u._sendBeacon(d,{code:c,deviceId:n,idbDeviceId:t,onboardTime:i.onboardTime}),a&&a(null,{isOnboardError:!0,pushManagerChurn:null});t&&t!==n&&(!i.churnCheckTime||i.churnCheckTime<i.subscriptionTime)?u.logSubscriptionChurnCheck(function(e){e?a&&a(e):(u._sendBeacon(d,{code:"subChurn",idbDeviceId:t,deviceId:n,subscriptionState:r}),a&&a(null,{isOnboardError:!1,pushManagerChurn:!0}))}):a&&a(null,{isOnboardError:!1,pushManagerChurn:!1})}(t,i):a&&a(null,{isOnboardError:!1,pushManagerChurn:!1})})}):a&&a(new Error(t))},fetchPushPermission:function(e){if(e){this.checkIsSupportedBrowser()&&this.config.userAgent.browserName===c?this._fetchPushPermissionChrome(e):e(new Error(t,null))}},requestPushPermission:function(e,i){if(i){this.checkIsSupportedBrowser()&&(this.logOnboardingStart(),this.config.userAgent.browserName===c)?this._requestPushPermissionChrome(e,i):i(new Error(t,null))}},_fetchPushPermissionChrome:function(i){var t=this;(Notification&&Notification.permission)===l?navigator.serviceWorker.getRegistration(t.config.serviceWorkerScope).then(function(e){return e&&e.pushManager.getSubscription()}).then(t._buildPermissionObjectChrome.bind(t)).then(function(e){i(null,e)}).catch(function(e){t._sendBeacon(a,{code:"brwsrPermFetchError",message:e}),i(e)}):i(null,t._buildPermissionObjectChrome(null))},_requestPushPermissionChrome:function(e,i){var t=this,n=t.config.serviceWorkerUrl,r=t.config.serviceWorkerScope;Notification&&n&&r&&("default"===Notification.permission&&(t._trackLinkView({itc:"1",sec:e.sec,slk:"notification permission request",subsec:e.subsec}),t._sendBeacon(d,{code:"notificationPermissionRequest",message:e.sec})),Notification.requestPermission().then(function(){return t._doRegisterServiceWorker(n,r)}).then(t._doPushManagerSubscribe.bind(t)).then(t._buildPermissionObjectChrome.bind(t)).then(function(e){t._sendBeacon(d,{code:"brwsrPermReqSuccess",message:e.state}),i(null,e)}).catch(function(e){t._sendBeacon(a,{code:"brwsrPermReqError",message:e}),i(e,null)}))},_doRegisterServiceWorker:function(e,i){var t=this;return navigator.serviceWorker.register(e,{scope:i}).then(function(e){return t._sendBeacon(d,{code:"svcWkrRegSuccess"}),e},function(e){t._sendBeacon(a,{code:"svcWkrRegError",message:e})})},_doPushManagerSubscribe:function(n){var i=this;if(window.Promise&&n)return new Promise(function(i,e){if(Notification&&"granted"===Notification.permission){var t=n.installing||n.waiting;t?t.addEventListener("statechange",function(e){"activated"===e.target.state&&i()}):n.active?i():e("Service Worker not active")}else e("Permission not granted")}).then(function(){return n.pushManager.subscribe({userVisibleOnly:!0})}).then(function(e){if(!e||!e.endpoint)throw"Missing subscription endpoint";return i.logPushManagerSuccess(e.endpoint),i._sendBeacon(d,{code:"PushMngrSubSuccess",deviceId:e.endpoint}),e}).catch(function(e){i._sendBeacon(a,{code:"PushMngrSubFail",message:e}),i.logPushManagerFailure()})},_buildPermissionObjectChrome:function(e){var i;return i=typeof e===u?"No_SW_registration":null===e?"No_PushManager_Subscription":"Subscription_Present",{deviceId:e&&this._parseGCMSubscriptionId(e),state:Notification&&Notification.permission,subscriptionKeys:e&&btoa(JSON.stringify(e)),subscriptionState:i}},_parseGCMSubscriptionId:function(e){var i,t;return e&&e.endpoint&&(t=(i=e.endpoint.match(/^https\:\/\/android\.googleapis\.com\/gcm\/send\/(.*)$/))&&i.length&&i[1]),t},_sendBeacon:function(e,i){var t=this;t.beaconer&&e&&i&&("function"==typeof t.beaconer?t.beaconer(e,n,i):"function"==typeof t.beaconer[e]&&t.beaconer[e](n,i))},_trackClick:function(e,i){this.tracker&&e&&e.sec&&e.slk&&typeof e._p!==u&&this.tracker.beaconClick(e.sec,e.slk,e._p,e,e.outcome,i)},_trackLinkView:function(e){this.tracker&&e&&e.sec&&e.slk&&this.tracker.beaconLinkViews([{sec:e.sec,t1:e.t1,t2:e.t2,_links:[e]}])},_setIsPrivateSession:function(e){var i=this,t=i.config.userAgent.browserName||"";function n(){i.isPrivateSession=!0,e&&e(null,i.isPrivateSession)}function r(){i.isPrivateSession=!1,e&&e(null,i.isPrivateSession)}if(typeof i.isPrivateSession===u)try{if(t.toLowerCase()===c){var o=window.RequestFileSystem||window.webkitRequestFileSystem;o&&o(window.TEMPORARY,100,r,n)}else if("firefox"===t.toLowerCase()&&window.indexedDB){var s=window.indexedDB.open("test");s.onerror=n,s.onsuccess=r}}catch(e){r()}else e&&e(null,i.isPrivateSession)},_attachPermissionUpdateHandle:function(e){var n=this;n.checkIsSupportedBrowser(i)?navigator&&navigator.permissions&&navigator.permissions.query&&navigator.permissions.query({name:"notifications"}).then(function(t){t?(t.onchange=function(){n.getSubscriptionLog(function(e,i){i||(i={}),i.code="userPermissionUpdate",i.newState=t.state,n._sendBeacon(d,i)})},e&&e(null,!0)):e&&e(null,!1)}):e&&e(new Error(t),!1)},_updateAttributesForSubscribedUser:function(){if(!window.indexedDB)return!1;var o=this;o._readEntryInDB(function(e,r){if(e)return!1;var i=(r=r||{}).lastAttributeUpdateTime;if(Date.now()-i<=864e5)return!1;o.fetchPushPermission(function(e,i){if(e)return!1;var t=(i=i||{}).subscriptionKeys;if(i.state===l&&"completed"===r.onboardState&&t){var n=Object.assign({channel_id:t,device_id:i.deviceId},o.getEssentialAttributes());return o.callSubscriptionService({method:"POST",operation:"update",serviceResource:"subscriptions.setAttributes"},n),o._setEntryInDB({lastAttributeUpdateTime:Date.now()}),!0}return!1})})},logOnboardingStart:function(e,i){e=e||{},this._initDB(e,i)},logOnboardingCompleted:function(e,i){this._setEntryInDB({onboardState:"completed",origin:e,error:void 0},i)},logPushManagerSuccess:function(e,i){this._setEntryInDB({endpoint:e,subscriptionTime:(new Date).getTime()},i)},logPushManagerFailure:function(e){this._setEntryInDB({error:"pushManagerFail"},e)},logSubscriptionFailure:function(e){this._setEntryInDB({error:m},e)},logSubscriptionChurnCheck:function(e){this._setEntryInDB({churnCheckTime:(new Date).getTime()},e)},clearErrorLog:function(e){this._setEntryInDB({error:void 0},e)},getSubscriptionLog:function(e){this._readEntryInDB(e)},_openDB:function(t){var n=this,e=window.indexedDB.open("yahooNotifications",2);e.onupgradeneeded=function(e){e.target.result.createObjectStore(h,{keyPath:r}).transaction.onerror=function(e){var i=new Error("Failed upgrading: "+e.target.errorCode);n._sendBeacon(a,{code:"IDBUpgradeFail",message:i.message}),t&&t(i)}},e.onsuccess=function(e){var i=e.target.result;t&&t(null,i)},e.onerror=function(e){var i=new Error("Failed opening: "+e.target.errorCode);n._sendBeacon(a,{code:"IDBOpenFail",message:i.message}),t&&t(new Error(i))}},_initDB:function(r,o){var s=this,c=(new Date).getTime();s._openDB(function(e,t){if(e)return o&&o(e);var n=s._buildEntryObject(r),i=t.transaction(h,"readwrite").objectStore(h).put(n);i.onsuccess=function(e){var i=(new Date).getTime();o&&o(null,n),s._sendBeacon(d,{code:"initIndexedDBDuration",message:i-c}),t.close()},i.onerror=function(e){var i=new Error("Failed initilazing: "+e.target.errorCode);s._sendBeacon(a,{code:"IDBInitFail",message:i.message}),o&&o(i),t.close()}})},_readEntryInDB:function(r){var o=this,s=(new Date).getTime();o._openDB(function(e,t){if(e)return r&&r(e);var n=t.transaction(h).objectStore(h).get(f);n.onsuccess=function(e){var i=(new Date).getTime();r&&r(null,n.result),o._sendBeacon(d,{code:"readIndexedDBDuration",message:i-s}),t.close()},n.onerror=function(e){var i=new Error("Failed Reading: ",e.target.errorCode);o._sendBeacon(a,{code:"IDBReadFail",message:i.message}),r&&r(i),t.close()}})},_setEntryInDB:function(r,o){var s=this,c=(new Date).getTime();s._readEntryInDB(function(e,n){e||!n?s._initDB(s._buildEntryObject(r,n),o):s._openDB(function(i,t){if(i)return o&&o(i);var e=t.transaction(h,"readwrite").objectStore(h).put(s._buildEntryObject(r,n));e.onsuccess=function(e){var i=(new Date).getTime();o&&o(null,!0),s._sendBeacon(d,{code:"updateIndexedDBDuration",message:i-c}),t.close()},e.onerror=function(e){s._sendBeacon(a,{code:"IDBUpdateFail",message:i}),o&&o(new Error("Failed updating: ",e.target.errorCode)),t.close()}})})},_buildEntryObject:function(e,i){e=e||{},i=i||{};var t=(new Date).getTime(),n={bucket:e.bucket||i.bucket||this.config.bucket,churnCheckTime:e.churnCheckTime||i.churnCheckTime,endpoint:e.endpoint||i.endpoint,error:e.error||i.error,lastAttributeUpdateTime:e.lastAttributeUpdateTime||i.lastAttributeUpdateTime,onboardState:e.onboardState||i.onboardState||"started",onboardTime:i.onboardTime||t,origin:e.origin||i.origin,permissionState:Notification&&Notification.permission||"unsuported",spaceId:e.spaceId||i.spaceId||this.config.spaceId,subscriptionTime:e.subscriptionTime||i.subscriptionTime,updateTime:t};return e.hasOwnProperty("error")&&void 0===e.error&&(n.error=void 0,"started"===n.onboardState&&(n.onboardState="completed",n.onboardTime=t)),n[r]=f,n},_sendRequest:function(e,i,t){if(e){var n=this,r=2e3,o=e.url,s=e.headers,c=e.body,a=new XMLHttpRequest;for(var u in i="number"==typeof i?i:3,a.open(e.method,o),a.responseType="json",a.timeout=1e4,s)s.hasOwnProperty(u)&&a.setRequestHeader(u,s[u]);a.onload=function(){if(200===a.status){var e=a.response;t&&t(null,e)}else d()},a.onerror=function(){d()},a.ontimeout=function(){d()},"GET"===e.method?a.send():a.send(c)}function d(){0<i?(i-=1,setTimeout(function(){n._sendRequest(e,i,t)},r)):t&&t(new Error(a.statusText))}},callSubscriptionService:function(i,e,t){i=i||{};var n,r=this.config.subscriptionService,o="",s="";i.matrixParams&&Object.keys&&(Object.keys(i.matrixParams).forEach(function(e){o+=";"+encodeURIComponent(e)+"="+encodeURIComponent(i.matrixParams[e]||"")}),o&&(o+=";")),s=[].concat(r.protocol?r.protocol+"://":[]).concat(r.host||[]).concat(r.path?r.path.replace("RESOURCE_PLACEHOLDER",i.serviceResource+o):[]).join(""),"GET"===i.method?(s.indexOf("resource/")<0&&(s.endsWith&&!s.endsWith("/")&&(s+="/"),s+="resource/"+i.serviceResource+o),n={url:s,method:"GET"}):"POST"===i.method&&(n={body:JSON.stringify({requests:{g0:{resource:i.serviceResource,operation:i.operation,params:i,body:e}},context:r.context||{}}),headers:{"content-type":"application/json"},url:s,method:"POST"}),this._sendRequest(n,3,t)},readTopicSubscription:function(e,i,t){if(e&&i){var n={matrixParams:{channel_id:i,operation:"read",serviceResource:"subscriptions.hasSubscription",target_id:e},method:"GET",serviceResource:"subscriptions.hasSubscription"};this.callSubscriptionService(n,null,t)}else t&&t()},setTopicSubscription:function(e,i,t,n,r){if(e&&t&&n){var o=Object.assign({channel_id:n,device_id:t,target_id:e},this.getEssentialAttributes()),s={method:"POST",operation:"update",serviceResource:i?"subscriptions.setSubscription":"subscriptions.removeSubscription"};this.callSubscriptionService(s,o,r)}else r&&r(new Error("Missing required arguments"))},checkIsPushMuted:function(t,n){if(t&&n){var r=this;r.fetchPushPermission(function(e,i){i&&i.state===l&&i.subscriptionKeys?r.readTopicSubscription(t,i.subscriptionKeys,function(e,i){var t=i&&i.isSubscribed;n(null,!t)}):n(null,!0)})}else n&&n(new Error("Missing required topic"))},pushNotificationSubscribe:function(t,n){if(t&&t.topic){t=JSON.parse(JSON.stringify(t));var r=this,o=r.config.overlay.default,e=t.topic,s=t.trackingParams||{sec:"hd"};s.subsec="browser-prompt",s.aid=e,t.trackingParams=s,r.fetchPushPermission(function(e,i){return e||!i?(r._sendBeacon(a,{code:"permRead",message:e.message}),void(n&&n(new Error("Could not read push permission")))):i.state===p?(t.trackingParams=null,void r._handlePermissionDenied(t,n)):i.state===l&&i.deviceId&&i.subscriptionKeys?(t.trackingParams=null,void r._handlePermissionGranted(i,t,n)):(t.showInstructionsDefault&&o&&i.state!==l&&r.renderInstructionOverlay(o.overlayId,o.imageUrl,o.imageWidth,o.imageHeight,o.xOffset,o.yOffset),void r.requestPushPermission(s,function(e,i){return t.showInstructionsDefault&&o&&r.removeInstructionsOverlay(o.overlayId),!e&&i?i.state===l?void r._handlePermissionGranted(i,t,n):i.state===p?void r._handlePermissionDenied(t,n):void r._handlePermissionDismissed(t,n):(r._sendBeacon(a,{code:"permReq",message:e.message}),void(n&&n(new Error("Push permission request failure"))))}))})}else n&&n(new Error("Missing required option: topic"))},_handlePermissionGranted:function(t,e,n){var r=this,i=(e=e||{}).trackingParams,o=e.topic;t&&t.state===l&&o?(i&&(i.slk="permission-allow",i._p=1,r._trackClick(i)),this.setTopicSubscription(o,!0,t.deviceId,t.subscriptionKeys,function(e,i){e?t.deviceId&&r.logSubscriptionFailure():(r.hidePushSubscriptionPromos(),r.getSubscriptionLog(function(e,i){i&&"completed"!==i.onboardState&&r.logOnboardingCompleted(o)})),n&&n(e,i)})):n&&n(new Error("Missing required params in handler"))},_handlePermissionDenied:function(e,i){e=e||{};var t=this.config.overlay.denied,n=e.trackingParams;n&&(n.slk="permission-block",n._p=2,this._trackClick(n)),e.showInstructionsDenied&&t&&this.renderInstructionOverlay(t.overlayId,t.imageUrl,t.imageWidth,t.imageHeight,t.xOffset,t.yOffset),i&&i(new Error("Permission denied by user"))},_handlePermissionDismissed:function(e,i){var t=(e=e||{}).trackingParams;t&&(t.slk="permission-dismiss",t._p=0,this._trackClick(t)),i&&i(new Error("Permission not granted by user"))},pushNotificationUnsubscribe:function(t,n){var r=this;t&&r.fetchPushPermission(function(e,i){i?r.setTopicSubscription(t,!1,i.deviceId,i.subscriptionKeys,n):n&&n(new Error("Could not read permission"))})},renderInstructionOverlay:function(i,e,t,n,r,o){var s=this;if(i&&e&&t&&n){var c=document.createElement("div"),a=document.createElement("div"),u="";c.id=i,c.setAttribute("style","position:fixed; background-color:rgba(236, 236, 236, 0.95); top:0; left:0; width:100%; height:100%; z-index:100;"),"number"!=typeof r&&(u+="margin-left:auto; margin-right:auto;"),"number"!=typeof o&&(u+=" margin-top:117px;"),u&&a.setAttribute("style",u),a.setAttribute("style","width:"+t+"px;height:"+n+"px;background: url("+e+") 0 0/"+t+"px "+n+"px no-repeat;"+("number"==typeof r?"margin-left:"+r+"px;":"")+("number"==typeof o?"margin-top:"+o+"px;":"")),c.appendChild(a),document.body.appendChild(c),s.removeInstructionsOverlay&&(document.onkeydown=function(e){("key"in(e=e||window.event)?"Escape"===e.key||"Esc"===e.key:27===e.keyCode)&&s.removeInstructionsOverlay(i)},c.onclick=function(e){s.removeInstructionsOverlay(i)})}},removeInstructionsOverlay:function(e){var i=document.getElementById(e);i&&document.body.removeChild(i)},shouldPromotePushNotifications:function(){return this.checkIsSupportedBrowser(i)&&Notification.permission!==l},shouldPromotePushNotificationsForTopic:function(e,t){e&&this.checkIsSupportedBrowser(i)?this.checkIsPushMuted(e,function(e,i){e?t(e,!1):t(void 0,i)}):t(void 0,!1)},showPushSubscriptionPromos:function(){this.shouldPromotePushNotifications()&&document.body.classList.add(e)},hidePushSubscriptionPromos:function(){document.body.classList.remove(e)},_stringParseKV:function(e,i,t){var n={};if(!e)return n;i=i||";",t=t||":";for(var r=e.split(i),o=0;o<r.length;o+=1){var s=r[o],c=s.indexOf(t),a=s.substring(0,c),u=s.substring(c+1);a=a.trim?a.trim():a,u=u.trim?u.trim():u,a&&(n[a]=u)}return n},_delegateDOMEvent:function(e,i,t,n){if(e&&i&&t&&n){var r=document.querySelector(i);r&&r.addEventListener(e,function(e){for(var i=e.target;i&&e.currentTarget!==i;){if(i.matches(t)){n.call(i,e);break}i=i.parentNode}},!1)}},addPromoButtonDelegator:function(){var i=this;i._delegateDOMEvent("click","body",o,function(e){i.handlePromoButtonSubscription(this)})},handlePromoButtonSubscription:function(e){if(e){var i=this,t=e.getAttribute("data-subscription-topic"),n=e.getAttribute("data-subscription-ylk"),r=n&&i._stringParseKV(n),o="false"===e.getAttribute("data-subscription-instructions-default"),s="false"===e.getAttribute("data-subscription-instructions-denied");t&&r&&(i._trackClick(i._stringParseKV(n)),i.pushNotificationSubscribe({showInstructionsDefault:!o,showInstructionsDenied:!s,topic:t,trackingParams:r},i.displayWelcomeNotification.bind(i)))}},trackPromoButtonsLinkViews:function(){for(var e,i,t=document.querySelectorAll(o),n=0;t&&n<t.length;n+=1)t[n].classList.contains(s)&&this._isVisible(t[n])&&(e=t[n].getAttribute("data-subscription-ylk")||"",(i=this._stringParseKV(e))&&i.slk&&(i.slk="[manual] "+i.slk,this._trackLinkView(i)),t[n].classList.remove(s))},_isVisible:function(e){if(e){var i=window.getComputedStyle(e,null);return i&&"none"!==i.display&&"hidden"!==i.visibility}},displayWelcomeNotification:function(){var e=this.config.confirmationNotification;Notification.permission===l&&e.enabled&&new Notification(e.title,{body:e.body,icon:e.icon})},getEssentialAttributes:function(){var e={utcTz:"UTC"+-(new Date).getTimezoneOffset()/60};if(window.Intl)try{e.tz=window.Intl.DateTimeFormat().resolvedOptions().timeZone}catch(e){}return e}},typeof module!==u&&module.exports?module.exports=b:typeof window!==u&&(window.SubscriptionHelper=b)}();