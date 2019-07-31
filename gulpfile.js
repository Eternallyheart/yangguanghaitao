const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const minCss = require("gulp-clean-css");
const autopre=require("gulp-autoprefixer");
const path = require("path");

//1.压缩html
gulp.task("htmlmin", function () {
    gulp.src([
        path.join(__dirname, "./src/*.html"), 
        path.join(__dirname, "./src/*.htm"),
        path.join(__dirname, "./src/html/*.html")])
    .pipe(htmlmin({
        collapseWhitespace: true
    }))
    .pipe(gulp.dest(path.join(__dirname, "./dist")))
})

//2.压缩css
gulp.task("cssmin",function(){
    gulp.src(["./src/css/*.css","./src/css/**.css","./src/css/**/*.css"])
    .pipe(autopre({
        browsers: ['last 2 versions', 'Android >= 4.0'],
        cascade: true, //是否美化属性值 默认：true 像这样：
        remove: true //是否去掉不必要的前缀 默认：true
    })).pipe(minCss())
    .pipe(gulp.dest("./dist/css"))
})

//3.压缩js

gulp.task("default",["htmlmin","cssmin"])



















// gulp.task("htmlmin", function () {
//     gulp.src(["./src/*.html", "./src/*.htm"])
//         .pipe(htmlmin({
//             removeComments: true, //清除HTML注释
//             collapseWhitespace: true, //压缩HTML
//             collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
//             removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
//             removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
//             removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
//             minifyJS: true, //压缩页面JS
//             minifyCSS: true //压缩页面CSS
//         }))
//         .pipe(gulp.dest("./dist"));
// });
// gulp.task("default",["htmlmin"]);