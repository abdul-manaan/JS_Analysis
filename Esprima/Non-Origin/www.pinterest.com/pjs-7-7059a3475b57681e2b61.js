webpackJsonp([7],{"4LKs":function(e,t,n){"use strict";n.d(t,"a",function(){return v});var o=n("GiK3"),i=(n.n(o),n("fUyD")),a=n("bpks"),r=n("YS0m"),c=n("zOfx"),l=n("Pfgl"),s=n("w3lh"),u=n("ISgH"),p=n("xi/f");function d(e){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){y(e,t,n[t])})}return e}function g(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function b(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var _=function(){},O={headingOffset:{__style:{marginLeft:-10,marginRight:50}},mask:{baseStyles:{backgroundColor:"rgba(0,0,0, .5)",height:"100%",touchAction:"none",transitionProperty:"opacity",transitionTimingFunction:"ease-out",width:"100%",zIndex:1}},modal:{baseStyles:{border:Object(s.e)()?void 0:"1px solid #efefef",touchAction:"none",transitionProperty:"transform, opacity",transitionTimingFunction:"ease-out",width:"100vw",zIndex:1,left:0,bottom:0},baseStylesSliding:{border:Object(s.e)()?void 0:"1px solid #efefef",touchAction:"none",width:"100vw",zIndex:1,left:0,bottom:0},fullscreenStyles:{touchAction:"none",transitionProperty:"transform, opacity",transitionTimingFunction:"ease-out",width:"90vw",height:"70vh",borderRadius:"8px",zIndex:1,left:"5vw",bottom:"13vh",overflowY:"hidden"}}},v=function(e){function t(){var e,n,o,i;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return o=this,i=(e=h(t)).call.apply(e,[this].concat(r)),n=!i||"object"!==d(i)&&"function"!=typeof i?b(o):i,y(b(b(n)),"state",{isShowing:!1}),y(b(b(n)),"getMaskStyles",function(){var e=n.props,t=e.overrideZDepth,o=e.maskFadeInDuration,i=n.state.isShowing,a=O.mask.baseStyles;return a.zIndex=t?t-1:a.zIndex,{__style:f({},a,o?{opacity:i?1:0,transitionDuration:o}:null)}}),y(b(b(n)),"getModalStyles",function(){var e=n.props,t=e.overrideZDepth,o=e.modalFadeInDuration,i=e.slideUpDuration,a=e.isFullscreen,r=n.state.isShowing,c=a?O.modal.fullscreenStyles:O.modal.baseStyles;return c.zIndex=t||c.zIndex,{__style:f({},c,i?{transform:r?"translateY(0)":"translateY(100vh)",transitionDuration:i}:{},o?{opacity:r?1:0,transitionDuration:o}:{})}}),y(b(b(n)),"getModalStylesSlideUp",function(){var e=n.props.overrideZDepth,t=n.state.isShowing,o=O.modal.baseStylesSliding;return o.zIndex=e||o.zIndex,{__style:f({},o,{transition:"all 225ms cubic-bezier(0.0,0.0,0.2,1) 500ms",transform:t?"translateY(0)":"translateY(100vh)"})}}),y(b(b(n)),"preventModalScroll",function(e){e.preventDefault()}),n}var n,s,v;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(t,o["Component"]),n=t,(s=[{key:"componentDidMount",value:function(){var e=this;this.props.isOpen&&r.a.pause(),this.requestAnimationFrameId=Object(u.k)(function(){return e.setState({isShowing:!0})})}},{key:"componentDidUpdate",value:function(e){this.props.isOpen&&!e.isOpen?r.a.pause():!this.props.isOpen&&e.isOpen&&r.a.resume()}},{key:"componentWillUnmount",value:function(){this.props.isOpen&&r.a.resume(),window.cancelAnimationFrame(this.requestAnimationFrameId)}},{key:"render",value:function(){var e=this.props,t=e.accessibilityCloseIconLabel,n=e.children,r=e.isOpen,s=e.hideCloseIcon,u=e.onDismiss,d=e.overrideZDepth,f=e.heading,g=e.isSlideUp,h=e.childPaddingX,m=e.childPaddingY,b=e.enableCloseIconBackground,y=e.onCloseIconDismiss,v=e.isFullscreen,S=this.getMaskStyles(),w=g?this.getModalStylesSlideUp():this.getModalStyles();return r&&o.createElement(c.a,null,o.createElement(p.m,null,o.createElement(p.b,{display:"inlineBlock"},o.createElement(l.a,{onTouch:u||_,pressState:"background"},o.createElement(p.b,{position:"fixed",top:!0,left:!0,onTouchMove:this.preventModalScroll,dangerouslySetInlineStyle:S})),b&&o.createElement(p.b,{top:!0,left:!0,position:"fixed",dangerouslySetInlineStyle:{__style:{zIndex:d||O.modal.baseStyles.zIndex}}},o.createElement(a.a,{accessibilityLabel:i.a._("close icon background","accesibility label for close icon on a overlay"),icon:"cancel",onTouch:y,padding:5,size:20,color:"white"})),o.createElement(p.b,{position:"fixed",color:"white",onTouchMove:this.preventModalScroll,dangerouslySetInlineStyle:w},t&&!s&&o.createElement(p.b,null,o.createElement(p.b,{flex:"grow",display:"flex",alignItems:"center"},o.createElement(p.b,{display:"flex",alignItems:"center"},o.createElement(a.a,{accessibilityLabel:t,icon:"cancel",onTouch:u,padding:5,size:20})),o.createElement(p.b,{display:"flex",flex:"grow",alignItems:"center",justifyContent:"center",dangerouslySetInlineStyle:O.headingOffset},v?f:o.createElement(p.B,{align:"center",bold:!0,size:"xl"},f))),!v&&o.createElement(p.e,null)),o.createElement(p.b,{paddingX:h,paddingY:m},n)))))}}])&&g(n.prototype,s),v&&g(n,v),t}();y(v,"defaultProps",{childPaddingX:3,childPaddingY:3})},hin0:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("GiK3"),i=n.n(o),a=n("RH2O"),r=n("f8Wt"),c=n("fUyD"),l=n("gmIi"),s=n("4LKs"),u=n("hM9U"),p=n("8Yp0"),d=n("TX9j"),f=n("up2q"),g=n("sH4p"),h=n("qTfT"),m=n("c9Fv"),b=n("Po4C"),y=n("CKwM"),_=n("G+dY"),O=n("+604"),v=n("z7zf"),S=n("xi/f"),w=function(){return o.createElement(S.b,null,o.createElement(S.b,{alignItems:"center",display:"flex",justifyContent:"center",position:"absolute",top:!0,left:!0,bottom:!0,right:!0,dangerouslySetInlineStyle:{__style:{opacity:1,zIndex:101}}},o.createElement(S.y,{accessibilityLabel:c.a._("Loading","Label for loading spinner"),show:!0})),o.createElement(S.b,{color:"white",position:"absolute",top:!0,left:!0,bottom:!0,right:!0,dangerouslySetInlineStyle:{__style:{opacity:.7,zIndex:100}}}))},E=n("5YEs");function T(e){return(T="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function C(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function I(e){return(I=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function k(e,t){return(k=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function j(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function x(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var L={STATIC_CONFIRMATION:"staticSignupLogin",STATIC_CONFIRMATION_WITH_TOS:"staticSignupLoginWithTOS"},P="mweb_google_one_tap.confirmation_dialog",R=function(e){function t(){var e,n,o,i;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return o=this,i=(e=I(t)).call.apply(e,[this].concat(r)),n=!i||"object"!==T(i)&&"function"!=typeof i?j(o):i,x(j(j(n)),"handleCancelClick",function(e){Object(p.a)("".concat(P,".").concat(e,".cancel.click")),n.props.handleCancelClick()}),x(j(j(n)),"handleConfirmSignup",function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];Object(p.a)("".concat(P,".").concat(e,".confirm.click")),n.props.handleConfirmSignup(t)}),x(j(j(n)),"handleShowLogin",function(e){Object(p.a)("".concat(P,".").concat(e,".login.click")),n.props.handleShowLogin()}),n}var n,a,r;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&k(e,t)}(t,o["Component"]),n=t,(a=[{key:"componentDidMount",value:function(){Object(p.a)("".concat(P,".").concat(this.props.initialStep,".shown"))}},{key:"componentWillUnmount",value:function(){this.enableBackgroundScrolling()}},{key:"disableBackgroundScrolling",value:function(){document.body&&(document.body.style.overflow="hidden")}},{key:"enableBackgroundScrolling",value:function(){document.body&&(document.body.style.overflow="")}},{key:"render",value:function(){var e=this,t=this.props.initialStep;return i.a.createElement(S.b,null,this.props.loading?i.a.createElement(w,null):null,i.a.createElement(S.b,{padding:3},i.a.createElement(S.b,{display:"inlineBlock",position:"absolute",top:!0,right:!0,marginTop:2,marginRight:2},i.a.createElement(S.j,{accessibilityLabel:c.a._("Cancel","Button to close the signup/login modal"),icon:"cancel",onClick:function(){return e.handleCancelClick(t)},size:"sm"})),i.a.createElement(v.a,{name:"mweb_unauth_gtap_modal_copy_v2"},function(n){var a=n.group;return["employees","enabled_google"].includes(a)?i.a.createElement(o.Fragment,null,i.a.createElement(S.B,{align:"left",size:"xl",bold:!0},c.a._("Sign up for Pinterest","Title of a dialog asking the user to sign up for a Pinterest account")),i.a.createElement(S.b,{marginTop:2},i.a.createElement(S.B,{align:"left",size:"md"},c.a._("Hmm, we can't find anything connected to this Google account.","Description text of a dialog asking the user to sign up for a Pinterest account"))),i.a.createElement(S.b,{marginTop:5},i.a.createElement(S.c,{color:"red",onClick:function(){return e.handleConfirmSignup(t)},text:c.a._("Start a Pinterest account","Text on a button which will create an account when clicked")})),i.a.createElement(S.b,{marginTop:2},i.a.createElement(S.c,{color:"gray",onClick:function(){return e.handleShowLogin(t)},text:c.a._("Log in with another account","Text on a button which will take the user to login when clicked")}))):"enabled_account"===a?i.a.createElement(o.Fragment,null,i.a.createElement(S.B,{align:"left",size:"xl",bold:!0},c.a._("Continue to Pinterest","Title of a dialog telling enabling the user to continue with sign up or log in")),i.a.createElement(S.b,{marginTop:2},i.a.createElement(S.B,{align:"left",size:"md"},c.a._("Hmm, it looks like you don't have an account yet. Let's get started!","Description text of a dialog asking the user to sign up for a Pinterest account"))),i.a.createElement(S.b,{marginTop:5},i.a.createElement(S.c,{color:"red",onClick:function(){return e.handleConfirmSignup(t)},text:c.a._("Sign up","Text on a button which will create an account when clicked")})),i.a.createElement(S.b,{marginTop:2},i.a.createElement(S.c,{color:"gray",onClick:function(){return e.handleShowLogin(t)},text:c.a._("Log in using a different method","Text on a button which will take the user to login when clicked")}))):i.a.createElement(o.Fragment,null,i.a.createElement(S.B,{align:"left",size:"xl",bold:!0},c.a._("Continue to Pinterest","Title of a dialog telling enabling the user to continue with sign up or log in")),i.a.createElement(S.b,{marginTop:2},i.a.createElement(S.B,{align:"left",size:"md"},c.a._("Selecting sign up will create a new account—so if you already have one, log in instead.","Description text of a dialog which allows a user to sign up or log in"))),i.a.createElement(S.b,{marginTop:5},i.a.createElement(S.c,{color:"red",onClick:function(){return e.handleConfirmSignup(t)},text:c.a._("Sign up","Text on a button which will create an account when clicked")})),i.a.createElement(S.b,{marginTop:2},i.a.createElement(S.c,{color:"gray",onClick:function(){return e.handleShowLogin(t)},text:c.a._("Log in","Text on a button which will take the user to login when clicked")})))}),this.props.initialStep===L.STATIC_CONFIRMATION_WITH_TOS?i.a.createElement(S.b,{marginTop:6},i.a.createElement(E.a,null)):null))}}])&&C(n.prototype,a),r&&C(n,r),t}(),D={USER_CANCELED:"userCanceled",NO_CREDENTIALS_AVAILABLE:"noCredentialsAvailable",REQUEST_FAILED:"requestFailed",OPERATION_CANCELED:"operationCanceled",ILLEGAL_CONCURRENT_REQUEST:"illegalConcurrentRequest",INITIALIZATION_ERROR:"initializationError",CONFIGURATION_ERROR:"configurationError"},A=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:["https://accounts.google.com"];if(!e)return null;var o={supportedAuthMethods:n,supportedIdTokenProviders:[{uri:"https://accounts.google.com",clientId:u.a.settings.GPLUS_CLIENT_ID}],context:"continue"};return t?e.hint(o):e.retrieve(o)},N=n("46YI"),F=n("/hEK"),z=n("F8kA");function M(e){return(M="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function G(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function U(e){return(U=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function B(e,t){return(B=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function Y(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function H(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var W=30,q="mweb_google_one_tap",K="disableUnauthGoogleOneTap",Z=Object.freeze({RETRIEVE:"retrieve",HINT:"hint"}),V=function(e){function t(){var e,n,o,i;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var a=arguments.length,l=new Array(a),s=0;s<a;s++)l[s]=arguments[s];return o=this,i=(e=U(t)).call.apply(e,[this].concat(l)),n=!i||"object"!==M(i)&&"function"!=typeof i?Y(o):i,H(Y(Y(n)),"state",{loading:!1,confirmationDialogStep:void 0,googleOpenId:"",showRegisterLoading:!1,first_name:""}),H(Y(Y(n)),"onRetrieveCredentialsSuccess",function(e,t){var o=n.props,i=o.history,a=o.location,r=o.login;n.disableGoogleOneTapDialog(),n.showLoading(),Object(p.a)("".concat(q,".").concat(t,".success"));var c={google_open_id_token:e.idToken};Object(O.d)({event_type:7534,view_type:10,view_parameter:3201,aux_data:{signup_login_method:4}}),r(c,i,a.pathname).then(function(){Object(p.a)("".concat(q,".hint.login.success")),Object(O.d)({event_type:7536,view_type:10,view_parameter:3201,aux_data:{signup_login_method:4}})},function(e){Object(O.d)({event_type:7535,view_type:10,view_parameter:3201,aux_data:{signup_login_method:4}}),n.onLoginFailure(c,t,e)})}),H(Y(Y(n)),"onRetrieveCredentialsFailure",function(e,t){var n=e&&e.type||"unknown";Object(p.a)("".concat(q,".").concat(t,".error.").concat(n))}),H(Y(Y(n)),"onLoginFailure",function(e,t,o){n.hideLoading();var i=o&&o.apiErrorCode||0;if(Object(p.a)("".concat(q,".hint.login.error.").concat(i)),i!==W||n.props.isTablet)n.props.showToast({text:o.message||c.a._("We couldn’t log you in with that account. Try the Google button!")}),n.props.handleLoginError();else{var a=n.determineConfirmationDialogStep(t);a===L.STATIC_CONFIRMATION||a===L.STATIC_CONFIRMATION_WITH_TOS?n.showConfirmationDialog(e,a):n.attemptSignup(e.google_open_id_token,!1)}}),H(Y(Y(n)),"onSignupSuccess",function(e,t){n.setState({showRegisterLoading:!1}),Object(p.a)("".concat(q,".hint.signup.success")),Object(O.d)({event_type:7487,view_type:10,view_parameter:t?3202:3201,aux_data:{signup_login_method:4}});var o=n.props,i=o.history,a=o.inBLPNoRedirectExp,r=o.inPLPNoRedirectExp,c=o.location;Object(N.f)(c)&&r()||Object(N.c)(c)&&a()?i.push(c.pathname+c.search):i.push("/")}),H(Y(Y(n)),"onSignupFailure",function(e,t){var o=e&&e.api_error_code||0;Object(p.a)("".concat(q,".hint.signup.error.").concat(o)),Object(O.d)({event_type:7488,view_type:10,view_parameter:t?3202:3201,aux_data:{signup_login_method:4}}),n.hideLoading(),n.hideConfirmationDialog(),n.props.showToast({text:e.message||c.a._("We couldn’t sign you up with that account. Try the Google button!")}),n.props.handleSignupError()}),H(Y(Y(n)),"determineConfirmationDialogStep",function(e){var t=n.props,o=t.container,i=t.location;return o===Object(N.m)(i)?L.STATIC_CONFIRMATION:e===Z.RETRIEVE?L.STATIC_CONFIRMATION_WITH_TOS:""}),H(Y(Y(n)),"shouldUseMediatedAuthentication",function(){return!n.isGoogleOneTapDisabled()}),H(Y(Y(n)),"attemptCredentialAuthentication",function(e,t,o){Object(p.a)("".concat(q,".request_credentials.").concat(t)),setTimeout(function(){Object(p.a)("".concat(q,".").concat(t,".promise_initiate"));var i=A(e,o);n.props.showGoogleOneTap(),i?i.then(function(e){Object(p.a)("".concat(q,".").concat(t,".promise_resolved")),n.onRetrieveCredentialsSuccess(e,t)}).catch(function(i){Object(p.a)("".concat(q,".").concat(t,".promise_rejected")),n.onRetrieveCredentialsFailure(i,t);var a=i&&i.type||"";o||a===D.USER_CANCELED?n.props.handleEmptyCredentials&&n.props.handleEmptyCredentials():a!==D.OPERATION_CANCELED?n.shouldUseMediatedAuthentication()?n.attemptCredentialAuthentication(e,Z.HINT,!0):n.props.handleEmptyCredentials&&n.props.handleEmptyCredentials():n.props.hideGoogleOneTap()}):Object(p.a)("".concat(q,".request_credentials.").concat(t,".smartlock_not_ready"))},0)}),H(Y(Y(n)),"handleCancelOneTap",function(){n.hideConfirmationDialog()}),H(Y(Y(n)),"isGoogleOneTapDisabled",function(){return"1"===r.a(K)}),H(Y(Y(n)),"disableGoogleOneTapDialog",function(){r.b(K,"1",168)}),H(Y(Y(n)),"navigateToLogin",function(){n.handleCancelOneTap(),n.props.history.push({pathname:"/login/",state:{next:n.props.location.pathname}})}),H(Y(Y(n)),"attemptSignup",function(e,t){var o=n.props.country,i=n.decodeToken(e),a={google_open_id_token:e,first_name:i.given_name,last_name:i.family_name,image_url:i.picture};if(Object(_.b)(o))return n.hideLoading(),n.hideConfirmationDialog(),void n.props.history.push({pathname:"/signup/thirdpartyage/",state:{signupOptions:a,signupPlatform:"gtap"}});n.setState({showRegisterLoading:!0,first_name:a.first_name}),Object(O.d)({event_type:7537,view_type:10,view_parameter:t?3202:3201,aux_data:{signup_login_method:4}}),n.props.register(a).then(function(e){return n.onSignupSuccess(e,t)},function(e){return n.onSignupFailure(e,t)})}),H(Y(Y(n)),"handleConfirmOneTapSignup",function(e){e&&n.showLoading();var t=n.state.googleOpenId;n.attemptSignup(t,!0)}),n}var n,a,g;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&B(e,t)}(t,o["PureComponent"]),n=t,(a=[{key:"componentDidMount",value:function(){var e=this.props.handleEmptyCredentials;r.a("fba")||this.isGoogleOneTapDisabled()?e&&e():this.setupGoogleOneTap()}},{key:"componentWillUnmount",value:function(){var e;Object(p.a)("".concat(q,".dismiss_iframe.attempt")),(e=window.smartlock)&&e.cancelLastOperation&&e.cancelLastOperation().then(function(){})}},{key:"setupGoogleOneTap",value:function(){var e=this;window.onSmartLockLoad=function(t){Object(p.a)("".concat(q,".setup.attempt"));try{var n=window.openyolo;Object(p.a)("".concat(q,".open_yolo_load.").concat((!!n).toString())),n.setProviderUrlBase("https://smartlock.google.com/iframe/request"),e.attemptCredentialAuthentication(t,Z.RETRIEVE,!1)}catch(t){var o=t&&t.name||"unknown";Object(p.a)("".concat(q,".setup.error.").concat(o)),e.props.handleEmptyCredentials&&e.props.handleEmptyCredentials()}},this.addGoogleOneTapScript()}},{key:"decodeToken",value:function(e){return JSON.parse(window.atob(e.split(".")[1]))}},{key:"showConfirmationDialog",value:function(e,t){this.setState({googleOpenId:e.google_open_id_token,confirmationDialogStep:t})}},{key:"hideConfirmationDialog",value:function(){this.setState({confirmationDialogStep:void 0})}},{key:"showLoading",value:function(){this.setState({loading:!0})}},{key:"hideLoading",value:function(){this.setState({loading:!1,showRegisterLoading:!1})}},{key:"addGoogleOneTapScript",value:function(){Object(l.b)("https://smartlock.google.com/client?clientId=".concat(u.a.settings.GPLUS_CLIENT_ID))}},{key:"render",value:function(){var e=this.state,t=e.confirmationDialogStep;return e.showRegisterLoading?i.a.createElement(f.a,{platform:"gtap"}):t?i.a.createElement(d.a,{viewType:10,viewParameter:3202},i.a.createElement(s.a,{isOpen:!0},i.a.createElement(R,{handleCancelClick:this.handleCancelOneTap,handleConfirmSignup:this.handleConfirmOneTapSignup,handleShowLogin:this.navigateToLogin,initialStep:t,loading:this.state.loading}))):null}}])&&G(n.prototype,a),g&&G(n,g),t}();t.default=Object(m.compose)(z.withRouter,g.b,Object(a.connect)(function(e){return{country:e.session.country,isTablet:e.session.isTablet}},function(e){return{login:function(t,n,o){return e(Object(b.b)(t,n,o))},register:function(t){return e(Object(y.b)(t))},showGoogleOneTap:function(){return e(Object(F.q)())},hideGoogleOneTap:function(){return e(Object(F.c)())},inPLPNoRedirectExp:function(){return"enabled"===e(Object(h.a)("mweb_unauth_got_signup_no_redirect_plp"))},inBLPNoRedirectExp:function(){return"enabled"===e(Object(h.a)("mweb_unauth_got_signup_no_redirect_blp"))}}}))(V)}});