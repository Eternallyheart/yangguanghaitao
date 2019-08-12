//页面加载就显示读取登录的用户的购物车列表
$(() => {
    async function load() {
        let result = await $.get("./../../api/getCart", {
            uid: JSON.parse($.cookie("userInfo"))[0].uid,
            token: JSON.parse($.cookie("token"))
        })

        let strHtml = ``;
        result.forEach(el => {
            strHtml += `<div class="cart_product">
                <div class="sun_cart_product">
                    <div><input type="checkbox" data-pId=${el.pId}></div>
                    <div class="sun_cart_goods">
                        <ul><a href="./../../src/html/datails.html?pId=${el.pId}" target="_new"><img src="./../../${el.pImg}" alt=""></a></ul>
                        <ul>
                            <a href="./../../src/html/datails.html?pId=${el.pId}" target="_new">${el.pName}</a>
                            <li>包装规格：<span>10号4瓶</span>;</li>
                            <li>支持自提</li>
                        </ul>
                    </div>
                    <div class="sun_cart_price">¥<span class="cart_product_price">${el.pPrice}</span></div>
                    <div class="sun_cart_price sun_cart_number">
                        <span class="sun_cart_reduce">-</span>
                        <input class="cart_pro_number" value="${el.pNum}">
                        <span class="sun_cart_add">+</span>
                    </div>
                    <div class="sun_cart_price sun_cart_delete"><a href="javascript:;">删除</a></div>
                </div>
                <div class="line"></div>
            </div>`
        })
        $(".sun_cart_content").append(strHtml);

        //判断是否有商品
        if ($(".cart_product").length == 0) {
            $(".sun_cart>main>div").addClass("sun_cart_main");
            $(".cart_none").show();
        } else {
            //加载就显示全部选中
            $("#checkboxAll").trigger('click');
            $(".cart_none").hide();
        }

        //增加商品数量
        let obj = {};
        let strNum = 0;
        let strPrice = 0;
        $(".cart_product").each((index, el) => {
            obj[index] = $(el).find(".cart_pro_number").val();
            $(el).find(".cart_pro_number").on("input", function () {
                obj[index] = $(el).find(".cart_pro_number").val() - 0;
                autoPrice(el);
                sendAjax();
            })
            $(el).on("click", ".sun_cart_add", function () {
                obj[index]++;
                $(this).prev(".cart_pro_number").val(obj[index]);
                autoPrice(el);
                sendAjax();
            })
            $(el).on("click", ".sun_cart_reduce", function () {
                obj[index]--;
                if (obj[index] <= 0) {
                    obj[index] = 1;
                    return;
                }
                $(this).next(".cart_pro_number").val(obj[index]);
                autoPrice(el);
                sendAjax();
            })

            function sendAjax() {
                let saveObj = {
                    uId: JSON.parse($.cookie("userInfo"))[0].uid,
                    pId: $(el).find("input[type=checkbox]").data("pid"),
                    pNum: obj[index],
                    pTime: Date.now(),
                    token: JSON.parse($.cookie("token"))
                }
                $.ajax({
                    url: "./../../api/modify",
                    type: "post",
                    // headers: {
                    //     "token": $.cookie("token"),
                    // },
                    dataType: "json",
                    data: saveObj,
                }).done((data) => {
                    if (data.affectedRows >= 1) {
                        layer.msg("修改成功", {
                            icon: 1
                        });
                    }
                })
            }

            function autoPrice(el) {
                if ($(el).find("input[type=checkbox]").prop("checked")) {
                    strNum = obj[index];
                    strPrice = $(el).find(".cart_pro_number").val() * $(el).find(".cart_product_price").text();
                    $(el).siblings().each((index, el) => {
                        if ($(el).find("input[type=checkbox]").prop("checked")) {
                            strNum += $(el).find(".cart_pro_number").val() - 0;
                            strPrice += $(el).find(".cart_pro_number").val() * $(el).find(".cart_product_price").text();
                        }
                    })
                    strPrice = strPrice.toFixed(2);
                    $(".cart_select_price").text("¥" + strPrice);
                    $(".cart_select_num").text(strNum);
                }
            }
        })

        //单独进行删除操作
        $(".sun_cart_content").on("click", ".sun_cart_delete a", function () {
            let saveObj = {
                uId: JSON.parse($.cookie("userInfo"))[0].uid,
                pId: $(this).parents(".cart_product").find("input[type=checkbox]").data("pid"),
                token: JSON.parse($.cookie("token"))
            }
            layer.confirm("确定要删除该商品码?", {
                btn: ["yes", "no"]
            }, (index) => {
                layer.close(index);
                $(this).parent().parent().parent().remove();
                $.ajax({
                    url: "./../../api/deleteCart",
                    type: "post",
                    // headers: {
                    //     "token": $.cookie("token"),
                    // },
                    data: saveObj,
                }).done((data) => {
                    if (data.affectedRows >= 1) {
                        layer.msg("删除成功");
                    }
                    if ($(".cart_product").length == 0) {
                        $("#checkboxAll").prop("checked", false);
                        $("#checkboxPlat").prop("checked", false);
                    }
                    delete_break();
                })
            })
        })

        //选择删除操作
        $(".delete_select").on("click", function () {
            layer.confirm("确定要删除选中的商品码?", {
                btn: ["yes", "no"]
            }, (index) => {
                layer.close(index);
                $(".cart_product").each((index, el) => {
                    let saveObj = {
                        uId: JSON.parse($.cookie("userInfo"))[0].uid,
                        pId: null,
                        token: JSON.parse($.cookie("token"))
                    }
                    if ($(el).find("input[type=checkbox]").prop("checked")) {
                        saveObj.pId = $(el).find("input[type=checkbox]").data("pid");
                        $(el).remove();
                        $("#checkboxAll").prop("checked", false);
                        $("#checkboxPlat").prop("checked", false);
                    }
                    $.ajax({
                        url: "./../../api/deleteCart",
                        type: "post",
                        // headers: {
                        //     "token": $.cookie("token"),
                        // },
                        data: saveObj,
                    }).done((data) => {
                        if (data.affectedRows >= 1) {
                            layer.msg("删除成功");
                            delete_break()
                        }
                    })
                });
            })

        })

        function delete_break() {
            if ($(".cart_product").length == 0) {
                $(".sun_cart>main>div").addClass("sun_cart_main");
                $(".cart_none").show();
            } else {
                $(".cart_none").hide();
                let num = 0;
                let strPrice = 0;
                $(".cart_product").each((index, el) => {
                    if ($(el).find("input[type=checkbox]").prop("checked")) {
                        num += $(el).find(".cart_pro_number").val() - 0;
                        strPrice += $(el).find(".cart_pro_number").val() * $(el).find(".cart_product_price").text();
                    }
                })
                strPrice = strPrice.toFixed(2);
                $(".cart_select_price").text("¥" + strPrice);
                $(".cart_select_num").text(num);
            }
        }
    };
    load();
})



//购物车商品 鼠标悬停 背景切换
$(() => {
    $(".sun_cart_content").on("mouseenter", ".sun_cart_product", function () {
        $(this).addClass("current").parent().siblings().children(".sun_cart_product").removeClass("current");
    }).on("mouseleave", ".sun_cart_product", function () {
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
                strNum += $(el).find(".cart_pro_number").val() - 0;
                strPrice += $(el).find(".cart_product_price").text() * $(el).find(".cart_pro_number").val();
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

    $(".sun_cart_content").on("click", ".sun_cart_product input[type]", function () {
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
            strNum = $(this).parent().parent().find(".cart_pro_number").val() - 0;
            strPrice = $(this).parent().parent().find(".cart_product_price").text() * $(this).parent().parent().find(".cart_pro_number").val();
        } else {
            strPrice = 0;
            strNum = 0;
        }
        $(this).parents(".cart_product").siblings().each((index, el) => {
            if ($(el).find("input").prop("checked")) {
                strNum += $(el).find(".cart_pro_number").val() - 0;
                strPrice += $(el).find(".cart_product_price").text() * $(el).find(".cart_pro_number").val();
            }
        })
        strPrice = strPrice.toFixed(2);
        $(".cart_select_price").text("¥" + strPrice);
        $(".cart_select_num").text(strNum);
    })
})