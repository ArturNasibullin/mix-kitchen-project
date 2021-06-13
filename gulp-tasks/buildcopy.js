const { src, dest } = require('gulp');

module.exports = function buildcopy() {
	return src(
		[
			// Выбираем нужные файлы
			'app/css/**/*.min.css',
			'app/css/**/*.min.css',
			'app/js/**/*.min.js',
			'app/fonts/*.css',
			'app/**/*.html',
		],
		{ base: 'app' }
	) // Параметр "base" сохраняет структуру проекта при копировании
		.pipe(dest('dist')); // Выгружаем в папку с финальной сборкой
};
