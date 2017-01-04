#!/usr/bin/env node


var yargs = require('yargs')
var fs = require('fs')
var path = require('path')
var shell = require('shelljs');
var fse = require('fs-extra')
var chalk =  require('chalk');
var root = __dirname;
console.log(root)

// 页面命令
// yargs.command('page','operation for page', function(yargs) {
// 	yargs.option('a', {
// 		alias: 'add',
// 		demand: false,
// 		default: false,
// 		describe: 'add page | 添加页面',
// 		type: 'string'
// 	})
// 	yargs.usage('Usage: inode page [operation] [path]')
// 	yargs.help('h')
// 	yargs.alias('h', 'help')

// 	var args = yargs.argv;
// 	var {add} = args;
// 	if(add) {
// 		var route = path.join('/', add);
// 		addRoute(route, {
// 			type: 'page'
// 		});
// 	}
// })


yargs.usage('Usage: lt [dir]')
yargs.help('h')
yargs.alias('h', 'help')
var args = yargs.argv;

var [dir] = args['_'];
if(dir) {
	shell.exec('cp -R '+ path.join(root, 'projectDir')+'/.'+ ' dir')
}else {
	// console.log(path.join(root, 'projectDir/.'))
	shell.exec('cp -R '+ path.join(root, 'projectDir')+'/.'+ ' ./')
}
