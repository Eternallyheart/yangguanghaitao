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
        url: "./../../api/goods"
    }, (data) => {
        const goodsList = data;
        let arr = [];
        goodsList.forEach((el) => {
            let strHtml = `<figure>
        <a href="./datails.html?pId=${el.pId}" target="_new"><img src="./../../${el.pImg[0]}" alt=""></a>
        <figcaption>
                <p>
                    <a href="./datails.html?pId=${el.pId}" target="_new">${el.pName}</a>
                </p>
                <li>
                    <b class="pPrice">¥${el.pPrice}</b><span class="pOldPrice">¥${el.pOldPrice}</span>
                </li>
                <li class="substance_none">
                    <span>${el.pId}</span><span  class="pNum">${el.pNum}</span><span  class="pPerson">${el.pPerson}</span><span  class="pTime">${el.pTime}</span>
                </li>
        </figcaption>
        </figure>`;
            $(".category_substance").append($(strHtml));
            arr.push(el.pNum - 0);
        })

        arr.sort((n1, n2) => {
            return n2 - n1;
        }).splice(6)
        let obj = [];
        for (let i = 0; i < arr.length; i++) {
            let result = goodsList.filter((el) => {
                return el.pNum == arr[i];
            })
            obj.push(result);
        }
        let strRank = ``;
        obj.forEach((el, index) => {
            if (index == 0) {
                strRank += `<li class="rank_firset">
                <span></span>
                <a href="./datails.html?pId=${el[0].pId}">${el[0].pName}</a>
                <em class="firts_price">¥${el[0].pPrice}</em>
                <input class="rank_none" data-pImg=${el[0].pImg[0]} />
                </li>`;
            } else {
                strRank += `<li><span></span><a href="./datails.html?pId=${el[0].pId}">${el[0].pName}</a></li>`;
            }
        })
        $(".rank_list").append(strRank);

        $(".rank_firset").css({
            background: `url(./../../${$(".rank_none").data("pimg")}) no-repeat 25px 10px/65px`
        })

        $(".category_substance").children("figure").on("click", "a", function (el) {
            let saveList = JSON.parse(localStorage.getItem("historyList") || '[]');
            let saveObj = {
                url: $(el.delegateTarget).find("img").attr("src"),
                pName: $(el.delegateTarget).find("p a").text(),
                pPrice: $(el.delegateTarget).find(".pPrice").text(),
                pOldPrice: $(el.delegateTarget).find(".pOldPrice").text(),
                href: $(el.delegateTarget).find("a").attr("href")
            };
            saveList.unshift(saveObj);
            saveList.splice(3);
            localStorage.setItem("historyList", JSON.stringify(saveList));
        })
    })

    let cls = [".pPrice", ".pNum", ".pPerson", ".pTime"];

    $(".category_search>li>a").each((index, el) => {
        let flag = true;
        $(el).on('click', function () {
            if (flag) {
                flag = false;
                $(this).find("i").removeClass("icon-web-icon-1").addClass("icon-xiajiang");
            } else {
                flag = true;
                $(this).find("i").removeClass("icon-xiajiang").addClass("icon-web-icon-1");
            }
            $(this).addClass("redColor").siblings().removeClass("redColor");
            sort(cls[index], flag);
        })
    })

    function sort(cls, flag) {
        let tmpArr = [];
        if (cls == ".pPrice") {
            let arr = $(cls).text().split("¥");
            arr.shift();
            tmpArr = arr.map(el => {
                return (el - 0);
            })
        } else {
            $(cls).each((index, el) => {
                tmpArr.push($(el).text() - 0);
            })
        }
        let $htmls = [];
        for (let i = 0; i < tmpArr.length; i++) {
            $htmls.push($(".category_substance").children("figure")[i].innerHTML);
        };
        if (flag) {
            for (let i = 0; i < tmpArr.length - 1; i++) {
                for (let j = i + 1; j < tmpArr.length; j++) {
                    if (tmpArr[i] >= tmpArr[j]) {
                        change(i, j);
                    }
                }
            }
        } else {
            for (let i = 0; i < tmpArr.length - 1; i++) {
                for (let j = i + 1; j < tmpArr.length; j++) {
                    if (tmpArr[i] <= tmpArr[j]) {
                        change(i, j);
                    }
                }
            }
        }
        //定义并初始化数组用于存储li的内容
        normal();

        function change(i, j) {
            let arr2 = tmpArr[i];
            tmpArr[i] = tmpArr[j];
            tmpArr[j] = arr2;
            let strHtml = $htmls[i];
            $htmls[i] = $htmls[j];
            $htmls[j] = strHtml;
        }

        //DOM操作（从大到小排序）
        function normal() {
            $(".category_substance").children().remove();
            let strHtml = "";
            for (var i = 0; i < $htmls.length; i++) {
                strHtml += '<figure>' + $htmls[i] + '</figure>';
            }
            $(".category_substance").append(strHtml);
        }
    }


    if (localStorage.getItem("historyList")) {
        let historyObj = JSON.parse(localStorage.getItem("historyList") || '[]');
        let historyHtml = ``;
        historyObj.forEach(el => {
            historyHtml += `<figure>
        <a href="${el.href}" target="_blank"><img src="${el.url}" alt=""></a>
        <figcaption>
            <p>
                <a href="${el.href}">${el.pName}</a>
            </p>
            <li>
                <b>${el.pPrice}</b><span>${el.pOldPrice}</span>
            </li>
        </figcaption>
        </figure>`
        })
        $(".browse_ware").append(historyHtml);
    }

})