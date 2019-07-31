const express=require("express");
const qs=require("querystring");

let server=express();
var useList=[];
//use 支持get 请求 又支持post 请求

//设置login
server.post("/login",(request,response,next)=>{
    var strParams="";
    request.on("data",(data)=>{
        strParams+=data.toString();
    })
    request.on("end",()=>{
        var useObj=qs.parse(strParams);
        var result=useList.some((el)=>{
            return (el.uname==useObj.uname&&el.upwd==useObj.upwd);
        })
        var resultObj={"msg":"登录失败",status:-1};
        if(result){
            resultObj["msg"]="登录成功";
            resultObj["status"]=1;
            resultObj["data"]=useObj;
        }
        response.json(resultObj)
    })
    // response.end("123")
})
server.post("/reg",(request,response,next)=>{
    var strParams="";
    request.on("data",(data)=>{
        strParams+=data.toString();
    })
    request.on("end",()=>{
        var useObj=qs.parse(strParams);
        var result=useList.some((el)=>{
            return el.uname==useObj.uname;
        })
        var resultObj={"msg":"注册失败",status:-1};
        if(!result){
            resultObj["msg"]="注册成功";
            resultObj["status"]=1;
            useList.push(useObj);
        }
        response.json(resultObj);
    })
    // response.end("reg")
})
server.listen(8080,function(){
    console.log("服务器启动完毕!")
})