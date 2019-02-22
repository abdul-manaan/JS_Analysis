//首頁專用 ======================

//text_ticker_1 快訊======================
(function (){
	
	if($(".text_ticker_1 .run .inner a").length > 0){ //有快訊
		// 預設 有快訊 無變天
		if($(".text_ticker_1 .run .inner a").length > 1){ //1則以上才輪播
			var text_ticker_1 = $(".text_ticker_1 .run .inner").bxSlider({  
				slideWidth:800,
				auto:true,
				mode: 'fade',
				speed:100,
				pause:3000,
				controls:false, 
				pager:false,
				autoHover:true,
				onSliderLoad:function(){
					$(".text_ticker_1 .run .inner .piece a").show();
				}
			});
		}
		
		
	}else{
		$(".text_ticker_1").hide(); //無快訊 隱藏
	}
	
})();

//gallery_1======================
(function (){
	
	$(".gallery_1").find(".piece:not(:has(img))").remove();
	var gallery_1 = $(".gallery_1 .run .inner").bxSlider({  
		slideWidth:655,
		auto:true,
		captions: true,
		speed:100,
		pause : 5000,
		controls:false, 
		autoHover:true,
		onSliderLoad:function(){
			$(".gallery_1 .run .inner .piece img").show();
		}
	});
	
	
	$(".gallery_1").on("mouseover","a.bx-pager-link",function(){
		gallery_1.stopAuto();
		var iNo = $(this).attr("data-slide-index");
		gallery_1.goToSlide(iNo);
	});
	
	$(".gallery_1").on("mouseout","a.bx-pager-link",function(){
		gallery_1.startAuto();
	});
	
})();


