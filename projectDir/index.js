const app = require('koa')();
const router = require('koa-router')();

// const render = require('koa-ejs');

const json = require('koa-json');
const logger = require('koa-logger');
const config = require('config');
const bodyparser = require('koa-bodyparser');

// 渲染引擎
const views = require('./module/wmi-dot.js');
app.use(views({
  path: __dirname + '/views/',
  process: __dirname + '/views/common' 
}))


// 静态资源映射
const staticMap = require('./module/staticMap.js');
app.use(staticMap);


// project config
// render(app,config.renderConf);
app.use(bodyparser());
app.use(json());
app.use(logger());

// 静态目录
app.use(config.staticsConf);

//Terminal print method response time
app.use(function *(next){
  var start = new Date;
  console.log(next);
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

// 
// app.use(auth);

// 路由表
require('./module/enrouten')(router);
app.use(router.routes());

app.on('error', function(err, ctx){
  console.log(err);
  // logger.error('server error', err, ctx);
});

module.exports = app;
// 