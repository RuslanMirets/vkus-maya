import imagemin from "gulp-imagemin";
import mozjpeg from "imagemin-mozjpeg";
import optipng from "imagemin-optipng";

export const images = () => {
	return app.gulp
		.src(app.path.src.images)
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: "IMAGES",
					message: "Error: <%= error.message %>",
				})
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				imagemin([
					mozjpeg({ quality: 80, progressive: true }),
					optipng({ optimizationLevel: 2 }),
				])
			)
		)
		.pipe(app.gulp.dest(app.path.build.images))
		.pipe(app.plugins.browserSync.stream());
};
