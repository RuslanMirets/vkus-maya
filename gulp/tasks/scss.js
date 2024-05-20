import * as sass from "sass";
import gulpSass from "gulp-sass";
import groupCssMediaQueries from "gulp-group-css-media-queries";
import autoprefixer from "gulp-autoprefixer";
import cleanCss from "gulp-clean-css";
import rename from "gulp-rename";
import webpCss from "gulp-webpcss";

const mainSass = gulpSass(sass);

export const scss = () => {
	return (
		app.gulp
			.src(app.path.src.scss, { sourcemaps: app.isDev })
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: "SCSS",
						message: "Error: <%= error.message %>",
					})
				)
			)
			.pipe(mainSass())
			.pipe(app.plugins.replace(/@img\//g, "../img/"))
			.pipe(webpCss({ webpClass: ".webp", noWebpClass: ".no-webp" }))
			.pipe(groupCssMediaQueries())
			.pipe(
				autoprefixer({
					cascade: false,
					grid: true,
					overrideBrowserslist: ["last 5 versions"],
				})
			)
			// Раскомментировать, если нужен не сжатый дубль стилей
			// .pipe(app.gulp.dest(app.path.build.css))
			.pipe(app.plugins.if(app.isBuild, cleanCss({ level: 2 })))
			.pipe(rename({ extname: ".min.css" }))
			.pipe(app.gulp.dest(app.path.build.css))
			.pipe(app.plugins.browserSync.stream())
	);
};
