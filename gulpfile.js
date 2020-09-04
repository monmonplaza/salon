//Initial Modules

const gulp = require("gulp");
const autoprefixer = require("autoprefixer");
const uncss = require("postcss-uncss");
const cssnano = require("cssnano");
const concat = require("gulp-concat");
const postcss = require("gulp-postcss");
const replace = require("gulp-replace");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const browserSync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");

//file path variables

const files = {
    //source path
    scssPath: "./src/scss/**/*.scss",
    jsPath: "./src/js/**/*.js",
    imgPath: "./src/images/**/*",

    //destination path
    distCssPath: "./dist/css",
    distImgPath: "./dist/images",
    distJsPath: "./dist/js",
    distHTMLPath: "./dist"
};

// SASS task
function scssTask() {
    return gulp
        .src(files.scssPath)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(
            postcss([autoprefixer(), uncss({
                html: ["./src/*.html"]
            }), cssnano()])
        )
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(files.distCssPath))
        .pipe(browserSync.stream());
}

// JS task

function jsTask() {
    return (
        gulp
        .src(files.jsPath)
        .pipe(concat("all.js"))
        // .pipe(uglify())
        .pipe(gulp.dest(files.distJsPath))
    );
}

// Cachebusting task

function cacheBustTask() {
    const cbstr = new Date().getTime();
    return gulp
        .src(["./src/*.html"])
        .pipe(replace(/cb=\d+/g, "cb=" + cbstr))
        .pipe(gulp.dest("./src/"));
}

//Image task
function imgTask() {
    return gulp
        .src(files.imgPath)
        .pipe(
            imagemin([
                imagemin.jpegtran({
                    progressive: true
                }),
                imagemin.optipng({
                    optimizationLevel: 5
                })
            ])
        )
        .pipe(gulp.dest(files.distImgPath));
}

//copy html
function copyHTML() {
    return (
        gulp
        .src("./src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(files.distHTMLPath))
    );
}

//Watch task

function watchTask() {
    browserSync.init({
        server: {
            baseDir: "./dist/", //yung .html sa dist ang iloload niya
            index: "index.html"
        }
    });
    gulp.watch(files.scssPath, scssTask).on("change", browserSync.reload);
    gulp.watch(files.jsPath, jsTask).on("change", browserSync.reload);
    gulp.watch(files.imgPath, imgTask);
    gulp.watch("./src/*.html", copyHTML);
    gulp.watch("./dist/*.html").on("change", browserSync.reload); //yung .html sa dist ang iloload niya
}

//Default task

exports.default = gulp.series(
    gulp.parallel(scssTask, jsTask, imgTask),
    cacheBustTask,
    copyHTML,
    watchTask
);