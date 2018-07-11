/*
    这个文件主要是数据库相关的部分，包括数据库连接、schema定义、初始化等等
*/
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost')
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'error aaa'));
db.once('open', () => {
    console.log('ok');
})
var transSchema = mongoose.Schema({
    identifer: String,
    name: String,
    eName: String,
    module: String,
    branch: String,
    state: Boolean,
    location: String,
    history: Array
})
var trans = mongoose.model('Trans', transSchema);
trans.find(function (err, list) {
    if (err) return console.log(err)
    if (list.length === 0) {
        // instance.save(function (err, ins) {
        //     if (err) return console.log(err);
        // })
        // trans.create({
        //     identifer: '系统首页',
        //     name: '首页',
        //     eName: 'Homepage',
        //     module: 'home',
        //     branch: '1.0',
        //     state: true
        // })
        readFile()
    }

})
module.exports = trans