//1.引入express框架
import express from 'express';
import db from './../modules/DBHelper';
import fs from 'fs';

//2.创建保安
let router = express.Router();

//6.创建检测是否 已经注册 连接
router.post("/checkEmail", (req, res, next) => {
	//req.query  get请求
	//req.body   post请求
	let userStr = req.body;
	let sql = 'SELECT COUNT(*) AS count FROM userinfo WHERE uemail=? '
	let params = [userStr.uemail];
	db.queryAsync(sql, params).then((data) => {
		if (data[0].count >= 1) {
			res.end("false");
		} else {
			res.end("true");
		}
	})
})

//3.创建登录连接
router.post("/login", (req, res, next) => {
	let sql = "SELECT `uemail`,`urelname`,`usex`,`ubirthday` FROM userinfo WHERE uemail=? AND upwd=?";
	let params = [req.body.uemail, req.body.upwd];
	let resultObj = {
		msg: '登录失败',
		status: -1,
	}
	db.query(sql, params).then((result) => {
		if (result.length == 1) {
			resultObj.msg = '登录成功';
			resultObj.status = 1;
			resultObj.data = result;
		} else {
			resultObj.msg = '用户名或密码错误';
			resultObj.status = -2;
		}
		res.json(resultObj);
	}, (err) => {
		resultObj.err = err;
		resultObj.status = -3;
		res.json(resultObj);
	})
})

//4.创建注册连接
router.post("/reg", (req, res, next) => {
	let sql = 'INSERT INTO userinfo (`uemail`,upwd,usex,urelname,ubirthday) VALUES (?,?,?,?,?)'
	let params = [req.body.uemail, req.body.upwd, req.body.usex, req.body.urelname, req.body.ubirthday];
	let resultObj = {
		msg: '注册失败',
		status: -1
	}
	db.query(sql, params).then((data) => {
		if (data.affectedRows == 1) {
			resultObj.msg = '注册成功';
			resultObj.status = 1;
			res.json(resultObj);
		} else {
			resultObj.data = data;
			resultObj.status = -2;
			res.json(resultObj);
		}
	}, (err) => {
		resultObj.err = err;
		res.json(resultObj);
	})
})

//7.创建连接获取所有的数据
router.get("/goods", (req, res, next) => {
	//readFileSync 同步
	//readFile 异步

	//接收前端发送过来的url 带参数
	var tmpPId=req.query.pId;
	console.log(tmpPId)
	var goodStr = fs.readFileSync("./data/goodsList.json", {
		encoding: "utf-8",//返回的文件编码
		flag: "r",//read  读取文件
	});
	// fs.readFile("./../data/goodsList.json",(data)=>{
	// 	console.log(data)
	// });
	const goodsList=JSON.parse(goodStr);
	var selectList=goodsList.filter((el)=>{
		return el.pId==tmpPId;
	})
	if(req.query.pId==undefined||!req.query.pId||req.query.pId==0){
		res.json(goodsList);
	}else{
		res.json(selectList);
	}
})


//5.暴露保安
module.exports = {
	router
}