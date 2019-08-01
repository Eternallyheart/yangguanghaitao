$(function () {
    $(".nav_list>a").on("mouseenter", function () {
        $(this).addClass("current").siblings().removeClass("current");
        $(".nav_menu1").eq($(this).index()).addClass("current").siblings().removeClass("current");
    }).on("mouseleave",function(){
        $(".nav_list>a").removeClass("current");
    })
    $(".nav_list").on("mouseleave", function () {
        $(".nav_list>a").removeClass("current");
        $(".nav_menu1").removeClass("current");
    });
})