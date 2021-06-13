const { parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const requireDir = require('require-dir');
const tasks = requireDir('./gulp-tasks');

function startwatch() {
	// Выбираем все файлы JS в проекте, а затем исключим с суффиксом .min.js
	watch(['app/**/*.js', '!app/js/*.min.js'], exports.libsJS);
	// Мониторим файлы препроцессора на изменения
	watch('app/sass/**/*', exports.styles);
	// Мониторим файлы HTML на изменения
	watch('app/*.html').on('change', browserSync.reload);
	// Мониторим папку-источник изображений и выполняем images(), если есть изменения
	watch('app/img/**/*', exports.images);
}

exports.browsersync = tasks.browsersync;
exports.styles = tasks.styles;
exports.devJS = tasks.devJS;
exports.images = tasks.images;
exports.libsStyle = tasks.libsStyle;
exports.libsJS = tasks.libsJS;
exports.webp = tasks.webp;
exports.fonts = tasks.fonts;
exports.ttf = tasks.ttf;
exports.buildcopy = tasks.buildcopy;
exports.cleandist = tasks.cleandist;

// Создаём новый таск "build", который последовательно выполняет нужные операции
exports.build = series(exports.styles, exports.libsJS, exports.images, exports.webp, exports.buildcopy);

//Создание и конвертация шрифтов
exports.fonts = series(exports.ttf, exports.fonts);

// Экспортируем дефолтный таск с нужным набором функций
exports.default = parallel(exports.devJS, exports.styles, exports.libsStyle, exports.libsJS, exports.browsersync, startwatch);
