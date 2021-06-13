const { src, dest } = require('gulp');
const concat = require('gulp-concat'); // Подключаем gulp-concat
const uglify = require('gulp-uglify-es').default; // Подключаем gulp-uglify-es
const sourcemaps = require('gulp-sourcemaps'); // Подключаем бибилиотеку для создания  sourcemaps
const babel = require('gulp-babel');
const browserSync = require('browser-sync');

module.exports = function devJS() {
	return src(['app/js/main.js'], { allowEmpty: true })
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(
			babel({
				presets: ['@babel/env'],
			})
		)
		.pipe(concat('main.min.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('app/js/'))
		.pipe(browserSync.stream());
};
