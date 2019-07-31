//1.引入express mvc 框架
const express=require("express");
const bodyParser=require("body-parser");
//2.创建服务
const server=express();
server.use(bodyParser({
    extend:true,
}));
server.use(bodyParser.urlencoded());//application/x-www-form-...
// server.use(bodyParser.text());//纯文本
// server.use(bodyParser.json());//json
// server.use(bodyParser.raw());//二进制

var useList=[];
//4.设置一个虚拟路径

server.post("/api",(request,response,next)=>{
    
    console.log("根路径");
    response.end('123');
    next();
})
//next 干啥的
//根据路径去访问下一个
server.post("/api/reg",(request,response,next)=>{
    
    var userObj=request.body;
    var result=useList.some((el)=>{
        return el.uname==userObj.uname;
    })
    var resultObj={"msg":"用户名已注册","status":-1};
    if(!result){
        useList.push(userObj);
        resultObj["msg"]="注册成功";
        resultObj["status"]=1;
        var newObj=Object.assign({},userObj);
        delete(newObj["upwd"]);
        resultObj["data"]=newObj;
    }
    response.json(resultObj);
    // response.end();
})
//login
server.post("/api/login",(request,response,next)=>{
    
    var userObj=request.body;
    var result=useList.some((el)=>{
        return (el.uname==userObj.uname&&el.upwd==userObj.upwd);
    })
    var resultObj={"msg":"登录失败","status":-1};
    if(result){
        resultObj["msg"]="登录成功";
        resultObj["status"]=1;
    }
    response.json(resultObj);
    // response.end();
})
//3.设置监听
server.listen(8080,()=>{
    console.log("服务启动");
})