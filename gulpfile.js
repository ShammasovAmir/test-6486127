import gulp from "gulp"

global.app = {
  gulp,
}

import { compile } from "./tasks/compile.js"
import { clean } from "./tasks/clean.js"
import { style } from "./tasks/style.js"
import { sync } from "./tasks/sync.js"
import { rollupTask } from "./tasks/rollup.js"
import { cacheBust } from "./tasks/cacheBust.js"

const watcher = () => {
  gulp.watch("src/assets", compile)
  gulp.watch("src/sass/*.sass", style)
  gulp.watch("src/js/*.js", rollupTask)
}

const dev = gulp.series(
  clean,
  compile,
  style,
  rollupTask,
  cacheBust,
  gulp.parallel(sync, watcher)
)

gulp.task("default", dev)
