var fetch = require('node-fetch');
const co = require('co');
module.exports = co(function *Movie() {
	//use fetch to get movie data
	var list = yield fetch("http://maoyanapi.vip.sankuai.com/mmdb/movieboard/v1/list.json")
		.then(function(res) {
			return res.json();
		});

	if (list.error) this.error = list.error;

	if(list.data) {
		this.movie = list.data;
	}
	return this;		    
})