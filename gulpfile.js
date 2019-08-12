const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const minCss = require("gulp-clean-css");
const autopre = require("gulp-autoprefixer");
const minjs = require("gulp-uglify");
const babel = require("gulp-babel");
const imagemin = require("gulp-imagemin");
const browserSync=require("browser-sync");
//跨域代理
const proxyMiddleware = require('http-proxy-middleware')
const path = require("path"); // 路径模块
// console.log(path.join(__dirname, "./src/*.html"))

//1.压缩html的任务
gulp.task("htmlmin", function () {
    gulp.src(
            [path.join(__dirname, "./src/*.html"),
                path.join(__dirname, "./src/*.htm")
            ])
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(path.join(__dirname, "./dist")))
})

//2.压缩css的任务
gulp.task("cssmin", function () {
    gulp.src(["./src/css/*.css", "./src/css/**.css", "./src/css/**/*.css"])
        .pipe(autopre({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(minCss())
        .pipe(gulp.dest("./dist/css"));
})
//3.压缩js
gulp.task("minjs", function () {
    gulp.src(["./src/js/*.js", "./src/js/**/*.js"])
        .pipe(babel())
        .pipe(minjs())
        .pipe(gulp.dest("./dist/js"))

})
//4.压缩img
gulp.task("imagemin", function () {
    // （**匹配src/js的0个或多个子文件夹）
    gulp.src(['./src/images/*.{png,jpg,gif,svg,jpeg}', './src/**/*.{png,jpg,gif,svg,jpeg}'])
        .pipe(imagemin({
            optimizationLevel: 3, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest("./dist/images"))

});

//代理配置
var middleware = proxyMiddleware(['/api',"/images"], {
    target: 'http://127.0.0.1:8080/', //第三方的接口
    changeOrigin: true,
    pathRewrite: {
        '^/': ''
    },
    logLevel: "silent",
    logConnections: false,
    logSnippet: false,
    reloadOnRestart: false,
    notify: false
});

//自动刷新工具
gulp.task("run",function(){
    browserSync.init({
        files:['./src/**'],
        //proxy:'localhost', // 设置本地服务器的地址
        port:8083,  // 设置访问的端口号
        server:{
            baseDir: "./",
            middleware:middleware
        },
        directory:true
    });

    // gulp.watch(["./src/*.html","./src/*.htm","./src/css/*.css","./src/js/*.js"],
    // ["default"],browserSync.reload);
})

//html,js,css,img


gulp.task("default", ["htmlmin", "cssmin", "minjs", "imagemin"])

