$(() => {
    $("form").on("submit", function () {
        if ($("form")[0].uemail.value) {
            $.ajax({
                url: 'http://127.0.0.1:8080/api/login',
                data: $("form").serialize(),
                type: "post",
                dataType: "json",
                // header:{
                //     "Content-Type":'application/x-www-form-urlencoded',
                //     'x-Requested-with':"XMLHttpRequest"
                // }
                beforeSend() {
                    $(".login_show").show();
                }
            }).then((data) => {
                $(".login_show").hide();
                if (data.status == 1) {
                    console.log(data.data)
                    // localStorage.setItem("userInfo",JSON.stringify(data.data));
                    $.cookie("userInfo", JSON.stringify(data.data), {
                        expires: 10
                    })
                    layer.msg(data.msg);
                    setTimeout(()=>{
                        window.location="./../index.html";
                    },1000)
                }
                layer.msg(data.msg);
            }, (err) => {
                console.log(err);
            })
        } else {
            layer.msg('请输入邮箱和密码');
        }
        return false;
    })
})