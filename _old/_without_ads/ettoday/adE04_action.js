/*================== adE04 廣告=============================*/
//聲音播放時段設定 (設定每天自動靜音的時間區段)==========
var AudioStartHour = 9;//<---自動聲音播放開始：時
var AudioStartMinute = 0;//<---自動聲音播放開始：分
var AudioPlayStopHour = 19;//<---自動聲音播放結束：時
var AudioPlaySopMinute = 59;//<---自動聲音播放結束：分

//抓取現在時間
var RightNOW = new Date();
var this_hour = RightNOW.getHours();
var this_minute = RightNOW.getMinutes();
var this_second = RightNOW.getSeconds();

//靜音期間設定：以0時為0，分別計數出各時間點距0時幾秒
var AutoAudioStartTime = (AudioStartHour*60*60)+(AudioStartMinute*60);
var AutoAudioStopTime = (AudioPlayStopHour*60*60)+(AudioPlaySopMinute*60);
var RightTime = (this_hour*60*60)+(this_minute*60);

//音量依時間不同
if (AutoAudioStartTime <= RightTime && RightTime <= AutoAudioStopTime) {//現在時間介於聲音播放開始和結束時間 (非靜音時段)
	var VideoVolume = 0.10; // 音量設定 (0.00~1.00)
} else { // 靜音時段
	var VideoVolume = 0.01;
}
//======================================================

/*  x 秒後才會出現關閉鍵 */
var myTimer;
function adE04CountingDown()
{
    myTimer -= 1;
    document.getElementById('theFinalCountDown').innerHTML= myTimer;
    
    if(myTimer==0)
    {
	    //時間到執行動作
	    fnAdE04BtnShow(".adE04 .btn_close");//顯示關閉鍵
    } else {
	    //每秒執行一次,showTime()
       myCountDown=setTimeout("adE04CountingDown()",1000);
    }
}

//如果是 Youtube 影片
if(adE04Var[5].ad_source.indexOf('youtube')!=-1){

	var oAdE04Player;

	//取得 Youtube ID
	var YoutubeVideoID_adE04 = adE04Var[5].ad_source.split("v=")[1];//用v=分隔網址，取出v=右邊的字串
	if(YoutubeVideoID_adE04.indexOf("&") >= 0){//如果v=右邊的字串中有&號時
		YoutubeVideoID_adE04 = YoutubeVideoID_adE04.split("&")[0];//用&分隔網址，取出&左邊的字串，即為 Youtube ID
	}

	//取得 Youtube playList ID
	var YoutubeVideoListID_adE04 = adE04Var[5].ad_source.split("list=")[1];//用v=分隔網址，取出v=右邊的字串
	if(YoutubeVideoListID_adE04 == undefined) {
		YoutubeVideoListID_adE04 = "";
	} else if (YoutubeVideoListID_adE04.indexOf("&") >= 0){//如果list=右邊的字串中有&號時
		YoutubeVideoListID_adE04 = YoutubeVideoListID_adE04.split("&")[0];//用&分隔網址，取出&左邊的字串，即為 Youtube ID	
	}

	//以非同步方式載入 IFrame Player API
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	function onYouTubeIframeAPIReady_adE04() {
		//1秒後再執行
		setTimeout(function(){
			oAdE04Player = new YT.Player('AdE04Player', {
				playerVars: {
					'autoplay': 0, //1自動播放
					'showinfo': 0, //1顯示影片標題
					'controls': 1, //1顯示介面
					'autohide': 0, //1介面自動隱藏(flash only)
					'rel':0, //1播完顯示相關影片
					'modestbranding':1, //1 不顯示logo
					'list': YoutubeVideoListID_adE04
				},
				videoId: YoutubeVideoID_adE04,
				events: {
					'onReady': onAdE04PlayerReady,
					'onStateChange': fnAdE04PlayerStateChange
				}
			});
		}, 1000)
	}

	//設定播放音量
	function onAdE04PlayerReady(event) {
	  event.target.setVolume(20);//0~100
	  event.target.mute();
	  if(adE04Var[5].autoplay=="" || adE04Var[5].autoplay!="不自動播放"){//自動播放設定
	  	//event.target.playVideo();//播放影片 (不能在mobileweb 下打開，畫面會變黑)
	  	oAdE04Player.playVideo(); //播放影片
	  }
	  if(oAdE04Player.getDuration() > 0) {//取得影片總秒數及各偵測點秒數
		duration = oAdE04Player.getDuration();
		querterTime = duration / 4;
		time_25 = querterTime;
		time_50 = querterTime * 2;
		time_75 = querterTime * 3;
	  }
	  //$(".adE04_b").show();//打開廣告
	}

	//監聽 YT 影片狀態
	function fnAdE04PlayerStateChange(e){
		if (e.data == YT.PlayerState.PLAYING ) {//影片正在播放
			ga("expandVideo.send", "event", "PC 影音轟天雷 - 素材編號："+adE04Var[0].bannerid+"", "播放影片", ""+adE04Var[5].ad_source+"", {'nonInteraction': 0});
			console.log('start');

			var time_25_count = 0;
			var time_50_count = 0;
			var time_75_count = 0;
			var YTinterval = setInterval(function(){
				var currentTime = oAdE04Player.getCurrentTime();
				//console.log (currentTime);
				if(currentTime >= time_25){
					if(time_25_count < 1){ //只要送出一次
						ga("expandVideo.send", "event", "PC 影音轟天雷 - 素材編號："+adE04Var[0].bannerid+"", "25%", ""+adE04Var[5].ad_source+"", {'nonInteraction': 0});
						console.log('25%');
						time_25_count ++;
					}
				}
				if(currentTime >= time_50){
					if(time_50_count < 1){
						ga("expandVideo.send", "event", "PC 影音轟天雷 - 素材編號："+adE04Var[0].bannerid+"", "50%", ""+adE04Var[5].ad_source+"", {'nonInteraction': 0});
						console.log('50%');
						time_50_count ++;
					}
				}
				if(currentTime >= time_75){
					if(time_75_count < 1){
						ga("expandVideo.send", "event", "PC 影音轟天雷 - 素材編號："+adE04Var[0].bannerid+"", "75%", ""+adE04Var[5].ad_source+"", {'nonInteraction': 0});
						console.log('75%');
						time_75_count ++;
					}
				}
				if(currentTime === duration){
					clearInterval(YTinterval);
				}
			}, 1000);
		}
		if (e.data == YT.PlayerState.ENDED ) {//影片已結束
			ga("expandVideo.send", "event", "PC 影音轟天雷 - 素材編號："+adE04Var[0].bannerid+"", "100%", ""+adE04Var[5].ad_source+"", {'nonInteraction': 0});
			console.log('100%');
			oAdE04Player.playVideo(); //重播影片
			//fnAdE04AdHide();//關閉廣告
		}
		/*
		if (e.data == YT.PlayerState.PAUSED ) {} //影片已暫停
		if (e.data == YT.PlayerState.BUFFERING ) {} //影片正在緩衝
		if (e.data == YT.PlayerState.CUED ) {} //影片已插入
		*/
	};
}else{//非 youtube 影片
	
	////mp4 影片網址
	if(adE04Var[5].ad_source==""){//如果【素材內容】為空值
		adE04mp4VideoSrc = adE04Var[5].videoMp4;//抓取【影音上傳】欄位(系統已自動轉為 CDN 網址)
	} else {//【素材內容】非空值
		adE04mp4VideoSrc = adE04Var[5].ad_source;//直接抓取【素材內容】欄位
	}
}

//寫入容器==========
document.write('<div class="adE04" id="'+ adE04Var[0].packId +'" style="width:'+ adE04Var[2].width +'px;"><span class="btn btn_open"></span><span class="btn btn_close"></span><div class="box_b"></div><div class="box_s"></div></div>');

//觸發banner 判定為圖片======	
if(adE04Var[0].type == "pic" || adE04Var[0].type == "html5"){
	var oadE04HtmlSmall = '<a onclick="fnAdE04Click()" href="//ad.ettoday.net/adclick.php?bid='+ adE04Var[0].bid +'&bannerid='+ adE04Var[0].bannerid +'" target="_blank"><img src="'+ adE04Var[2].file +'" width="'+ adE04Var[2].width +'" height="'+ adE04Var[2].height +'" /></a>'
}

//觸發banner 判定為swf======	
if(adE04Var[0].type == "swf"){
	var oadE04HtmlSmall = '<embed name="'+ adE04Var[2].nameId +'" src="'+ adE04Var[2].file +'" width="'+ adE04Var[2].width +'" height="'+ adE04Var[2].height +'" wmode="'+ adE04Var[0].wmode +'" type="application/x-shockwave-flash" allowscriptaccess="always" flashVars="clickTAG=//ad.ettoday.net/adclick.php%3Fbid='+ adE04Var[0].bid +'%26bannerid='+ adE04Var[0].bannerid +'" pluginspage="//www.adobe.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash"></embed>'
}

//有底圖型的影片框及連結定位
if(adE04Var[2].width==1200){//廣告寬 1200
	var adE04_frameStyle ="position:absolute;width:768px;height:432px;left:216px; top:130px;";
	var gotoUrlStyle ="left:890px;top:475px";
}else{
	var adE04_frameStyle ="position:absolute;width:640px;height:360px;left:180px; top:110px";
	var gotoUrlStyle ="left:730px;top:385px";
}

//判斷影片類型吐結構
if(adE04Var[5].ad_source.indexOf('youtube')!=-1){ //youtube

	if(adE04Var[0].type == "html5"){
		//youtube 大影音
		var videoWidth = adE04Var[2].width;
		var videoHeight = adE04Var[2].width*9/16;
		var oadE04HtmlBig = '\
		<div class="adE04_b adE04_b_big" id="ytvideo" style="width:' +videoWidth+ 'px;height:' +videoHeight+ 'px;">\
			<a class="mask" title="了解更多" onclick="fnAdE04Click()" href="//ad.ettoday.net/adclick.php?bid=' +adE04Var[0].bid+ '&bannerid=' +adE04Var[0].bannerid+ '" rel="nofollow" target="_blank"><span>了解更多</span></a>\
			<div id="AdE04Player" class="adE04_frame_big" style="width:' +videoWidth+ 'px;height:' +videoHeight+ 'px">影片載入中，請稍後....</div>\
			<div class="goto-url-big"><a onclick="fnAdE04Click()" href="//ad.ettoday.net/adclick.php?bid=' +adE04Var[0].bid+ '&bannerid=' +adE04Var[0].bannerid+ '" rel="nofollow" target="_blank" title="了解更多"><span>了解更多</span></a></div>\
		</div>';
	} else {
		//youtube 影音
		var oadE04HtmlBig = '\
		<div class="adE04_b" style="background:url('+adE04Var[1].file+') no-repeat;width:'+ adE04Var[1].width+'px;height:'+ adE04Var[1].height+'px">\
			<a class="mask" title="了解更多" onclick="fnAdE04Click()" href="//ad.ettoday.net/adclick.php?bid=' +adE04Var[0].bid+ '&bannerid=' +adE04Var[0].bannerid+ '" rel="nofollow" target="_blank"><span>了解更多</span></a>\
			<div id="AdE04Player" class="adE04_frame" style="'+adE04_frameStyle+'">影片載入中，請稍後....</div>\
			<div class="goto-url"><a onclick="fnAdE04Click()" href="//ad.ettoday.net/adclick.php?bid=' +adE04Var[0].bid+ '&bannerid=' +adE04Var[0].bannerid+ '" rel="nofollow" target="_blank" title="了解更多" style="'+gotoUrlStyle+'"><span>了解更多</span></a></div>\
		</div>';
	}

} else if (adE04Var[5].ad_source.indexOf('livestream.com')!=-1){ //LiveStream
	if(adE04Var[0].type == "html5"){
		//LiveStream 大影音
		var videoWidth = adE04Var[2].width;
		var videoHeight = adE04Var[2].width*9/16;
		var oadE04HtmlBig = '\
		<div class="adE04_b adE04_b_big" id="livestream" style="width:' +videoWidth+ 'px;height:' +videoHeight+ 'px;">\
			<a class="mask" title="了解更多" onclick="fnAdE04Click()" href="//ad.ettoday.net/adclick.php?bid=' +adE04Var[0].bid+ '&bannerid=' +adE04Var[0].bannerid+ '" rel="nofollow" target="_blank"><span>了解更多</span></a>\
			<div id="AdE04Player"><iframe src="'+adE04Var[5].ad_source+'" class="adE04_frame_big" style="width:' +videoWidth+ 'px;height:' +videoHeight+ 'px;" width="' +videoWidth+ '" height="' +videoHeight+ '" frameborder="0" scrolling="no"></iframe></div>\
		</div>';
	} else {
		//LiveStream 影音
		var oadE04HtmlBig = '\
		<div class="adE04_b" style="background:url('+adE04Var[1].file+') no-repeat;width:'+ adE04Var[1].width+'px;height:'+ adE04Var[1].height+'px">\
			<a class="mask" title="了解更多" onclick="fnAdE04Click()" href="//ad.ettoday.net/adclick.php?bid=' +adE04Var[0].bid+ '&bannerid=' +adE04Var[0].bannerid+ '" rel="nofollow" target="_blank"><span>了解更多</span></a>\
			<div id="AdE04Player" class="adE04_frame"><iframe src="'+adE04Var[5].ad_source+'" style="'+adE04_frameStyle+'" frameborder="0" scrolling="no"></iframe></div>\
		</div>';
	}

} else if (adE04Var[5].ad_source.indexOf('ettoday.net')!=-1){ //CDN Player
	if(adE04Var[0].type == "html5"){
		//CDN Player 大影音
		var videoWidth = adE04Var[2].width;
		var videoHeight = adE04Var[2].width*9/16;
		var oadE04HtmlBig = '\
		<div class="adE04_b adE04_b_big" style="width:' +videoWidth+ 'px;height:' +videoHeight+ 'px;">\
			<a class="mask" title="了解更多" onclick="fnAdE04Click()" href="//ad.ettoday.net/adclick.php?bid=' +adE04Var[0].bid+ '&bannerid=' +adE04Var[0].bannerid+ '" rel="nofollow" target="_blank"><span>了解更多</span></a>\
			<div id="AdE04Player"><iframe src="'+adE04Var[5].ad_source+'&extraParameter" class="adE04_frame_big" style="width:' +videoWidth+ 'px;height:' +videoHeight+ 'px;" width="' +videoWidth+ '" height="' +videoHeight+ '" frameborder="0" scrolling="no"></iframe></div>\
		</div>';
	} else {
		//CDN Player
		var oadE04HtmlBig = '\
		<div class="adE04_b" style="background:url('+adE04Var[1].file+') no-repeat;width:'+ adE04Var[1].width+'px;height:'+ adE04Var[1].height+'px">\
			<a class="mask" title="了解更多" onclick="fnAdE04Click()" href="//ad.ettoday.net/adclick.php?bid=' +adE04Var[0].bid+ '&bannerid=' +adE04Var[0].bannerid+ '" rel="nofollow" target="_blank"><span>了解更多</span></a>\
			<div id="AdE04Player" class="adE04_frame"><iframe src="'+adE04Var[5].ad_source+'&extraParameter" style="'+adE04_frameStyle+'" frameborder="0" scrolling="no"></iframe></div>\
		</div>';
	}

} else { //mp4 影音
	if(adE04Var[0].type == "html5"){
		//mp4 大影音
		var videoWidth = adE04Var[2].width;
		var videoHeight = adE04Var[2].width*9/16;
		var oadE04HtmlBig = '\
		<div class="adE04_b adE04_b_big" style="width:' +videoWidth+ 'px;height:' +videoHeight+ 'px;">\
			<a class="mask" title="了解更多" onclick="fnAdE04Click()" href="//ad.ettoday.net/adclick.php?bid=' +adE04Var[0].bid+ '&bannerid=' +adE04Var[0].bannerid+ '" rel="nofollow" target="_blank"><span>了解更多</span></a>\
			<div id="AdE04Player" class="adE04_frame_big" style="width:' +videoWidth+ 'px;height:' +videoHeight+ 'px;"><video src="'+adE04mp4VideoSrc+'" width="' +videoWidth+ '" height="' +videoHeight+ '" controls="controls" webkit-playsinline playsinline autoplay muted preload="auto" /></div>\
		</div>';
	} else {
		//mp4 影音
		var oadE04HtmlBig = '\
		<div class="adE04_b" style="background:url('+adE04Var[1].file+') no-repeat;width:'+ adE04Var[1].width+'px;height:'+ adE04Var[1].height+'px">\
			<a class="mask" title="了解更多" onclick="fnAdE04Click()" href="//ad.ettoday.net/adclick.php?bid=' +adE04Var[0].bid+ '&bannerid=' +adE04Var[0].bannerid+ '" rel="nofollow" target="_blank"><span>了解更多</span></a>\
			<div id="AdE04Player" class="adE04_frame"><video src="'+adE04mp4VideoSrc+'" style="'+adE04_frameStyle+'" controls="controls" webkit-playsinline playsinline autoplay muted preload="auto" /></div>\
		</div>';
	}
};

	//左門簾
	var oadE04HtmlLeft = '<div class="curtain curtain-left"><a title="了解更多" onclick="fnAdE04Click()" href="//ad.ettoday.net/adclick.php?bid='+ adE04Var[0].bid +'&bannerid='+ adE04Var[0].bannerid +'" target="_blank" rel="nofollow"><img src="'+ adE04Var[3].file +'" width="'+ adE04Var[3].width +'" height="'+ adE04Var[3].height +'" /></a></div>';

	//右門簾
	var oadE04HtmlRight = '<div class="curtain curtain-right"><a title="了解更多" onclick="fnAdE04Click()" href="//ad.ettoday.net/adclick.php?bid='+ adE04Var[0].bid +'&bannerid='+ adE04Var[0].bannerid +'" target="_blank" rel="nofollow"><img src="'+ adE04Var[4].file +'" width="'+ adE04Var[4].width +'" height="'+ adE04Var[4].height +'" /></a></div>';
		

//寫入基礎css==========	
//document.write('<link href="adE04.css" rel="stylesheet" type="text/css"/>');
document.write('<link href="//static.ettoday.net/ad/adE04/adE04.css" rel="stylesheet" type="text/css"/>');

//定時關計時器===========
var adE04Timer

//按鈕狀態===============
function fnAdE04BtnShow(iBtn){
	$(".adE04 .btn").hide();
	$(iBtn).show();
}

//點擊廣告 Click
function fnAdE04Click(){
	//用 GA 的事件追蹤計算廣告點擊次數
	ga("expandVideo.send", "event", "PC 影音轟天雷 - 素材編號："+adE04Var[0].bannerid+"", "廣告點擊", ""+location.hostname+"", {'nonInteraction': 0});
};

//廣告開======================
function fnAdE04AdShow(){

	//大廣告展開次數追蹤
	ga('create', 'UA-52510577-5', 'auto', {'name': 'expandVideo'});//(廣告 / 影音轟天雷/影音凱旋門)
	ga('expandVideo.require', 'displayfeatures');
	ga('expandVideo.send', 'pageview');
	ga("expandVideo.send", "event", "PC 影音轟天雷 - 素材編號："+adE04Var[0].bannerid+"", "展開大廣告", ""+adE04Var[1].file+"", {'nonInteraction': 0});

	//小廣告動作
	$(".adE04 .box_s").empty().hide();

	//大廣告動作
	if(  $("body .adE04_b").length == 0 ){

		//插入結構
		$(".adE04 .box_b").append(oadE04HtmlBig).show();

	    if(adE04Var[5].ad_source.indexOf('youtube')!=-1){//如果是 Youtube 影片
	      //Youtube 影片處理
	      onYouTubeIframeAPIReady_adE04(); //載入 Youtube 影片
	    } else if (adE04Var[5].ad_source.indexOf('livestream.com')!=-1) {
	      //LiveStream 影片處理
	    } else if (adE04Var[5].ad_source.indexOf('ettoday.net')!=-1) {
	      //CDN 影片處理
	    } else {
	      //mp4 影片處理
	      var video=$("#AdE04Player video").get(0);
	      video.volume=VideoVolume; //音量設定 (0.1~1.0)
		  if(adE04Var[5].autoplay=="" || adE04Var[5].autoplay!="不自動播放"){//自動播放設定
		    //video.play();//自動播放 (不要開，否則播放進度第一次會算不到25%~75%)
		  } else {
			video.pause();
		  }
	      video.addEventListener('play', function() { //播放監聽
			ga("expandVideo.send", "event", "PC 影音轟天雷 - 素材編號："+adE04Var[0].bannerid+"", "播放影片", ""+adE04Var[5].videoMp4+"", {'nonInteraction': 0});
			console.log('start');

			if(video.readyState > 0) {//取得影片總秒數及各偵測點秒數
				duration = video.duration;
				querterTime = duration / 4;
				time_25 = querterTime;
				time_50 = querterTime * 2;
				time_75 = querterTime * 3;
			}
	      }, false);
	      /*
	      video.addEventListener('pause', function() { //暫停監聽
	        alert("暫停");
	      }, false);
	      */
	      video.addEventListener('ended', function() { //播完監聽
	      	if(time_100_count < 1){
				ga("expandVideo.send", "event", "PC 影音轟天雷 - 素材編號："+adE04Var[0].bannerid+"", "100%", ""+adE04Var[5].videoMp4+"", {'nonInteraction': 0});
				console.log('100%');
				time_100_count ++;
			}
			video.play(); //重播影片
	        //fnAdE04AdHide();//關閉廣告
	      }, false);

			var time_25_count = 0;
			var time_50_count = 0;
			var time_75_count = 0;
			var time_100_count = 0;
			video.addEventListener('timeupdate', function(){ // 觀看時間監聽
				var currentTime =  video.currentTime;
				//console.log (currentTime);
				if(currentTime >= time_25){
					if(time_25_count < 1){ //只要送出一次
						ga("expandVideo.send", "event", "PC 影音轟天雷 - 素材編號："+adE04Var[0].bannerid+"", "25%", ""+adE04Var[5].videoMp4+"", {'nonInteraction': 0});
						console.log('25%');
						time_25_count ++;
					}
				}
				if(currentTime >= time_50){
					if(time_50_count < 1){
						ga("expandVideo.send", "event", "PC 影音轟天雷 - 素材編號："+adE04Var[0].bannerid+"", "50%", ""+adE04Var[5].videoMp4+"", {'nonInteraction': 0});
						console.log('50%');
						time_50_count ++;
					}
				}
				if(currentTime >= time_75){
					if(time_75_count < 1){
						ga("expandVideo.send", "event", "PC 影音轟天雷 - 素材編號："+adE04Var[0].bannerid+"", "75%", ""+adE04Var[5].videoMp4+"", {'nonInteraction': 0});
						console.log('75%');
						time_75_count ++;
					}
				}
			}, false);
	      
	    }
	}

	/*大廣告展開動畫*/
	if(adE04Var[0].type == "html5"){

		// 修正 IE 有可能出 Flash 而點不到關閉鍵問題
		var userAgent = window.navigator.userAgent.toLowerCase();
		var version = (userAgent.match( /.(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [0, '0'])[1];
		var isIE = userAgent.indexOf("msie") + userAgent.indexOf("trident");
		if (isIE > 0) {//是IE
			bigAdHeight = 593;
			$(".adE04 .adE04_b_big#ytvideo").css({"height":"593"})
			$(".adE04 .adE04_b_big#ytvideo .adE04_frame_big").css({"top":"30px"})
			$(".adE04 .adE04_b_big#ytvideo .mask").css({"top":"30px"})
			$(".adE04 .adE04_b_big#ytvideo .goto-url-big a").css({"bottom":"40px"})
		} else {
			bigAdHeight = 563;
		}

	} else {
		bigAdHeight = adE04Var[1].height;
		fnAdE04BtnShow(".adE04 .btn_close");
	}

	//執行 adE04CountingDown() 倒數讀秒
	$(".adE04 .btn").hide();
	$(".adE04").append('<span id="timedCounter" class="btn"><span id="theFinalCountDown"></span> 秒後可關閉廣告...</span>');

	//顯示倒數秒數
	if (adE04Var[5].mustplay >0 && adE04Var[5].mustplay <=60 ) {
		myTimer=adE04Var[5].mustplay;//秒
	} else {
		if(adE04Var[0].type == "html5"){
			if (adE04Var[5].mustplay == 0 && adE04Var[5].mustplay !="" ) {
				myTimer=1;//大影音填 0 時的預設秒數
			} else {
				myTimer=1;//大影音預設秒數 (2018/1/19 由 30 秒改成 1 秒)
			}
		} else{
			myTimer=1;//小影音預設秒數
		}
	}
	adE04CountingDown();

	//打開後幾秒關
	adE04Timer = setTimeout(function(){
		fnAdE04AdHide();
	}, adE04Var[0].timeUp);
}

//廣告關======================
function fnAdE04AdHide(){
	clearTimeout(adE04Timer); 
	//$(".adE04 .box_b").slideUp(1000, function(){
	$(".adE04 .box_b").show(1000, function(){
		$(this).empty();
		$(".adE04_b .adE04_frame").empty().hide();//清空影片區內容
		$(".adE04 .box_s").html(oadE04HtmlSmall).fadeIn();
		fnAdE04BtnShow(".adE04 .btn_open");
		//$(".curtain").remove();//移除左右門簾
	});

	//移除倒數計時器
	$("#timedCounter").remove();

}

//按鈕控制================
$(".adE04 .btn_open").bind("click", function(){
	if($(".adE04").queue().length!=0) return;
	fnAdE04AdShow();
});
	
$(".adE04 .btn_close").bind("click", function(){
	if($(".adE04").queue().length!=0) return;
	fnAdE04AdHide();
});

//由swf呼叫。檢測cookie
function fnAdE04CheckCookie(){
	var countName = adE04Var[0].cookieName; //定義cookie名稱
	if($.cookie(countName)==null){ //先判斷是否已有 cookie 值沒有的話，新增一組 (沒有cookie或cookie到期都會回應null)
		fnAdE04AdShow();//展開大廣告

		var expireMin = Number(adE04Var[5].autoplay); //定義cookie到期時數
			if (expireMin == 0 || isNaN(expireMin)) { expireMin= 120; } //★★★若沒指定，預設 120 分)★★★
		var expireHour = expireMin / 60; // 將分鐘數換算成時數

		var iExpireDate = new Date();
		iExpireDate.setTime(iExpireDate.getTime() + (expireHour * 60 * 60 * 1000));// ★cookies 效期為 n 小時 (2018/6/1 改2小時1次)
		$.cookie(countName, 1 ,{ expires: iExpireDate, domain: 'ettoday.net', path: '/' }); //設定key跟value，一定要下 expires 及 path 參數
	}else{
		fnAdE04AdHide();//關閉大廣告，只顯示小廣告
	}
}

//初始化===========
//$(function(){
	if (adE04Var[3].width >0) {
		$(".adE04").append(oadE04HtmlLeft).show(); //插入左門簾
		$(".adE04").append(oadE04HtmlRight).show(); //插入右門簾
	}
	fnAdE04CheckCookie();
//});