/*
    这个文件单独拎出来，为了把读取文案的部分与其他服务区分开来，在这里可以更独立的做一些测试等等
*/
const trans = require('./db')
var fs = require('fs')
var path = require('path')
function readFile() {
    var cnList = []
    var enList = []
    var cnRes = fs.readFileSync(path.join(__dirname, '../../Docs/lang.cn.js'))
    cnList = cnList.concat(cnRes.toString('utf-8', 13, cnRes.length - 28).split(',\r'))


    var enRes = fs.readFileSync(path.join(__dirname, '../../Docs/lang.en.js'))
    enList = enList.concat(enRes.toString('utf-8', 13, enRes.length - 28).split(',\r'))
    enList.forEach((item, idx) => {
        var identifer = item.split(':')[0]
        var eName = item.split(':')[1]
        var name = cnList[idx].split(':')[1]
        if (identifer == cnList[idx].split(':')[0]) {
            trans.create({
                identifer: identifer.trim(),
                name,
                eName,
                location: 'Docs',
                module: 'home',
                branch: 'v1.0'
            })
        } else if (cnList.some(unit => unit.split(':')[0] == identifer)) {
            trans.create({
                identifer: identifer.trim(),
                name: cnList.find(unit => unit.split(':')[0] == identifer).split(':')[1],
                eName,
                location: 'Docs',
                module: 'home',
                branch: 'v1.0'
            })
        }

    })
}