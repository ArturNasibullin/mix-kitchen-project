let preprocessor = 'sass'; // Определяем переменную "preprocessor"
const { src, dest, parallel, series, watch } = require('gulp'); // Определяем константы Gulp
const concat = require('gulp-concat'), // Подключаем gulp-concat
	uglify = require('gulp-uglify-es').default, // Подключаем gulp-uglify-es
	sass = require('gulp-sass'), // Подключаем модули gulp-sass и gulp-less
	autoprefixer = require('gulp-autoprefixer'), // Подключаем Autoprefixer
	cleancss = require('gulp-clean-css'), // Подключаем модуль gulp-clean-css
	imagemin = require('gulp-imagemin'), // Подключаем gulp-imagemin для работы с изображениями
	pngquant = require('imagemin-pngquant'),
	newer = require('gulp-newer'), // Подключаем модуль gulp-newer
	del = require('del'), // Подключаем модуль del
	sourcemaps = require('gulp-sourcemaps'), // Подключаем бибилиотеку для создания  sourcemaps
	rename = require('gulp-rename'), //Подключаем бибилиотеку для переименования файлов;
	shorthand = require('gulp-shorthand'),
	gcmq = require('gulp-group-css-media-queries'); // Подключаем модуль для группировки медиазапросов
const requireDir = require('require-dir');
const tasks = requireDir('./tasks');
// Определяем логику работы Browsersync

// Определяем логику работы libsJS

function styles() {
	return src('app/sass/style.sass') // Выбираем источник
		.pipe(eval(preprocessor)()) // Преобразуем значение переменной "preprocessor" в функцию
		.pipe(concat('style.min.css')) // Конкатенируем в файл style.min.js
		.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) // Создадим префиксы с помощью Autoprefixer
		.pipe(shorthand())
		.pipe(gcmq()) //Группируем медиазапросы
		.pipe(
			cleancss({
				level: { 1: { specialComments: 0 } },
				format: 'beautify',
			})
		) // Минифицируем стили
		.pipe(sourcemaps.write('.')) // создание карты css.map в текущей папке
		.pipe(dest('app/css/')) // Выгрузим результат в папку "app/css/"
		.pipe(browserSync.stream()); // Сделаем инъекцию в браузер
}

function images() {
	return src('app/img/src/**/*') // Берём все изображения из папки источника
		.pipe(newer('app/img/dest/')) // Проверяем, было ли изменено (сжато) изображение ранее
		.pipe(
			imagemin({
				// С кешированием
				// .pipe(imagemin({ // Сжимаем изображения без кеширования
				interlaced: true,
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				use: [pngquant()],
			})
		) // Сжимаем и оптимизируем изображеня
		.pipe(dest('app/images/dest/')); // Выгружаем оптимизированные изображения в папку назначения
}

function cleanimg() {
	return del('app/images/dest/**/*', { force: true }); // Удаляем всё содержимое папки "app/images/dest/"
}

function buildcopy() {
	return src(
		[
			// Выбираем нужные файлы
			'app/css/**/*.css',
			'app/js/**/*.js',
			'app/img/dest/**/*',
			'app/**/*.html',
		],
		{ base: 'app' }
	) // Параметр "base" сохраняет структуру проекта при копировании
		.pipe(dest('dist')); // Выгружаем в папку с финальной сборкой
}

function cleandist() {
	return del('dist/**/*', { force: true }); // Удаляем всё содержимое папки "dist/"
}

function startwatch() {
	// Выбираем все файлы JS в проекте, а затем исключим с суффиксом .min.js
	watch(['app/**/*.js', '!app/js/*.min.js'], libsJS);

	// Мониторим файлы препроцессора на изменения
	watch('app/**/' + preprocessor + '/**/*', styles);

	// Мониторим файлы HTML на изменения
	watch('app/**/*.html').on('change', browserSync.reload);

	// Мониторим папку-источник изображений и выполняем images(), если есть изменения
	watch('app/img/src/**/*', images);
}

// Экспортируем функцию browsersync() как таск browsersync. Значение после знака = это имеющаяся функция.
exports.browsersync = tasks.browsersync;

// Экспортируем функцию libsJS() в таск libsJS
exports.libsJS = tasks.libsJS;

// Экспортируем функцию styles() в таск styles
exports.styles = styles;

// Экспорт функции images() в таск images
exports.images = images;

// Экспортируем функцию cleanimg() как таск cleanimg
exports.cleanimg = cleanimg;

// Создаём новый таск "build", который последовательно выполняет нужные операции
exports.build = series(cleandist, styles, libsJS, images, buildcopy);

// Экспортируем дефолтный таск с нужным набором функций
exports.default = parallel(styles, libsJS, browsersync, startwatch);
