/**
 * 
 * 
 * 
 * @desc 所有路由表的配置（包括请求的路径，类型等等参数）
 * @date 2016-09-28 星期三 
 * 
 */
var fs = require('fs');
var path = require('path')
var routesPath = path.join(__dirname, '../routes.json')
var routesJSON = fs.readFileSync(routesPath, 'utf8');
var routes = JSON.parse(routesJSON);

var root = path.join(__dirname, '../')

module.exports = function (enrouten) {
  Object.keys(routes).forEach( key => {
  	var route = routes[key];
  	var {router, method} = route;
  	router = path.join(root, router);
  	enrouten[method](key, require(router))
  })
};