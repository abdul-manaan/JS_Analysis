(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{112:function(e,t,n){"use strict";n.r(t);var i=n(0),s=n.n(i),o=n(29);class a{constructor(e){let t=e.container,n=e.eventTracker;this._container=t,this._eventTracker=n,this._pageElement=document.querySelector(a.SELECTOR_PAGE),this._toggleButton=this._container.getElementsByClassName(a.SELECTOR_TOGGLE_BUTTON)[0],this._searchForm=this._container.getElementsByClassName(a.SELECTOR_SEARCH_FORM)[0],this._formUrl=this._searchForm.getAttribute(a.DATA_URL),this._searchInput=this._searchForm.querySelector(a.SELECTOR_SEARCH_INPUT),this._submitInput=this._searchForm.querySelector(a.SELECTOR_SUBMIT_INPUT),this._onClickPageElement=this._onClickPageElement.bind(this),this._onClickToggleButton=this._onClickToggleButton.bind(this)}start(){this._updateFormAction(""),this._toggleButton.addEventListener("click",this._onClickToggleButton,!1),this._searchInput.addEventListener("input",this._onInput,!1)}stop(){this._toggleButton.removeEventListener("click",this._onClickToggleButton,!1),this._pageElement.removeEventListener("click",this._onClickPageElement,!1),this._searchInput.removeEventListener("input",this._onInput,!1),this.hide(),this.clearSearch()}_onClickToggleButton(e){e.preventDefault(),e.alreadyHandledBySearchComponent=!0,this._toggleSearch()}_onClickPageElement(e){this._hideOnClickOutsideSearch(e)}_toggleSearch(){this._pageElement.classList.contains(a.CLASS_SHOW_SEARCH)?this._hideAndClear():this._showAndFocus()}_hideOnClickOutsideSearch(e){const t=e.target;if(!e.alreadyHandledBySearchComponent)return this._container.contains(t)?void(this._submitInput.contains(t)&&this._onSubmitForm(e)):(e.preventDefault(),void this._hideAndClear())}_hideAndClear(){this._pageElement.removeEventListener("click",this._onClickPageElement,!1),this._pageElement.classList.remove(a.CLASS_SHOW_SEARCH),this.clearSearch()}_showAndFocus(){this._pageElement.addEventListener("click",this._onClickPageElement,!1),this._pageElement.classList.add(a.CLASS_SHOW_SEARCH),this.focusSearchInput()}_onSubmitForm(e){const t=Object(o.textToSlug)(this._searchInput.value);t.length<a.MIN_LETTERS_PER_SEARCH?e.preventDefault():(this._updateFormAction(t),this._eventTracker.trackEvent("headerMenuSearch",{query:t}))}_updateFormAction(e){this._searchForm.action=this._formUrl.replace(a.QUERY_PLACEHOLDER,e)}show(){this._showAndFocus()}hide(){this._hideAndClear()}clearSearch(){this._searchInput.value=""}focusSearchInput(){this._searchInput.focus()}}a.SELECTOR_PAGE=".page",a.SELECTOR_TOGGLE_BUTTON="js-site-search-toggle",a.SELECTOR_SEARCH_FORM="js-site-search",a.SELECTOR_SEARCH_INPUT="input[type=search]",a.SELECTOR_SUBMIT_INPUT="button[type=submit]",a.CLASS_SHOW_SEARCH="show-search",a.DATA_URL="data-url",a.QUERY_PLACEHOLDER=encodeURI("{query}"),a.MIN_LETTERS_PER_SEARCH=3;class c{constructor(){this._onClickToggleButton=this._onClickToggleButton.bind(this),this._onClickPageElement=this._onClickPageElement.bind(this),this._toggleButton=null,this._pageElement=null,this._container=null}start(){this._toggleButton=document.querySelector(c.SELECTOR_TOGGLE_BUTTON),this._pageElement=document.querySelector(c.SELECTOR_PAGE),this._container=document.querySelector(c.SELECTOR_MENU_CONTAINER),this._toggleButton.addEventListener("click",this._onClickToggleButton,!1)}stop(){this._toggleButton.removeEventListener("click",this._onClickToggleButton,!1),this._pageElement.removeEventListener("click",this._onClickPageElement,!1)}_onClickToggleButton(e){e.preventDefault(),e.alreadyHandledByMenuComponent=!0,this._toggleMenu()}_onClickPageElement(e){e.alreadyHandledByMenuComponent||this._container.contains(e.target)||this._hide()}_toggleMenu(){this._pageElement.classList.contains(c.CLASS_SLIDE_MENU)?this._hide():this._show()}_show(){this._pageElement.classList.add(c.CLASS_SLIDE_MENU),this._pageElement.addEventListener("click",this._onClickPageElement,!1)}_hide(){this._pageElement.classList.remove(c.CLASS_SLIDE_MENU),this._pageElement.removeEventListener("click",this._onClickPageElement,!1)}}c.SELECTOR_MENU_CONTAINER=".menu",c.SELECTOR_TOGGLE_BUTTON=".header__nav > a",c.SELECTOR_PAGE=".page",c.CLASS_SLIDE_MENU="show-menu";var r=n(49),l=n(274),_=n(11),h=n(13),E=n(1);n.d(t,"boot",function(){return m});const u=s()(()=>new a({container:document.getElementById("header"),eventTracker:Object(_.d)()})),d=s()(()=>new c),g=s()(()=>{const e=Object(h.c)(),t=document.querySelector(".page__slide");return new r.a({container:t||window,callback:()=>e.displayBottomAds(),condition:()=>{const e=t||document.documentElement;return"es-ES"!==E.a.locale||e.scrollTop>800}})});function m(){Object(l.a)().run(),u().start(),d().start(),!E.a.avoidThirdParty&&E.a.ads.slots&&g().start()}},274:function(e,t,n){"use strict";n.d(t,"a",function(){return S});var i=n(0),s=n.n(i),o=n(282),a=n.n(o),c=n(283),r=n.n(c),l=n(284),_=n.n(l),h=n(285),E=n.n(h),u=n(286),d=n.n(u),g=n(287),m=n.n(g);const S=s()(()=>{return new a.a({conditions:{immediate:new r.a,viewport:new _.a},conditionFallback:"immediate",loaders:{src:new E.a,"fb-comments":new d.a,iframe:new m.a},loaderFallback:"src"})})}}]);