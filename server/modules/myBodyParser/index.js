// var uname="周杰lun";
// exports.uname=uname;

const qs = require("querystring");
module.exports = {
    urlencoded() {
        return function (req, res, next) {
            var strParams = "";
            req.on("data", function (data) {
                strParams += data;
            })
            req.on("end", function () {
                req.body = qs.parse(strParams);
                next();
            })
        }
    },
    json() {
        return function (req, res, next) {
            var strParams = "";
            req.on("data", function (data) {
                strParams += data;
            })
            req.on("end", function () {
                req.body = qs.parse(strParams);
                next();
            })
        }
    },
    text() {},
    raw() {}
}