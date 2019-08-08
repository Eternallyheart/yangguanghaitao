$(() => {
    $("#header").load("./header.html");
    $("#footer").load("./footer.html");
    $("#aside").load("./aside.html");
})

//清除我的浏览记录
$(() => {
    $(".delete_history").on("click", function () {
        $(this).parent().prev("ul").children().remove();
    })
})

//加载就读取数据形成列表
$(() => {
    $.get({
        url: "http://127.0.0.1:8080/api/goods"
    }, (data) => {
        const goodsList = data;
        goodsList.forEach((el) => {
            var strHtml = `<figure>
        <a href="./datails.html?pId=${el.pId}" target="_new"><img src="http://127.0.0.1:8080/${el.pImg[0]}" alt=""></a>
        <figcaption>
                <p>
                    <a href="./datails.html?pId=${el.pId}" target="_new">${el.pName}</a>
                </p>
                <li>
                    <b>¥${el.pPrice}</b><span>¥${el.pOldPrice}</span>
                </li>
                <li class="substance_none">
                    <span>${el.pId}</span><span>${el.pNum}</span><span>${el.pPerson}</span><span>${el.pTime}</span>
                </li>
        </figcaption>
        </figure>`;
            $(".category_substance").append($(strHtml));
        })
    })
})