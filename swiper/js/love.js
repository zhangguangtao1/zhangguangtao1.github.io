$(function(){
	$(".boy").addClass("slowWalk");
	setTimeout(function(){
		$(".content-wrape").addClass("pageChange");
	},10000)
	$(".boy").css({
				'left': $(".content").width()/2 + 'px',
				'transition': 'all 10s linear'
		});
	setTimeout(function(){
		$(".boy").addClass("pauseWalk");
		$(".content-wrape").addClass("pauseWalk");
		$(".door-left").css({"animation":"doorLeft 3s linear forwards"});
		$(".door-right").css({"animation":"doorRight 3s linear forwards"});
		$(".bird").addClass("birdFly");
		$(".bird").css({
				'right': $(".content").width()+ 'px',
				'transition': 'all 10s linear 0s'
		});
	},14999)
	setTimeout(function(){
		$(".b_background").addClass("lamp-bright");
		$(".boy").removeClass("pauseWalk");
		$(".boy").addClass("startRun");
		$(".boy").addClass("startRun1");
	},18000)
	setTimeout(function(){
		$(".boy").removeClass("startRun");
		$(".boy").removeClass("startRun1");
		$(".boy").removeClass("slowWalk");
		$(".boy").addClass("slowFlolerWalk");
		$(".boy").addClass("getOut");
		$(".boy").addClass("getOut1");
	},19000)
	setTimeout(function(){
		$(".boy").removeClass("getOut");
		$(".boy").removeClass("getOut1");
		$(".b_background").removeClass("lamp-bright");
		$(".door-left").css({"animation":"doorLeft1 3s linear forwards"});
		$(".door-right").css({"animation":"doorRight1 3s linear forwards"});
		$(".content-wrape").removeClass("pauseWalk");
		$(".boy").css({
				'left': '15%',
				'transition': 'all 4s linear'
		});
	},20000)
	setTimeout(function(){
		$(".boy").css({
				'left': '34%',
				'top':'37%',
				'transition': 'all 1.5s linear'
		});
	},25000)
	setTimeout(function(){
		$(".boy").css({
				'left': '46%',
				'transition': 'all 1.5s linear'
		});
	},26500)
	setTimeout(function(){
		$(".boy").addClass("pauseWalk");
		$(".boy").addClass("boy-rotate");
		$(".girl").addClass("girl-rotate");
	},28000)
	setTimeout(function(){
		var snowflakeURl = [
        'http://static.mukewang.com/img/55adde120001d34e00410041.png',
        'http://static.mukewang.com/img/55adde2a0001a91d00410041.png',
        'http://static.mukewang.com/img/55adde5500013b2500400041.png',
        'http://static.mukewang.com/img/55adde62000161c100410041.png',
        'http://static.mukewang.com/img/55adde7f0001433000410041.png',
        'http://static.mukewang.com/img/55addee7000117b500400041.png'
    ];
    
	},28850)
})
