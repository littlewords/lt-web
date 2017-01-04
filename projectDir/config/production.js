const _path = require("path");
const statics = require('koa-static');

var webpack = require('webpack');
var fs = require('fs');

// 从json中读取入口表
var root = _path.join(__dirname, '../');
var entryPath = _path.join(root, 'webpack_entry.json');
var entryString = fs.readFileSync(entryPath, 'utf8');
var entry = JSON.parse(entryString);

var ManifestPlugin = require('webpack-manifest-plugin');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common', 'common_[chunkhash].js');
var manifestPlugin = new ManifestPlugin({
	// publicPath: '/build/',
	publicPath: '//s0.meituan.net/bs/js?f=wm/inode_lfs:/build/'
});
module.exports = {

	port : process.env.PORT || 3000,

	env : 'develop',

	staticsConf: statics(_path.join(__dirname, '../client')),

    webpack: {
	    //插件项
	    plugins: [
	        commonsPlugin,
	        manifestPlugin
	    ],
	    //页面入口文件配置
	    entry: entry,
	    //入口文件输出配置
	    output: {
	        path: './client/build/',
	        filename: 'page[name]_[chunkhash].js'
	    },
	    module: {
	        //加载器配置
	        loaders: [
	            { test: /\.css$/, loader: 'style-loader!css-loader' },
	            { 
	                test: /\.js$/, 
	                loader: 'babel-loader',
	                exclude: function(path) {
	                  // 路径中含有 node_modules 的就不去解析。
	                  var isNpmModule = !!path.match(/node_modules/);
	                  return isNpmModule;
	                }
	            },
	            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
	            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
	            { test: /\.vue$/, loader: 'vue'}
	        ]
	    },
	    watch: false
	}
};