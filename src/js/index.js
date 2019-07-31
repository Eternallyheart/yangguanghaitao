$(() => {
    $("#header").load("./html/header_index.html");
    $("#footer").load("./html/footer_index.html");
    $("#aside").load("./html/aside_index.html");
    $(".nav_list>a").on("mouseenter", function () {
        $(this).addClass("current").siblings().removeClass("current");
        $(".nav_menu1").eq($(this).index()).addClass("current").siblings().removeClass("current");
    })
    $(".nav_list").on("mouseleave", function () {
        $(".nav_list>a").removeClass("current");
        $(".nav_menu1").removeClass("current");
    });
})
//banner 轮播图
$(() => {
    let index = 0;
    function autoPlay() {
        index++;
        if (index >= 5) {
            index = 0;
        }
        $(".in_banner>main>li").eq(index).addClass("show").fadeIn().siblings().removeClass("show").fadeOut();
        $(".banner_show>span").eq(index).addClass("show").siblings().removeClass("show");
    }
    let timer = setInterval(autoPlay, 3000);
    $(".banner_show>span").on("click", function () {
        console.log($(this).index())
        clearInterval(timer)
        index = $(this).index()-1;
        autoPlay();
        timer = setInterval(autoPlay, 3000);
    })
})
//.侧边栏鼠标悬停改变背景
$(()=>{
    $(".fi_pi_right>ul>li").on("mouseenter",function(){
        $(this).addClass("current").siblings().removeClass("current");
    }).on("mouseleave",()=>{
        $(".fi_pi_right>ul>li").removeClass("current");
    })
})
//中间figure块鼠标悬停效果
$(()=>{
    $(".fi_pi_main>figure").on("mouseenter",function(){
        $(this).addClass("current").siblings().removeClass("current");
    })
})