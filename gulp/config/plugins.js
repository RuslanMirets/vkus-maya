import replace from "gulp-replace"; // Поиск и замена
import plumber from "gulp-plumber"; // Обработка ошибок
import notify from "gulp-notify"; // Сообщения (подсказки)
import browserSync from "browser-sync"; // Локальный сервер
import gulpIf from "gulp-if"; // Условное ветвление
import filter from "gulp-filter"; // Фильтрация

// Экспортируем объект
export const plugins = {
	replace: replace,
	plumber: plumber,
	notify: notify,
	browserSync: browserSync,
	if: gulpIf,
	filter: filter,
};
