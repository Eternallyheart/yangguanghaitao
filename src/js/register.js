$(() => {
    //验证码
    $(".utest_txt").text(randomTest());
    $(".utest_btn a").on("click", () => {
        $(".utest_txt").text(randomTest());
    });

    function randomTest() {
        let str = "";
        for (let i = 0; i < 4; i++) {
            let e = Math.random();
            if (e > 0.3) {
                str += parseInt(Math.random() * 10);
            } else {
                str += String.fromCharCode(parseInt(Math.random() * 26 + 97));
            }
        }
        return str;
    };

    $.validator.addMethod("checkPwd", function (value, element, param) {
        return /^[a-z]+\w+$/ig.test(value);
    }, "字母开头");

    $.validator.addMethod("checkTest", function (value, element, param) {
        return value.toLowerCase() == $(".utest_txt").text();
    }, "请输入正确的验证码");

    $("form").validate({
        submitHandler() {
            $.ajax({
                url: "http://127.0.0.1:8080/api/reg",
                type: "post",
                dataType: "json",
                data: {
                    uemail: $("form")[0].uemail.value,
                    upwd: $("form")[0].upwd.value,
                    urelname: $("form")[0].urelname.value,
                    ubirthday: $("form")[0].ubirthday.value,
                    usex: $("form")[0].usex.value,
                },
                beforeSend: function () {
                    $(".register_show").show();
                }
            }).then(function (data) {
                $(".register_show").hide();
                if (data.status == -2) {
                    layer.msg(data.msg);
                    $("form")[0].uemail.focus();
                } else if (data.status == 1) {
                    // localStorage.setItem("userInfo", JSON.stringify(data.data));
                    // $.cookie("userInfo",JSON.stringify(data.data),{
                    //     expires:10
                    // })
                    layer.confirm("注册成功,是否登录", {
                        btn: ["好的", "稍等"]
                    }, function (index) {
                        layer.close(index);
                        setTimeout(() => {
                            window.location = "./../html/login.html";
                        }, 1000)
                    })
                } else {
                    console.log(data);
                }
            })
            return false;
        },
        rules: {
            uemail: {
                required: true,
                email: true,
            },
            upwd: {
                required: true,
                rangelength: [8, 20],
                checkPwd: true
            },
            upwd2: {
                required: true,
                equalTo: "#upwd",
            },
            urelname: {
                required: true
            },
            usex: {
                required: true
            },
            ubirthday: {
                required: true,
                dateISO: true
            },
            utest: {
                required: true,
                checkTest: true
            },
            ucheckbox: {
                required: true,
            }
        },
        messages: {
            uemail: {
                required: "邮箱必填",
                email: "请输入正确的邮箱",
            },
            upwd: {
                required: "请输入密码",
                rangelength: "密码{0}-{1}位"
            },
            upwd2: {
                required: "请确认密码",
                equalTo: "与上次密码相同",
            },
            urelname: {
                required: "真实名字不能为空"
            },
            usec: {
                required: "性别必选"
            },
            ubirthday: {
                required: "生日必填",
                dateISO: "例如:1990/01/01"
            },
            utest: {
                required: "验证码必填",
            },
            ucheckbox: {
                required: "请查看会员注册协议",
            }
        }
    })
})