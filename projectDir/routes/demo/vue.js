module.exports = function *(){
    yield this.render('page/demo/vue.html', {
    	commonjs: this.entry.common,
    	entryjs: this.entry.main,
        entryname: this.entry.path
    });
}