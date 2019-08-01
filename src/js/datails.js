$(() => {
    $("#header").load("./header.html");
    $("#footer").load("./footer.html");
    $("#aside").load("./aside.html");
})
//详情页放大镜js
$(() => {
    $(".details_middleArea").height(($(".details_bigArea").height() / $(".details_bigImg").height()) * $(".details_middle").height());
    $(".details_middleArea").width(($(".details_bigArea").width() / $(".details_bigImg").width()) * $(".details_middle").width());

    let scale = parseInt($(".details_bigImg").width() / $(".details_bigArea").width());

    $(".details_middle").on("mouseenter", function (e) {
        $(".details_middleArea").show();
        $(".details_bigArea").show();

        $(".details_middle").on("mousemove", function (e) {
            let mX = e.pageX - $(this).offset().left - $(".details_middleArea").width() / 2;
            let mY = e.pageY - $(this).offset().top - $(".details_middleArea").height() / 2;

            if (mX <= 0) {
                mX = 0;
            }
            if (mX >= $(".details_middle").width() - $(".details_middleArea").width()) {
                mX = $(".details_middle").width() - $(".details_middleArea").width();
            }
            if (mY <= 0) {
                mY = 0;
            }
            if (mY >= $(".details_middle").height() - $(".details_middleArea").height()) {
                mY = $(".details_middle").height() - $(".details_middleArea").height();
            }

            $(".details_middleArea").css({
                left: mX,
                top: mY
            })

            $(".details_bigImg").css({
                left: -mX * scale,
                top: -mY * scale
            })
        })

    }).on("mouseleave", function () {
        $(".details_middleArea").hide();
        $(".details_bigArea").hide();
    })
})

//点击小图片切换大图片
$(() => {
    $(".details_allImg").find("img").on("click", function () {
        $(".details_middle").find("img").attr("src", $(this).attr("src"));
        $(".details_bigImg").find("img").attr("src", $(this).attr("src"));
    })
})

//选择地址 省份显示
$(() => {
    $(".area button").on("mouseenter", function () {
        $(this).addClass("current");
        $(".area_address").show();
    })
    $(".area").on("mouseleave", function () {
        $(this).children("button").removeClass("current");
    })
    $(".area_address").on("mouseenter",function(){
        $(".area").children("button").addClass("current");
    })
    $(".area_address").on("mouseleave", function () {
        $(".area").children("button").removeClass("current");
        $(".area_address").hide();
    })
})
//点击切换地址
$(()=>{
    $(".select_province a").on("click")
})