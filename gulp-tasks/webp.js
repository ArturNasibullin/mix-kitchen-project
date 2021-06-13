const { src, dest } = require('gulp');
const changed = require('gulp-changed');
const plumber = require('gulp-plumber');
const webpConv = require('gulp-webp');
const multiDest = require('gulp-multi-dest');

module.exports = function webp() {
	return src('dist/img/**/*.+(png|jpg|jpeg)')
		.pipe(plumber())
		.pipe(
			changed('dist/img', {
				extension: '.webp',
			})
		)
		.pipe(webpConv())
		.pipe(multiDest(['app/img', 'dist/img']));
};
