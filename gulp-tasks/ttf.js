const { src } = require('gulp');
const changed = require('gulp-changed');
const ttf2woff2 = require('gulp-ttftowoff2');
const multiDest = require('gulp-multi-dest');
const ttf2woff = require('gulp-ttf2woff');

module.exports = function ttf(done) {
	src('app/fonts/**/*.ttf')
		.pipe(
			changed('dist/fonts', {
				extension: '.woff2',
				hasChanged: changed.compareLastModifiedTime,
			})
		)
		.pipe(ttf2woff2())
		.pipe(multiDest(['app/fonts', 'dist/fonts']));

	src('app/fonts/**/*.ttf')
		.pipe(
			changed('dist/fonts', {
				extension: 'woff',
				hasChanged: changed.compareLastModifiedTime,
			})
		)
		.pipe(ttf2woff())
		.pipe(multiDest(['app/fonts', 'dist/fonts']));
	done();
};
