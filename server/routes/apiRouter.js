//1.引入express框架
import express from 'express';
import db from './../modules/DBHelper';
import fs from 'fs';

import jwt from 'jsonwebtoken';
// import impAsync from 'async';

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

global.keys = "useKer.cn"
//3.创建登录连接
router.post("/login", (req, res, next) => {
	let sql = "SELECT `uid`,`uemail`,`urelname`,`usex`,`ubirthday` FROM userinfo WHERE uemail=? AND upwd=?";
	let params = [req.body.uemail, req.body.upwd];
	let resultObj = {
		msg: '登录失败',
		status: -1,
	}
	db.query(sql, params).then((result) => {
		if (result.length >= 1) {
			resultObj.msg = '登录成功';
			resultObj.status = 1;
			resultObj.data = result;
			let token = jwt.sign(resultObj, global.keys, {
				expiresIn: 30 * 60
			});
			resultObj.token = token;
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

//7.创建连接获取所有的数据 产品列表
router.get("/goods", (req, res, next) => {
	//readFileSync 同步
	//readFile 异步

	//接收前端发送过来的url 带参数
	var tmpPId = req.query.pId;
	var goodStr = fs.readFileSync("./data/goodsList.json", {
		encoding: "utf-8", //返回的文件编码
		flag: "r", //read  读取文件
	});
	// fs.readFile("./../data/goodsList.json",(data)=>{
	// 	console.log(data)
	// });
	const goodsList = JSON.parse(goodStr);
	var selectList = goodsList.filter((el) => {
		return el.pId == tmpPId;
	})
	if (req.query.pId == undefined || !req.query.pId || req.query.pId == 0) {
		res.json(goodsList);
	} else {
		res.json(selectList);
	}
})

//8.创建连接 加入购物车
router.post("/addCart", (req, res, next) => {
	//查询
	//1.sql
	const selectSql = "SELECT * FROM carts WHERE pId=? AND uId=? ";
	let selectParams = [req.body.pId, req.body.uId];
	//2. params
	let selectData = db.queryAsync(selectSql, selectParams);
	selectData.then((data) => {
		if (data.length >= 1) {
			//修改
			const updateSql = "UPDATE carts SET pNum=pNum+?,pTotal=pNum*pPrice,pTime=?,pPerson=pPerson+1,pStock=pStock-pNum WHERE uId=? AND pId=? ;";
			let updateParams = [
				req.body.pNum,
				req.body.pTime,
				req.body.uId,
				req.body.pId,
			];
			let updateData = db.queryAsync(updateSql, updateParams);
			updateData.then((data) => {
				if (data.affectedRows >= 1) {
					res.json({
						"msg": "加入成功u",
						"status": 1
					});
				} else {
					res.json({
						"msg": "加入失败u",
						"status": -1
					});
				}
			})
		} else {
			//插入
			const insertSql = "INSERT INTO carts (`uId`,`pId`,`pName`,`pPrice`,`pOldPrice`,`pNum`,`pImg`,`pStock`,`pTime`,`pPerson`,`pTotal`,`pAddress`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);";
			let insertParams = [
				req.body.uId,
				req.body.pId,
				req.body.pName,
				req.body.pPrice,
				req.body.pOldPrice,
				req.body.pNum,
				req.body.pImg,
				req.body.pStock,
				req.body.pTime,
				req.body.pPerson,
				req.body.pTotal,
				req.body.pAddress,
			];
			let insertData = db.queryAsync(insertSql, insertParams);
			insertData.then((data) => {
				if (data.affectedRows >= 1) {
					res.json({
						"msg": "加入成功i",
						"status": 1
					});
				} else {
					res.json({
						"msg": "加入失败i",
						"status": -1
					});
				}
			})
		}
	})
	// res.end();
	//如果返回的影响行数大于等于1 表示已经购买 
	//只需要修改数量
})

//9.创建连接 查看当前登录人的 购物车
router.get("/getCart", async (req, res, next) => {
	let uId = req.query.uid;
	let sql = "SELECT * FROM carts WHERE uId=?";
	let params = [uId];
	const result = await db.query(sql, params);
	res.json(result);
})

//10创建连接 改变数据库中商品的数量
router.post("/modify", async (req, res, next) => {
	let sql = "UPDATE carts SET pNum=?,pTotal=pNum*pPrice,pTime=?,pStock=pStock-pNum WHERE uId=? AND pId=? ;";
	let params = [req.body.pNum, req.body.pTime, req.body.uId, req.body.pId];
	const result = await db.query(sql, params);
	res.json(result);
})

//11创建连接 在数据库删除用户选中的商品
router.post("/deleteCart", async (req, res, next) => {
	let sql = "DELETE FROM carts WHERE uId=? AND pId=? ;";
	let params = [req.body.uId, req.body.pId];
	const result = await db.query(sql, params);
	res.json(result);
})

//5.暴露保安
module.exports = {
	router
}