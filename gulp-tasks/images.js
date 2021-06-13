const { src, dest } = require('gulp');
const changed = require('gulp-changed');
const recompress = require('imagemin-jpeg-recompress');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync');
const pngquant = require('imagemin-pngquant');

module.exports = function images() {
	return src('app/img/**/*.+(png|jpg|jpeg|gif|svg|ico)')
		.pipe(changed('dist/img'))
		.pipe(
			imagemin(
				{
					interlaced: true,
					progressive: true,
					optimizationLevel: 5,
				},
				[
					recompress({
						loops: 6,
						min: 50,
						max: 90,
						quality: 'high',
						use: [
							pngquant({
								quality: [0.8, 1],
								strip: true,
								speed: 1,
							}),
						],
					}),
					imagemin.gifsicle(),
					imagemin.optipng(),
					imagemin.svgo(),
				]
			)
		)
		.pipe(dest('dist/img'))
		.pipe(browserSync.stream());
};
