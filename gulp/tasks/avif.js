import gulpAvif from "gulp-avif";

export const avif = () => {
	return app.gulp
		.src(app.path.src.avifImages)
		.pipe(gulpAvif())
		.pipe(app.gulp.dest(app.path.build.images));
};
