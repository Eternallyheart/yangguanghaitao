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