//1.引入express框架
import express from 'express';
import db from './../modules/DBHelper';

//2.创建保安
let router = express.Router();

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
		} else{
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
	let sql = 'SELECT `uemail`,`urelname`,`usex`,`ubirthday` FROM userinfo WHERE uemail=? '
	let params = [req.body.uemail];
	let resultObj = {
		msg: '注册失败',
		status: -1,
	}
	db.queryAsync(sql, params).then((data) => {
		if (data.length == 1) {
			resultObj.msg = '用户名已注册';
			resultObj.status = -2;
			resultObj.data = data;
			setTimeout(()=>{res.json(resultObj)},1000);
		} else {
			let sql = 'INSERT INTO userinfo (`uemail`,upwd,usex,urelname,ubirthday) VALUES (?,?,?,?,?)'
			let params = [req.body.uemail, req.body.upwd, req.body.usex, req.body.urelname, req.body.ubirthday];
			db.query(sql, params).then((data) => {
				if (data.affectedRows == 1) {
					params.splice(1,1);
					resultObj.msg = '注册成功';
					resultObj.status = 1;
					resultObj.data = params;
					res.json(resultObj);
				} else {
					resultObj.data = data;
					resultObj.status = -3;
					res.json(resultObj);
				}
			}, (err) => {
				resultObj.err = err;
				resultObj.status = -4;
				res.json(resultObj);
			})
		}
	}, (err) => {
		resultObj.err = err;
		res.json(resultObj);
	})
})

//5.暴露保安
module.exports = {
	router
}