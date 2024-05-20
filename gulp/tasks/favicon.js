import favicons from "gulp-favicons";

export const favicon = () => {
	return (
		app.gulp
			.src(app.path.src.favicon)
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: "FAVICON",
						message: "Error: <%= error.message %>",
					})
				)
			)
			// .pipe(app.gulp.dest(app.path.build.favicon))
			.pipe(
				favicons({
					icons: {
						favicons: true,
						appleIcon: true,
						android: true,
						windows: false,
						yandex: false,
						cost: false,
						firefox: false,
						appleStartup: false,
					},
					path: "img/favicon/",
				})
			)
			.pipe(app.gulp.dest(app.path.build.favicon))
			.pipe(app.plugins.filter(["favicon.ico"]))
			.pipe(app.gulp.dest(app.path.build.root))
			.pipe(app.plugins.browserSync.stream())
	);
};
