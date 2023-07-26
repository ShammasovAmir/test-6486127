import replace from "gulp-replace"

export const cacheBust = () => {
  return app.gulp
    .src(["src/index.html"])
    .pipe(replace(/cb=\d+/g, `cb=${new Date().getTime()}`))
    .pipe(app.gulp.dest("./dist"))
}
