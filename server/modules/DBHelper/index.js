const mysql = require("mysql");

let pool = mysql.createPool(require("./../../config"));

function query(sql, params) {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, con) => {
			if (err) {
				console.log("连接失败");
				reject(err);
				// throw err;
			}
			con.query(sql, params, (err, result, fields) => {
				con.release();
				if (err) {
					console.log("执行失败");
					reject(err);
					// throw err;
				}
				resolve(result);
			})
		})
	})
}

async function queryAsync() {
	return await query(...arguments);
}

module.exports = {
	query,
	queryAsync
}

// const mysql =require 'mysql';
// let pool =mysql.createPool({
//    host:'域名',
//    post:3306,
//    user:'root',
//    password:'密码',
//    database:'数据库名'
// });

// let sql1='SELECT * FROM '表名1' WHERE '选择条件' ';
// let sql2='SELECT * FROM '表名2' WHERE '选择条件' ';
// let sql3='SELECT * FROM '表名3' WHERE '选择条件' ';
// let sql=[sql1,sql2,sql3];
// let params1=['发送到'表名1'的参数'];
// let params2=['发送到'表名2'的参数'];
// let params3=['发送到'表名3'的参数'];
// let params=[params1,params2,params3];
// sql.forEach((el,index)=>{
//      pool.getConnection((err,con)=>{
//        if(err){
//         throw err;
//         }
//         con.query(el,params[index],(err,result,fields)=>{
//              if(err){
//              throw err;
//             }
//               res.json(result);
//          })
//      })
// })