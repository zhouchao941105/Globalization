/*
    这个文件单独拎出来，为了把读取文案的部分与其他服务区分开来，在这里可以更独立的做一些测试等等
*/
const trans = require('./db')
var fs = require('fs')
const utils = require('./utils')
async function readFile(_path) {
    var cnList = []
    var enList = []
    var cnRes = fs.readFileSync(_path)
    try {
        if (!cnRes.toString('utf-8').match(/\{(.|\n|\r\n)+\}/g)) return;
        let cnObj = cnRes.toString('utf-8').match(/\{(.|\n|\r\n)+\}/g)[0];
        cnObj = cnObj.slice(1, cnObj.length - 1)
        cnList = cnList.concat(utils.getArrayByLine(cnObj))


        var enRes = fs.readFileSync(_path)
        let enObj = enRes.toString('utf-8').match(/\{(.|\n|\r\n)+\}/g)[0];
        enObj = enObj.slice(1, enObj.length - 1)
        enList = enList.concat(utils.getArrayByLine(enObj))
        enList.forEach(async (item, idx) => {
            var identifer = item.split(':')[0]
            var tempeName = item.split(':')[1] ? item.split(':')[1].trim() : '';
            var eName = tempeName.slice(1, tempeName.length - 1)
            var name = cnList[idx].split(':')[1] ? cnList[idx].split(':')[1].trim() : '';
            if (identifer == cnList[idx].split(':')[0]) {
                //英文和中文索引一样的情况
                await trans.create({
                    identifer: identifer.trim(),
                    name: name.slice(1, name.length - 1),
                    eName,
                    location: _path,
                    module: 'home',
                    branch: 'master'
                });
            } else if (cnList.some(unit => unit.split(':')[0] == identifer)) {
                //英文和中文索引不一样的情况
                let tempName = cnList.find(unit => unit.split(':')[0] == identifer).split(':')[1].trim();
                await trans.create({
                    identifer: identifer.trim(),
                    name: tempName.slice(1, tempName.length - 1),
                    eName,
                    location: _path,
                    module: 'home',
                    branch: 'master'
                });
            }
        })
    } catch (error) {
        console.log(error + ',path:' + _path);
    }




}
module.exports = readFile