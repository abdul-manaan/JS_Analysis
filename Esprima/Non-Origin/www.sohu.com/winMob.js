(function(){try{var d={getCookie:function(p,t){var o;var t=t||window;var s=t.document;var q=new RegExp("(^| )"+p+"=([^;]*)(;|\x24)");var r=q.exec(s.cookie);if(r){o=r[2]}return o},setCookie:function(q,r,p){p=p||{};var o=p.expires;if("number"==typeof p.expires){o=new Date();o.setTime(o.getTime()+p.expires)}document.cookie=q+"="+r+(p.path?"; path="+p.path:"")+(o?"; expires="+o.toGMTString():"")+(p.domain?"; domain="+p.domain:"")+(p.secure?"; secure":"")}};var g={sendByIframe:function(o){var p=document.createElement("iframe");p.id="ifr"+parseInt(Math.random()*100000);p.style.display="none";p.setAttribute("src",o);document.body.insertBefore(p,document.body.firstChild)},sendByImage:function(p,r){var o=new Image();var q="cpro_log_"+Math.floor(Math.random()*2147483648).toString(36);r=r||window;r[q]=o;o.onload=o.onerror=o.onabort=function(){o.onload=o.onerror=o.onabort=null;r[q]=null;o=null};o.src=p}};var f=d.getCookie("BAIDUID");var e=d.getCookie("CPROID");var k=d.getCookie("ISUS");var h=d.getCookie("ISBID");var l=false;var m=false;var n=(new Date()).getTime();if(!e&&f){var j="//cpro.baidustatic.com/sync.htm?cproid="+encodeURIComponent(f);g.sendByIframe(j)}if(e&&!k){l=true}else{if(e&&k&&e!==k){l=true}}if(f&&!h){m=true}else{if(f&&h&&f!==h){m=true}}if(l||m){var a=new Date();a.setTime(a.getTime()+86400000);d.setCookie("ISBID",f||"1",{path:"/",expires:a});d.setCookie("ISUS",e||"1",{path:"/",expires:a});if(e&&f){var c=e;var b=e.indexOf(":");if(b&&b>0){c=e.substring(0,b)}g.sendByIframe("//s.cpro.baidu.com/s.htm?cproid="+c+"&t="+n)}if(e){g.sendByIframe("//pos.baidu.com/sync_pos.htm?cproid="+encodeURIComponent(e)+"&t="+n);var c=e;var b=e.indexOf(":");if(b&&b>0){c=e.substring(0,b)}}}}catch(i){}})();