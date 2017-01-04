module.exports = function *(){
    yield this.render('page/test/hell.html', {
    	commonjs: this.entry.common,
    	entryjs: this.entry.main,
        entryname: this.entry.path
    });
}