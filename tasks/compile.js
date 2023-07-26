export const compile = () => {
	return app.gulp.src('src/assets/**/*.*').pipe(app.gulp.dest('dist/assets/'))
}
