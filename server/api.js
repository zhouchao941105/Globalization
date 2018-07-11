/*
    这个文件用来维护api，具体该返回什么数据等等都在这里操作
*/
const trans = require('./db')
let option = {
    //获取分支列表
    getBranchList: async (ctx, next) => {
        ctx.response.body = await trans.distinct('branch').exec()
    },
    //获取模块列表
    getModuleList: async (ctx, next) => {
        ctx.response.body = await trans.distinct('module').exec()
    },
    //获取双语数据
    getData: async (ctx, next) => {
        var query = ctx.request.query
        var dbQuery, tempList
        if (query.module || query.branch) {
            if (query.module) {
                dbQuery = {
                    module: query.module,
                }
            }
            else {
                dbQuery = {
                    branch: query.branch,
                }
            }
        } else {
            if (query.state === true || query.state === false) {
                dbQuery = {
                    state: query.state,
                    name: new RegExp(query.key)
                }
            } else {
                dbQuery = {
                    name: new RegExp(query.key)
                }
            }

        }
        tempList = await trans.find(dbQuery).exec()
        for (var i = 0; i < tempList.length; i++) {
            var k = await trans.find({ name: tempList[i].name }).exec()
            tempList[i].history = k.filter((unit, idx) => k.indexOf(unit) === idx).map(unit => unit.eName)

        }

        ctx.response.body = tempList

    },
    //Todo
    //生效接口（生效）
    //保存接口（未生效）
    //获取同中文名的情况下，之前的翻译
    //
    //
    //
    //
}
module.exports = option