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
    let strNum = 0;
    let strPrice = 0;
    $("#checkboxAll").on("click", function () {
        if ($(this).prop("checked")) {
            $("#checkboxPlat").prop("checked", true);
            $(".sun_cart_product").find("input").prop("checked", true);
            $(".cart_select_buy").addClass("cart_buy");
            $(".cart_product").each((index, el) => {
                strNum += $(el).find(".cart_pro_number").text() - 0;
                strPrice += $(el).find(".cart_product_price").text() * $(el).find(".cart_pro_number").text();
            })
            strPrice = strPrice.toFixed(2);
        } else {
            $("#checkboxPlat").prop("checked", false);
            $(".sun_cart_product").find("input").prop("checked", false);
            $(".cart_select_buy").removeClass("cart_buy");
            strNum = 0;
            strPrice = 0;
        }
        $(".cart_select_price").text("¥" + strPrice);
        $(".cart_select_num").text(strNum);
    })
    $("#checkboxPlat").on("click", function () {
        $("#checkboxAll").trigger('click');
    })
    $(".sun_cart_content").on("click", ".sun_cart_product input", function () {
        let flag = true;
        $(".sun_cart_product").find("input").each((index, el) => {
            if (!$(el).prop("checked")) {
                flag = false;
                $(".cart_select_buy").removeClass("cart_buy");
            } else {
                $(".cart_select_buy").addClass("cart_buy");
            }
        })
        if (flag) {
            $("#checkboxAll").prop("checked", true);
            $("#checkboxPlat").prop("checked", true);
        } else {
            $("#checkboxAll").prop("checked", false);
            $("#checkboxPlat").prop("checked", false);
        }
        if ($(this).prop("checked")) {
            strNum = $(this).parent().parent().find(".cart_pro_number").text() - 0;
            strPrice = $(this).parent().parent().find(".cart_product_price").text() * $(this).parent().parent().find(".cart_pro_number").text();
        } else {
            strPrice = 0;
            strNum = 0;
        }
        $(this).parents(".cart_product").siblings().each((index, el) => {
            if ($(el).find("input").prop("checked")) {
                strNum += $(el).find(".cart_pro_number").text() - 0;
                strPrice += $(el).find(".cart_product_price").text() * $(el).find(".cart_pro_number").text();
            }
        })
        strPrice = strPrice.toFixed(2);
        $(".cart_select_price").text("¥" + strPrice);
        $(".cart_select_num").text(strNum);
    })
})

//增加商品数量
$(() => {
    let obj = {};
    let strNum = 0;
    let strPrice = 0;
    $(".sun_cart_product").each((index, el) => {
        obj[index] = $(el).find(".cart_pro_number").text();
        $(el).on("click", ".sun_cart_add", function () {
            obj[index]++;
            $(this).prev(".cart_pro_number").text(obj[index]);
            if ($(this).parents(".cart_product").find("input").prop("checked")) {
                strNum = obj[index];
                strPrice = $(el).find(".cart_pro_number").text() * $(el).find(".cart_product_price").text();
                $(this).parents(".cart_product").siblings().each((index, el) => {
                    if ($(el).find("input").prop("checked")) {
                        strNum += $(el).find(".cart_pro_number").text() - 0;
                        strPrice += $(el).find(".cart_pro_number").text() * $(el).find(".cart_product_price").text();
                    }

                })
                strPrice = strPrice.toFixed(2);
                $(".cart_select_price").text("¥" + strPrice);
                $(".cart_select_num").text(strNum);
            }
        })
        $(el).on("click", ".sun_cart_reduce", function () {
            obj[index]--;
            if (obj[index] <= 1) {
                obj[index] = 1;
            }
            $(this).next(".cart_pro_number").text(obj[index]);
            if ($(this).parents(".cart_product").find("input").prop("checked")) {
                strNum = obj[index];
                strPrice = $(el).find(".cart_pro_number").text() * $(el).find(".cart_product_price").text();
                $(this).parents(".cart_product").siblings().each((index, el) => {
                    if ($(el).find("input").prop("checked")) {
                        strNum += $(el).find(".cart_pro_number").text() - 0;
                        strPrice += $(el).find(".cart_pro_number").text() * $(el).find(".cart_product_price").text();
                    }

                })
                strPrice = strPrice.toFixed(2);
                $(".cart_select_price").text("¥" + strPrice);
                $(".cart_select_num").text(strNum);
            }
        })
    })
})

$(() => {
    //单独进行删除操作
    $(".sun_cart_content").on("click", ".sun_cart_delete a", function () {
        $(this).parent().parent().parent().remove();
        if ($(".cart_product").length == 0) {
            $("#checkboxAll").prop("checked", false);
            $("#checkboxPlat").prop("checked", false);
        }
        delete_break();
    })

    //选择删除操作
    $(".delete_select").on("click", function () {
        $(".cart_product").each((index, el) => {
            if ($(el).find("input").prop("checked")) {
                $(el).remove();
                $("#checkboxAll").prop("checked", false);
                $("#checkboxPlat").prop("checked", false);
            }
        })
        delete_break();
    })

    //判断是否有商品
    if ($(".cart_product").length == 0) {
        $(".sun_cart>main>div").addClass("sun_cart_main");
        $(".cart_none").show();
    } else {
        //加载就显示全部选中
        $("#checkboxAll").trigger('click');
        $(".cart_none").hide();
    }

    function delete_break() {
        if ($(".cart_product").length == 0) {
            $(".sun_cart>main>div").addClass("sun_cart_main");
            $(".cart_none").show();
        } else {
            $(".cart_none").hide();
            let num = 0;
            let strPrice = 0;
            $(".cart_product").each((index, el) => {
                if ($(el).find("input").prop("checked")) {
                    num += $(el).find(".cart_pro_number").text() - 0;
                    strPrice += $(el).find(".cart_pro_number").text() * $(el).find(".cart_product_price").text();
                }
            })
            strPrice = strPrice.toFixed(2);
            $(".cart_select_price").text("¥" + strPrice);
            $(".cart_select_num").text(num);
        }
    }
})

//统计选中的商品数量
// $(() => {
//点击增加商品数量  没效果
// $(".cart_product").each((index, el) => {
//     if ($(el).find("input").prop("checked")) {
//         $(el).on("click", ".sun_cart_number", function () {
//             strNum = $(this).children(".cart_pro_number").text() - 0;
//             $(this).parents(".cart_product").siblings().find(".cart_pro_number").each((index, el) => {
//                 strNum += $(el).text() - 0;
//             })
//             $(".cart_select_num").text(strNum);
//         })
//     }
// })

//点击增加商品数量  不管是否选中
// $(".sun_cart_content").on("click", ".sun_cart_number", function () {
//     strNum = $(this).children(".cart_pro_number").text() - 0;
//     $(this).parents(".cart_product").siblings().find(".cart_pro_number").each((index, el) => {
//         strNum += $(el).text() - 0;
//     })
//     $(".cart_select_num").text(strNum);
//     console.log(strNum)
// })

// $(".cart_select_num")
// })