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