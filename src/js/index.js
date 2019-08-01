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
        console.log($(this).index());
        clearInterval(timer);
        index = $(this).index()-1;
        autoPlay();
        timer = setInterval(autoPlay, 3000);
    })
    $(".in_banner>main").on("mouseenter",function(){
        clearInterval(timer);
    }).on("mouseleave",function(){
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
    }).on("mouseleave",function(){
        $(".fi_pi_main>figure").removeClass("current");
    })
})
//skin_care 侧边栏点击移动切换链接效果
$(()=>{
    let index=0;
    $(".skin_care>.fi_pi_right span").eq(0).on("click",function(){
        index++;
        if(index>=$(".skin_care .fi_pi_move>li").length-4){
            index=$(".skin_care .fi_pi_move>li").length-4;
        }
        $(this).nextAll(".fi_pi_box").children(".fi_pi_move").animate({top:-60*index});
    })
    $(".skin_care>.fi_pi_right span").eq(1).on("click",function(){
        index--;
        if(index<=0){
            index=0;
        }
        $(this).next().children(".fi_pi_move").animate({top:-60*index});
    })
})
$(()=>{
    let index=0;
    $(".skin_care>.fi_pi_right span").eq(2).on("click",function(){
        index++;
        if(index>=$(".skin_care .fi_pi_move>li").length-4){
            index=$(".skin_care .fi_pi_move>li").length-4;
        }
        $(this).nextAll(".fi_pi_box").children(".fi_pi_move").animate({top:-60*index});
    })
    $(".skin_care>.fi_pi_right span").eq(3).on("click",function(){
        index--;
        if(index<=0){
            index=0;
        }
        $(this).next().children(".fi_pi_move").animate({top:-60*index});
    })
})
//mall_infor晒单轮播图
$(()=>{
    let index=0;
    function newAutoPlay(){
        index++;
        if(index>=$(".mall_list_all>li").length-2){
            index=0;
        }
        $(".mall_list_all").animate({left:index*-200});
    }
    let newTimer = setInterval(newAutoPlay, 3000);
    $(".list_left").on("click", function () {
        clearInterval(newTimer);
        index-=2;
        if(index==-2){
            index=-1;
        }
        newAutoPlay();
        newTimer = setInterval(newAutoPlay, 3000);
    })
    $(".list_right").on("click", function () {
        clearInterval(newTimer);
        newAutoPlay();
        newTimer = setInterval(newAutoPlay, 3000);
    })
    $(".mall_list_all").on("mouseenter",function(){
        clearInterval(newTimer);
    }).on("mouseleave",function(){
        newTimer = setInterval(newAutoPlay, 3000);
    })
})