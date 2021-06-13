const { src, dest } = require('gulp');
const concat = require('gulp-concat'); // Подключаем gulp-concat
const uglify = require('gulp-uglify-es').default; // Подключаем gulp-uglify-es
const sourcemaps = require('gulp-sourcemaps'); // Подключаем бибилиотеку для создания  sourcemaps
const chalk = require('chalk');
const browserSync = require('browser-sync');

module.exports = function libsJS(done) {
	const plugins = [];
	if (plugins.length > 0)
		return src(plugins, { allowEmpty: true })
			.pipe(sourcemaps.init())
			.pipe(uglify()) // Сжимаем JavaScript
			.pipe(concat('libs.min.js')) // Конкатенируем в один файл
			.pipe(sourcemaps.write('.'))
			.pipe(dest('app/js/')) // Выгружаем готовый файл в папку назначения
			.pipe(browserSync.stream());
	// Триггерим Browsersync для обновления страницы
	else {
		return done(console.log(chalk.redBright('No added JS plugins')));
	}
};
