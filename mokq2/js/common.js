$(document).ready(function(){
	//左侧点击展开
	$(".leftNav li h3").click(function(){
		$(this).parent().toggleClass("cur")
		$(this).parent().siblings().removeClass("cur")
	});
	//左侧浮动效果
    var isMenuOpen = false;
    $('#headIcon').click(function () {
        if (isMenuOpen == false) {
            $(".navMain").clearQueue().animate({
                right:'0rem'
            })
        }
    });
    //关闭按钮
    $('#closeBtn').click(function () {
        $(".navMain").animate({
                right: '-16rem'
          });
    })
})