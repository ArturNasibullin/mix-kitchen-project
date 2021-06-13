const fs = require('fs');
const chalk = require('chalk');

module.exports = function fonts(done) {
	let srcFonts = 'app/sass/_dirty-fonts.scss';
	let appFonts = 'dist/fonts/';
	fs.writeFile(srcFonts, '', () => {});
	fs.readdir(appFonts, (err, items) => {
		if (items) {
			let c_fontname;
			for (let i = 0; i < items.length; i++) {
				let fontname = items[i].split('.'),
					fontExt;
				fontExt = fontname[1];
				fontname = fontname[0];
				if (c_fontname != fontname) {
					if (fontExt == 'woff' || fontExt == 'woff2') {
						fs.appendFile(srcFonts, `@include font-face("${fontname}", "${fontname}", 400);\r\n`, () => {});
						console.log(chalk`
{bold {bgGray Added new font: ${fontname}.}
----------------------------------------------------------------------------------
{bgYellow.black Please, move mixin call from {cyan app/sass/_dirty-fonts.scss} to {cyan app/sass/_fonts.scss} and then change it!}}
----------------------------------------------------------------------------------
`);
					}
				}
				c_fontname = fontname;
			}
		}
	});
	done();
};
