import gulpWebp from "gulp-webp";

export const webp = () => {
	return app.gulp
		.src(app.path.src.webpImages)
		.pipe(gulpWebp())
		.pipe(app.gulp.dest(app.path.build.images));
};
