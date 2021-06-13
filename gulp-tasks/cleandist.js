const del = require('del');

module.exports = function cleandist() {
	return del('dist/**/*', { force: true }); // Удаляем всё содержимое папки "dist/"
};
