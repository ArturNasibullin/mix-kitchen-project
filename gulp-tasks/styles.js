const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const shorthand = require('gulp-shorthand');
const gcmq = require('gulp-group-css-media-queries'); // Подключаем модуль для группировки медиазапросов

module.exports = function styles() {
	return src('app/sass/style.sass') // Выбираем источник
		.pipe(sourcemaps.init())
		.pipe(
			sass({
				outputStyle: 'compressed',
			}).on('error', sass.logError)
		)
		.pipe(
			autoprefixer({
				overrideBrowserslist: ['last 8 versions'],
				browsers: ['Android >= 4', 'Chrome >= 20', 'Firefox >= 24', 'Explorer >= 11', 'iOS >= 6', 'Opera >= 12', 'Safari >= 6'],
			})
		) // Создадим префиксы с помощью Autoprefixer
		.pipe(shorthand())
		.pipe(gcmq()) //Группируем медиазапросы
		.pipe(
			cleancss({
				level: 2,
			})
		)
		.pipe(concat('style.min.css'))
		.pipe(sourcemaps.write('.')) // создание карты css.map в текущей папке
		.pipe(dest('app/css/')) // Выгрузим результат в папку "app/css/"
		.pipe(browserSync.stream()); // Сделаем инъекцию в браузер
};
