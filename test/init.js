require('app-module-path').addPath(process.cwd() + '/src');
require('app-module-path').addPath(process.cwd() + '/test');
global.l = function(x) {
	console.log(x);
};