const browserSync = require('browser-sync');

module.exports = function browsersync() {
	browserSync.init({
		// Инициализация Browsersync
		server: { baseDir: 'app/' }, // Указываем папку сервера
		callbacks: {
			ready: function (err, bs) {
				bs.addMiddleware('*', function (req, res) {
					res.writeHead(302, {
						location: '404.html',
					});
					res.end('Redirecting!');
				});
			},
		},
		browser: 'Chrome',
		logPrefix: 'BS-HTML:',
		logLevel: 'info',
		logConnections: true,
		logFileChanges: true,
		open: true,
		notify: false, // Отключаем уведомления
		online: true, // Режим работы: true или false
	});
};
