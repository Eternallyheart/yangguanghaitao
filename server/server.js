//1.引入 express 框架 body-parser cookie-session cookie-parser
import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';

import {router} from './routes/apiRouter';

//2.创建服务
const app = express();

//4.使用中间件 
app.use(cookieParser("userker.cn"));

//5.使用cookieSession 加密
app.use(cookieSession({
    name: "userker.cn",
    keys: ["aaa", "bbb", "ccc"],
    maxAge: 1000 * 20 * 60
}))

//6.使用bodyParser 转码
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//9.搭建一个静态资源服务器
app.use(express.static("./public"));

//7.配置跨域
app.all("*", (req, res, next) => {
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header("Access-Control-Allow-Origin", "*");
    next();
})

//8.引入保安大爷
app.use("/api", router);

//3.监听服务
app.listen(8080, () => {
    console.log("服务启动完成");
})
