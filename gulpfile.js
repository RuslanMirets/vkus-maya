// Основной модуль
import gulp from "gulp";
// Импорт путей
import { path } from "./gulp/config/path.js";
// Импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js";

// Передаем значения в глобальную переменную
global.app = {
	isBuild: process.argv.includes("--build"),
	isDev: !process.argv.includes("--build"),
	path: path,
	gulp: gulp,
	plugins: plugins,
};

// Импорт задач
import { clean } from "./gulp/tasks/clean.js";
import { server } from "./gulp/tasks/server.js";
import { html } from "./gulp/tasks/html.js";
// Раскомментировать, если нужно использовать pug
// import { pug } from "./gulp/tasks/pug.js";
import { scss } from "./gulp/tasks/scss.js";
import { images } from "./gulp/tasks/images.js";
import { webp } from "./gulp/tasks/webp.js";
// Раскомментировать, если нужно использовать формат изображения avif
// import { avif } from "./gulp/tasks/avif.js";
import { js } from "./gulp/tasks/js.js";
import { fonts } from "./gulp/tasks/fonts.js";
import { svgSprites } from "./gulp/tasks/svgSprites.js";
import { favicon } from "./gulp/tasks/favicon.js";

// Наблюдатель за изменениями в файлах
function watcher() {
	gulp.watch(path.watch.html, html);
	// Раскомментировать, если нужно использовать pug
	// gulp.watch(path.watch.pug, pug);
	gulp.watch(path.watch.scss, scss);
	gulp.watch(path.watch.images, images);
	gulp.watch(path.watch.webpImages, webp);
	// Раскомментировать, если нужно использовать формат изображения avif
	// gulp.watch(path.watch.avifImages, avif);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.fonts, fonts);
	gulp.watch(path.watch.favicon, favicon);
}

// Основные задачи
const mainTasks = gulp.parallel(
	html,
	// Раскомментировать, если нужно использовать html
	// pug,
	scss,
	images,
	webp,
	// Раскомментировать, если нужно использовать формат изображения avif
	// avif,
	js,
	fonts,
	svgSprites,
	favicon
);

// Построение сценариев выполнение задач
const dev = gulp.series(clean, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(clean, mainTasks);

// Экспорт сценариев
export { dev };
export { build };

// Выполнения сценария по умолчанию
gulp.task("default", dev);
