/**
 * @author tangyan05
 * @description doT中间件
 */

let dot = require('./dot');
let fs = require('fs');
let thunkify = require('thunkify');
let co = require('co');
let path = require('path')
let dots;


let read = thunkify(fs.readFile);
let option = {
	path: '',
	process: ''
};

let cache = Object.create(null);

module.exports = function (op) {
	option = Object.assign(option, op)
	dots = dot.process({path: option.process})
	return function *(next) {
		this.render = function *(_path, model) {
			let filePath = path.join(option.path, _path);
			if(cache[filePath] == undefined) {
				let content = yield read(filePath, 'utf8');
				cache[filePath] = dot.template(content, null , dots.__def);
			}

			let render = cache[filePath];
			this.body = render(model);
		}
		yield next;
	}
}

