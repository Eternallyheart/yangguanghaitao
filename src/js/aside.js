$(() => {
    $(".toolbar_person").on("mouseenter", function () {
        $(this).find("a").addClass("current").parent().siblings(".toolbar_person").children("a").removeClass("current");
        if ($(this).index() == 2) {
            $(".user").eq(1).show().stop().animate({
                right: 35
            }).siblings(".user").hide().stop().animate({
                right: -35
            });
            $(".user").eq(1).addClass("current").siblings(".user").removeClass("current");
        } else if ($(this).index() == 0) {
            $(".user").eq(0).show().stop().animate({
                right: 35
            }).siblings(".user").hide().stop().animate({
                right: -35
            });
            $(".user").eq(0).addClass("current").siblings(".user").removeClass("current");
        } else if ($(this).index() == 4) {
            $(".user").eq(2).show().stop().animate({
                right: 35
            }).siblings(".user").hide().stop().animate({
                right: -35
            });
            $(".user").eq(2).show().addClass("current").siblings(".user").removeClass("current");
        }
    })
    $(".toolbar").on("mouseleave", function () {
        $(".toolbar_person").find("a").removeClass("current");
        $(".user").hide().stop().animate({
            right: -35
        });
    })
    $(".toolbar_scroll").on("mouseenter", function () {
        $(".scroll").show().addClass("current").stop().animate({
            right: 220
        });
    }).on("mouseleave", function () {
        $(".toolbar_person").find("a").removeClass("current");
        $(".scroll").hide().removeClass("current").stop().animate({
            right: 150
        });
    })
})

$(() => {
    $(".toolbar_scroll").on("click", function () {
        $(window).scrollTop(0);
    })

    $(".toolbar_coupon").on("click", function () {
        $(this).find("a").css("backgroundColor","red");
        $("aside").stop().animate({
            right: 0
        });
        $(".user").stop().animate({
            right: -235
        }).hide();
        $(".scroll").stop().animate({
            right: 160
        }).hide();;
        return false;
    }).on("click",function(){
        $(this).off();
    })
    
})