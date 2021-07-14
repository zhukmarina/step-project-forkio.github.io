const gulp = require("gulp");
const gulpSass = require('gulp-sass')(require('sass'));
const browserSync = require("browser-sync").create();
const gulpAutoPrefixer = require("gulp-autoprefixer");
const gulpConcat = require("gulp-concat");
const gulpMinifycss = require("gulp-clean-css");
const gulpImgmin = require("gulp-imagemin");
const clean = require("gulp-clean");
const uglify = require("gulp-uglify");
const ghPages = require('gulp-gh-pages');

// gulp.task("browser-sync", function() {
//     browserSync.init({
//         server: {
//             baseDir: "./dist",
//             // directory: true,
//         },
//         notify: false
//     })
// });
gulp.task("html", function () {
    return gulp
        .src("src/index.html")
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream());
});

gulp.task("scss", function (){
    return gulp
        .src("src/scss/**/*.scss")
        .pipe(gulpSass())
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream())
});

gulp.task("js", function () {
    return gulp
        .src("src/js/*.js")
        .pipe(gulpConcat("common.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());
});

gulp.task("clean", function () {
    return gulp
        .src("dist/*", {read: false})
        .pipe(clean())
});

gulp.task("modify", function () {
    return gulp
        .src("src/scss/**/*.scss")
        .pipe(gulpSass())
        .pipe(gulpAutoPrefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], {cascade: true }))
        .pipe(gulpConcat("style.min.css"))
        .pipe(gulpMinifycss({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))
});

gulp.task("img",  function () {
    return gulp
        .src("src/img/**/*")
        // .pipe(gulpImgmin())
        .pipe(gulp.dest("dist/img"))
});
gulp.task('deploy', function() {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});

gulp.task("build", gulp.series("clean", gulp.parallel( "html", "modify", "js", "img")));

gulp.task('deploy');

gulp.task("dev", () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    })
    gulp.watch("src/scss/*.scss").on('change', gulp.series("modify","scss", browserSync.reload));
    gulp.watch("src/*.html").on('change', gulp.series("html", browserSync.reload));
    gulp.watch("src/js/*.js").on('change', gulp.series("js", browserSync.reload));
});












