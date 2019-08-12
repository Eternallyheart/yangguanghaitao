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
    if (JSON.parse(localStorage.getItem("userInfo"))) {
        $.ajax({
            url: "./../../api/getCart",
            type: "get",
            dataType: "json",
            headers: {
                token: JSON.parse(localStorage.getItem("token"))
            },
            data: {
                uid: JSON.parse(localStorage.getItem("userInfo") || '[]')[0].uid,
                // token: JSON.parse(localStorage.getItem("token"))
            },
        }).done(data => {
            let strNum = 0;
            data.forEach(el => {
                strNum += el.pNum - 0;
            })
            $(".cart_num").text(strNum);
        })
    }
})