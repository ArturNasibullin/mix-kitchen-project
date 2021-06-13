const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const chalk = require('chalk');

module.exports = function libsStyle(done) {
	const plugins = [];
	if (plugins.length > 0) {
		return src(plugins)
			.pipe(sourcemaps.init())
			.pipe(
				sass({
					outputStyle: 'compressed',
				}).on('error', sass.logError)
			)
			.pipe(concat('libs.min.css'))
			.pipe(sourcemaps.write('.'))
			.pipe(dest('app/css/'));
	} else {
		return done(console.log(chalk.redBright('No added CSS/SCSS plugins')));
	}
};
