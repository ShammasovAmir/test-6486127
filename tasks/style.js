import dartSass from "sass"
import gulpSass from "gulp-sass"
import sourcemaps from "gulp-sourcemaps"
import postcss from "gulp-postcss"
import autoprefixer from "autoprefixer"
import cssnano from "cssnano"
import browserSync from "browser-sync"

const sass = gulpSass(dartSass)

export const style = () => {
  return app.gulp
    .src("src/scss/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("/sourcemap"))
    .pipe(app.gulp.dest("dist/css"))
    .pipe(browserSync.stream())
}
