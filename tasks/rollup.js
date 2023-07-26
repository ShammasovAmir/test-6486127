import rollup from "rollup-stream"
import browserSync from "browser-sync"
import sourcemaps from "gulp-sourcemaps"
import babel from "gulp-babel"
import uglify from "gulp-uglify"
import source from "vinyl-source-stream"
import rename from "gulp-rename"
import buffer from "vinyl-buffer"

export const rollupTask = () => {
  return rollup({
    input: "./src/js/index.js",
    sourcemap: true,
    format: "umd",
  })
    .pipe(source("index.js", "./src/js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(rename("main.min.js"))
    .pipe(sourcemaps.write("/sourcemap"))
    .pipe(app.gulp.dest("./dist/js"))
    .pipe(browserSync.stream())
}
