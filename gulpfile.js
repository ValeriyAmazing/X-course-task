const gulp = require("gulp");
const webp = require("gulp-webp");
const pug = require("gulp-pug");
const connect = require("gulp-connect");
const sass = require("gulp-sass")(require("sass"));
const del = require("del");

gulp.task("clean-docs", function () {
  return del(["docs/**/*"]); 
});

gulp.task("convert-images", function () {
  return gulp
    .src("./src/**/*.{png,jpg,jpeg,webp}")
    .pipe(webp())
    .pipe(gulp.dest("docs"));
});

gulp.task("compile-pug", function () {
  return gulp
    .src("./src/**/index.pug")
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("docs"))
    .pipe(connect.reload());
});


gulp.task("compile-sass", function () {
  return gulp
    .src(["./src/**/style.scss"])
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulp.dest("docs"))
    .pipe(connect.reload());
});

gulp.task("move-svg", function () {
  return gulp
    .src(["./src/**/*.svg"]) 
    .pipe(gulp.dest("docs"));
});

// gulp.task("move-css", function () {
//     return gulp
//       .src(["./src/**/style.css"]) 
//       .pipe(gulp.dest("docs"));
//   });

// gulp.task("move-fonts", function () {
//   return gulp
//     .src("./src/**/*.{woff,woff2,ttf}") 
//     .pipe(gulp.dest("docs")); 
// });

gulp.task("move-files", function () {
    return gulp
      .src("./src/**/*.{js,json}") 
      .pipe(gulp.dest("docs")); 
  });

gulp.task("watch", function (done) {
  gulp.watch("src/**/*.pug", gulp.series("compile-pug"));
  gulp.watch("src/**/*.{jpeg,jpg,png,webp}", gulp.series("convert-images"));
  gulp.watch("src/**/*.svg", gulp.series("move-svg"));
  gulp.watch("src/**/*.scss", gulp.series("compile-sass"));
//   gulp.watch("src/**/*.{woff,woff2,ttf}", gulp.series("move-fonts"));
  gulp.watch("src/**/*.{js,json}", gulp.series("move-files"));
  // gulp.watch("src/**/*.css", gulp.series("move-css"));
  done()
});

gulp.task("connect", function (done) {
  connect.server({
    root: "docs",
    livereload: true,
  });
  done()
});

gulp.task(
  "dev",
  gulp.series(
    "clean-docs",
    "move-svg",
    "convert-images",
    "compile-pug",
    "compile-sass",
    // "move-fonts",
    "move-files",
    // "move-css",
    gulp.parallel("watch", "connect")
  )
);
