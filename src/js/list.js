$(()=>{
    $("#header").load("./header.html");
    $("#footer").load("./footer.html");
    $("#aside").load("./aside.html");
})

//清除我的浏览记录
$(()=>{
    $(".delete_history").on("click",function(){
        $(this).parent().prev("ul").children().remove();
    })
})

//