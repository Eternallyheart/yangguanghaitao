$(() => {
    $("form").on("submit",function(){
        $.ajax({
            url:'http://127.0.0.1:8080/api/login',
            data:$("form").serialize(),
            type:"post",
            dataType:"json",
            // header:{
            //     "Content-Type":'application/x-www-form-urlencoded',
            //     'x-Requested-with':"XMLHttpRequest"
            // }
        }).then((data)=>{
            console.log(data);
            // localStorage.setItem("userInfo",JSON.stringify(data.data));
            $.cookie("userInfo",JSON.stringify(data.data),{
                expires:10
            })
        })
        console.log($("form").serialize())
        return false;
    })
})