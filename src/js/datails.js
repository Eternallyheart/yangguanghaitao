$(() => {
    $("#header").load("./header.html");
    $("#footer").load("./footer.html");
    $("#aside").load("./aside.html");
    $("img").lazyload({
        placeholder: "./../images/loding.gif",
        effect: "fadeIn",
        threshold: 200
    })
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
    $(".details_allImg").find("img").on("mouseenter", function () {
        $(".details_middle").find("img").attr("src", $(this).attr("src"));
        $(".details_bigImg").find("img").attr("src", $(this).attr("src"));
    })
})

//点击收藏
$(() => {
    $(".save_product").on("click", function () {})
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
    $(".area_address").on("mouseenter", function () {
        $(".area").children("button").addClass("current");
    })
    $(".area_address").on("mouseleave", function () {
        $(".area").children("button").removeClass("current");
        $(".area_address").hide();
    })
})
//点击切换地址
$(() => {
    $(".select_province a").on("click", function () {
        let strProvince = $(this).text();
        $(".province").html(strProvince);
        $(".select_address").text(strProvince);
        $(this).parent().hide();
        $(this).parent().next("ul").show().siblings("ul").hide();
        $(".select_city a").on("click", function () {
            let strCity = $(this).text();
            $(".city").html(strCity);
            $(".select_address").text(strProvince + " " + strCity);
            $(this).parent().hide();
            $(this).parent().next("ul").show().siblings("ul").hide();

            $(".select_county a").on("click", function () {
                let strCounty = $(this).text();
                $(".county").html(strCounty);
                $(".select_address").text(strProvince + " " + strCity + " " + strCounty);
                $(this).parent().hide();
                $(this).parent().next("ul").show().siblings("ul").hide();

                $(".select_road a").on("click", function () {
                    let strRoad = $(this).text();
                    $(".road").html(strRoad);
                    $(".select_address").text(strProvince + " " + strCity + " " + strCounty + " " + strRoad);
                    $(this).parent().hide();

                    $(".area button").on("mouseenter", function () {
                        $(".select_province").show();
                        $(".area_address").find("span").eq(0).addClass("current");
                    })

                    $(".area_address").find("span").on("click", function () {
                        $(this).addClass("current").siblings().removeClass("current");
                        $(".area_address>ul").eq($(this).index()).show().siblings("ul").hide();
                    })
                })
            })
        })
    })
})
//点击增加购买数量
$(() => {
    let buyNum = $(".det_ch_cart").val();
    $(".det_ch_cart").on("change", function () {
        buyNum = $(".det_ch_cart").val();
    })
    $(".det_ch_add").on("click", function () {
        buyNum++;
        if (buyNum >= $(".det_ch_stock").text()) {
            buyNum = $(".det_ch_stock").text();
        }
        $(".det_ch_cart").val(buyNum);
    })
    $(".det_ch_reduce").on("click", function () {
        buyNum--;
        if (buyNum <= 1) {
            buyNum = 1;
        }
        $(".det_ch_cart").val(buyNum);
    })
})
//点击购买


//点击加入购物车


//热销推荐 鼠标悬停 显示分享
$(() => {
    $(".details_banner").find("figure").on("mouseenter", function () {
        $(this).append($(".banner_share"));
        $(".banner_share").show();
    }).on("mouseleave", function () {
        $(this).remove($(".banner_share"));
        $(".banner_share").hide();
    })
})

//内容图片 鼠标悬停 显示分享
$(() => {
    $(".su_con_pro_img>div").on("mouseenter", function () {
        $(this).append($(".content_share"));
        $(".content_share").show();
    }).on("mouseleave", function () {
        $(this).stop().remove($(".content_share"));
        $(".content_share").hide();
    })
})

//相关商品 鼠标悬停 显示分享
$(() => {
    $(".det_re_product").find("figure").on("mouseenter", function () {
        $(this).append($(".relate_share"));
        $(".relate_share").show();
    }).on("mouseleave", function () {
        $(this).remove($(".relate_share"));
        $(".relate_share").hide();
    })
})

//产品介绍 tab栏切换
$(() => {
    $(".pro_su_title").find("li").on("click", function () {
        $(this).addClass("current").siblings().removeClass("current");
        $(".pro_su_content>div").eq($(this).index()).addClass("current").siblings().removeClass("current");
    })
    $(".su_con_app_title").find("li").on("click", function () {
        $(this).addClass("show").siblings().removeClass("show");
        $(".su_con_app_content>ul").eq($(this).index()).addClass("show").siblings().removeClass("show");
    })
})

//滑动条滑动 导航栏固定
$(() => {
    $(document).scroll("load", function () {
        let y = $(this).scrollTop();
        if (y >= 780) {
            $(".pro_su_title").css({
                position: "fixed",
                top: 0
            })
            $(".pro_su_content").css("marginTop", $(".pro_su_title").height())
        } else {
            $(".pro_su_title").css("position", "static");
            $(".pro_su_content").css("marginTop", 0);
        }
    })
})

//商品评价
$(() => {
    $(".all_app_num").text($(".app_content_all>li").length);
    $(".good_app_num").text($(".app_content_good>li").length);
    $(".cen_app_num").text($(".app_content_center>li").length);
    $(".bad_app_num").text($(".app_content_bad>li").length);
    $(".img_app_num").text($(".app_content_img>li").length);
    $(".su_app_commentary").text(($(".app_content_good>li").length + $(".app_content_img>li").length) / $(".app_content_all>li").length * 100 + '%');
    $(".good_appraise").text($(".su_app_commentary").text());
    $(".good_app_meter").attr("value", ($(".app_content_good>li").length + $(".app_content_img>li").length) / $(".app_content_all>li").length * 100);
    $(".center_appraise").text(($(".cen_app_num").text() / $(".all_app_num").text()) * 100 + '%');
    $(".bad_appraise").text(($(".bad_app_num").text() / $(".all_app_num").text()) * 100 + '%');
    $(".cen_app_meter").attr("value", $(".cen_app_num").text() / $(".all_app_num").text() * 100);
    $(".bad_app_meter").attr("value", ($(".bad_app_num").text() / $(".all_app_num").text() * 100).toFixed(1));
    $(".appraise_num").text($(".all_app_num").text());
    $(".record_num").text($(".all_app_num").text());
    let result = 0;
    $(".pro_sale_num").each((index, el) => {
        result += $(el).text()-0;
    })
    $(".sale_num").text(result);
})

//商品评价翻页
$(()=>{
    $(".page_record_num").each((index,el)=>{
        $(el).text($(el).parent().parent().parent().children("li").length)
    })
})

