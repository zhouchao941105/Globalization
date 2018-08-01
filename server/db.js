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
var fs = require('fs')
var path = require('path')
const utils = require('./utils')
function readFile() {
    var cnList = []
    var enList = []
    var cnRes = fs.readFileSync(path.join(__dirname, '../../Docs/lang.cn.js'))
    cnList = cnList.concat(utils.getArrayByLine(cnRes.toString('utf-8', 13, cnRes.length - 28).replace(/\r\n/g, '\r')))


    var enRes = fs.readFileSync(path.join(__dirname, '../../Docs/lang.en.js'))
    enList = enList.concat(utils.getArrayByLine(enRes.toString('utf-8', 13, enRes.length - 28).replace(/\r\n/g, '\r')))
    enList.forEach((item, idx) => {
        var identifer = item.split(':')[0]
        var tempeName = item.split(':')[1].trim()
        var eName = tempeName.slice(1, tempeName.length - 1)
        var name = cnList[idx].split(':')[1].trim()
        if (identifer == cnList[idx].split(':')[0]) {
            //英文和中文索引一样的情况
            trans.create({
                identifer: identifer.trim(),
                name: name.slice(1, name.length - 1),
                eName,
                location: 'Docs',
                module: 'home',
                branch: 'v1.0'
            })
        } else if (cnList.some(unit => unit.split(':')[0] == identifer)) {
            //英文和中文索引不一样的情况
            let tempName = cnList.find(unit => unit.split(':')[0] == identifer).split(':')[1].trim();
            trans.create({
                identifer: identifer.trim(),
                name: tempName.slice(1, tempName.length - 1),
                eName,
                location: 'Docs',
                module: 'home',
                branch: 'v1.0'
            })
        }

    })
}
module.exports = trans