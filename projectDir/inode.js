#!/usr/bin/env node
var yargs = require('yargs')
var fs = require('fs')
var path = require('path')
var dot = require('./module/dot')
var fse = require('fs-extra')
var chalk =  require('chalk');
var root = __dirname;
console.log(root)
var dotSetting = {
	evaluate:    /\{\{([\s\S]+?(\}?)+)\}\}/g,
	interpolate: /\{\{=([\s\S]+?)\}\}/g,
	encode:      /\{\{!([\s\S]+?)\}\}/g,
	use:         /\{\{#([\s\S]+?)\}\}/g,
	useParams:   /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,
	define:      /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
	defineParams:/^\s*([\w$]+):([\s\S]+)/,
	conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
	iterate:     /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
	varname:	"it",
	strip:		false,
	append:		true,
	selfcontained: false,
	doNotSkipEncoded: false
}
// 页面命令
yargs.command('page','operation for page', function(yargs) {
	yargs.option('a', {
		alias: 'add',
		demand: false,
		default: false,
		describe: 'add page | 添加页面',
		type: 'string'
	})
	yargs.usage('Usage: inode page [operation] [path]')
	yargs.help('h')
	yargs.alias('h', 'help')

	var args = yargs.argv;
	var {add} = args;
	if(add) {
		var route = path.join('/', add);
		addRoute(route, {
			type: 'page'
		});
	}
})

// 接口命令
yargs.command('ajax','operation for page', function(yargs) {
	yargs.option('a', {
		alias: 'add',
		demand: false,
		default: false,
		describe: 'add ajax | 添加ajax接口',
		type: 'string'
	})
	yargs.usage('Usage: inode ajax [operation] [path]')
	yargs.help('h')
	yargs.alias('h', 'help')

	var args = yargs.argv;
	var {add} = args;
	if(add) {
		var route = path.join('/ajax/', add);
		addRoute(route, {
			type: 'ajax'
		});
	}
})

// 组件命令
yargs.command('compt', 'operation for componts',function(yarg) {
	yargs.option('a', {
		alias: 'add',
		demand: false,
		default: false,
		describe: 'add component | 添加组件',
		type: 'string'
	})
	yargs.usage('Usage: inode compt [operation] [path]')
	yargs.help('h')
	yargs.alias('h', 'help')
	var args = yargs.argv;
})

yargs.usage('Usage: inode page|compt [operation] [path]')
yargs.help('h')
yargs.alias('h', 'help')

var args = yargs.argv;
function addRoute(route, option) {
	if(!addRouteTable(route, option)) return false ;
	if(!addRouteJs(route, option)) return false;
	if(option.type == 'ajax') return ;
	if(!addView(route, option)) return false;
	if(!addWpConf(route, option)) return false;
	if(!addEntryFile(route, option)) return false;
	return true;
}
// 写路由表
function addRouteTable(route, option) {
	var routeTablePath = path.join(root, 'routes.json');
	var routeJSON = fs.readFileSync(routeTablePath, 'utf8');
	var routes = JSON.parse(routeJSON);
	// 检查路由是否已存在
	if(routes[route]) {
		console.log('路由%s已存在:', route)
		return false;
	}

	var routerPath = path.join('routes', route+'.js');
	var newRoute = Object.assign({
		router: routerPath,
		method: 'get'
	},option)
	routes[route] = newRoute;
	var result = fs.writeFileSync(routeTablePath, JSON.stringify(routes, null, 4));
	console.log(chalk.yellow('路由    : %s'), route);
	return true
}
// 写路由函数
function addRouteJs(route, option) {
	var routesDir = path.join(root, 'routes');
	var routerPath = path.join(routesDir, route+'.js');
	var exists = fs.existsSync(routerPath);
	if(exists) {
		console.log('路由函数已存在');
		return false
	}
	fse.createFileSync(routerPath);
	var routeDemo
	if(option.type == 'ajax') {
		routeDemo = fs.readFileSync(path.join(root, 'module/tpl/ajaxRouter'))
	} else {
		routeDemo = fs.readFileSync(path.join(root, 'module/tpl/pageRouter'))
	}
	
	var routeTemp = dot.template(routeDemo,dotSetting)
	var view = path.join('page', route + '.html');
	var routeString = routeTemp({
		router: view
	})

	fs.writeFileSync(routerPath, routeString);
	console.log(chalk.yellow('路由函数: %s'), path.join('routes', route+'.js'));
	return true;
}
// 写view
function addView(route, option) {
	var view = path.join('page', route + '.html');
	var viewDir = path.join(root, 'views');
	var viewTplPath = path.join(root, 'module/tpl/page');
	var viewPath = path.join(viewDir, view);
	var exists = fs.existsSync(viewPath);
	if(exists) {
		console.log('view已存在');
		return ;
	}
	fse.createFileSync(viewPath);
	var viewTpl = fs.readFileSync(viewTplPath);
	var template = dot.template(viewTpl, dotSetting);
	var entry = path.join('page', route+'.js')
	var html = template({
		entry: entry,
		header: '{{#def.header}}',
		footer: '{{#def.footer}}'
	})
	fs.writeFileSync(viewPath, html)
	console.log(chalk.yellow('视图    : %s'), path.join('views/page', route+'.html'))
	return true;
}
// 写webpack entry配置
function addWpConf(route, option) {
	var entryPath = path.join(root, '/webpack_entry.json');
	var entryKey = route
	var entryName = './' + path.join('client/js/page/',route+'.js');
	var entryJSON = fs.readFileSync('webpack_entry.json', 'utf8');
	var entryTable = JSON.parse(entryJSON);
	if(entryTable[entryKey]) {
		console.log('该入口已注册')
		return false;
	}
	entryTable[entryKey] = entryName;
	var entryString = JSON.stringify(entryTable, null, 4);
	fs.writeFileSync('webpack_entry.json', entryString);
	return true;
}
// 写js入口文件
function addEntryFile(route, option) {
	var jsPath = path.join(root, './client/js/page/',route+'.js');
	var exists = fs.existsSync(jsPath);
	if(exists) {
		console.log('该入口js文件已存在')
		return false;
	}
	fse.createFileSync(jsPath);
	console.log(chalk.yellow('js入口  : %s'), path.join('./client/js/page/',route+'.js'))
	return true;
}





