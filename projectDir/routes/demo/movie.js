var router = require('koa-router')();
var fetch = require('node-fetch');
var co = require('co');
var movieData = require("../../model/movie.js");

module.exports = function *(){
	// Get ../model movie data
	var data = yield movieData,
		movie = data.movie

    yield this.render('page/demo/movie.html', {
    	title: 'heheh',
    	list: movie,
    	version: data.$API_VERSION,
    	commonjs: this.entry.common,
    	entryjs: this.entry.main,
		entryname: this.entry.path
    });
    
}