const express=require("express");
// const bodyParser=require("body-parser");
const myParser=require("./modules/myBodyParser");
const app=express();
// app.use(bodyParser.urlencoded({
//     extended:false
// }));
app.use(myParser.urlencoded());
app.use("/api/login",function(req,res,next){
    // res.json(myParser);
    console.log(req.body)
});
app.listen(8080);