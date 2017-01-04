var fs = require('fs');
var path = require('path');

var root = path.join(__dirname, '../');

var manifestPath = path.join(root, 'client/build/manifest.json');
var exists = fs.existsSync(manifestPath);
var manifest = {};
if(exists) {
	manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
}

module.exports = function *(next) {
	var url = this.url;
	this.manifest = manifest;
	var [path] = url.split('?');
	console.log('path', path)
	path += '.js';
	if(manifest[path]) {
		this.entry = {
			common: manifest['common.js'],
			main: manifest[path],
			path:path
		}
	}
	yield next;
}