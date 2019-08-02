//购物车商品 鼠标悬停 背景切换
$(() => {
    $(".sun_cart_content").find(".sun_cart_product").on("mouseenter", function () {
        $(this).addClass("current").parent().siblings().children(".sun_cart_product").removeClass("current");
    }).on("mouseleave", function () {
        $(".sun_cart_product").removeClass("current");
    })
})

//购物车 全选 选择时 商品全选
$(() => {
    $("#checkboxAll").on("click", function () {
        if ($(this).prop("checked")) {
            $("#checkboxPlat").prop("checked", true);
            $(".sun_cart_product").find("input").prop("checked", true);
        } else {
            $("#checkboxPlat").prop("checked", false);
            $(".sun_cart_product").find("input").prop("checked", false);
        }
    })
    $("#checkboxPlat").on("click", function () {
        if ($(this).prop("checked")) {
            $("#checkboxAll").prop("checked", true);
            $(".sun_cart_product").find("input").prop("checked", true);
        } else {
            $("#checkboxAll").prop("checked", false);
            $(".sun_cart_product").find("input").prop("checked", false);
        }
    })
    $(".sun_cart_content").on("click", ".sun_cart_product input", function () {
        let flag = true;
        $(".sun_cart_product").find("input").each((index, el) => {
            if (!$(el).prop("checked")) {
                flag = false;
            }
        })
        if (flag) {
            $("#checkboxAll").prop("checked", true);
            $("#checkboxPlat").prop("checked", true);
        } else {
            $("#checkboxAll").prop("checked", false);
            $("#checkboxPlat").prop("checked", false);
        }
    })
})

//增加商品数量
$(() => {
    // let obj = {1,1,1};
    // $(".sun_cart_product").each((index, el) => {
    //     obj[index] = $(this).prev(".cart_pro_number").text();
    //     $(el).on("click", ".sun_cart_add", function () {
    //         obj[index]++;
    //         $(this).prev(".cart_pro_number").text(obj[index]);
    //     })
    //     $(el).on("click", ".sun_cart_reduce", function () {
    //         obj[index]--;
    //         $(this).next(".cart_pro_number").text(obj[index]);
    //     })
    // })


    $(".sun_cart_product").on("click", ".sun_cart_add,.sun_cart_reduce", function () {
        let shrNum = 1;
        $(".cart_product").find(".sun_cart_add").on("click", function () {
            shrNum++;
            $(this).prev(".cart_pro_number").text(shrNum);
        })
        $(".cart_product").find(".sun_cart_reduce").on("click", function () {
            shrNum--;
            $(this).next(".cart_pro_number").text(shrNum);
        })
    })

})