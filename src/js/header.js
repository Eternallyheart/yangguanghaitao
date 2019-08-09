
$(function () { 
    $(".nav_list>a").on("mouseenter", function () {
        $(this).addClass("current").siblings().removeClass("current");
        $(".nav_menu1").eq($(this).index()).addClass("current").siblings().removeClass("current");
    }).on("mouseleave", function () {
        $(".nav_list>a").removeClass("current");
    })
    $(".nav_list").on("mouseleave", function () {
        $(".nav_list>a").removeClass("current");
        $(".nav_menu1").removeClass("current");
    }); 
 
    $.ajax({
        url: "http://127.0.0.1:8080/api/getCart",
        type: "get",
        dataType: "json",
        data: {
            uid: JSON.parse(localStorage.getItem("userInfo"))[0].uid,
        },
    }).done(data => {
        let strNum=0;
        data.forEach(el=>{
            strNum+=el.pNum-0;
        })
        $(".cart_num").text(strNum);
    })
    
})  