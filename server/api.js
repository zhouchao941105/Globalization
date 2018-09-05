/*
    这个文件用来维护api，具体该返回什么数据等等都在这里操作
*/
const { trans, user } = require('./db')
const utils = require('./utils')

const { readFile, writeFile } = require('./fileIO');
let option = {

    getTransTotalList: async (ctx) => {
        let { key, pageIdx, pageSize } = ctx.request.body, dbQuery = {};
        if (key) {
            dbQuery = {
                name: new RegExp(key)
            }
        }
        let count,
            piplineArr = [
                {
                    $group: {
                        _id: "$identifer",
                        total: { $sum: 1 },
                        pathArr: { $push: "$location" },
                        eName: { $first: "$eName" },
                        name: { $first: "$name" },
                    }
                },

            ],
            tempList = await trans.aggregate(piplineArr);
        count = tempList.length;
        piplineArr = piplineArr.concat([
            { $sort: { total: -1 } }
        ]);
        tempList = await trans.aggregate(piplineArr).skip(pageSize * (pageIdx - 1)).limit(pageSize);

        ctx.response.body = { list: tempList, currentIdx: pageIdx, totalCount: count }
    },
    //获取分支列表
    getBranchList: async (ctx, next) => {
        ctx.response.body = await utils.getBranchList(1);
    },
    //获取模块列表
    getModuleList: async (ctx, next) => {
        ctx.response.body = await trans.distinct('module').exec()
    },
    //获取双语数据
    getData: async (ctx, next) => {

        var query = ctx.request.body
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
        let count = await trans.count(dbQuery)
        tempList = await trans.find(dbQuery).skip(query.page.pageSize * (query.page.pageIdx - 1)).limit(query.page.pageSize).exec()
        for (var i = 0; i < tempList.length; i++) {
            //调试
            var k = await trans.find({ name: tempList[i].name }).exec()
            tempList[i].history = k.map(unit => unit.eName).filter((unit, idx, arr) => arr.indexOf(unit) === idx)

        }

        ctx.response.body = { list: tempList, currentIdx: query.page.pageIdx, totalCount: count }

    },
    syncData: async (ctx, next) => {
        let branch = utils.getCurrentBranch();
        await trans.find(function (err, list) {
            if (err) return console.log(err)
            // if (list.length === 0) {
            let stor = utils.getLangPathStore();
            stor = stor.map(item => {
                let path = item.split('/');
                path.pop();
                return path.join('/')
            })
            //去重
            stor = [...new Set(stor)];
            ctx.response.body = { msg: 'langPathStore Finish' };
            stor.forEach(async path => {
                await readFile(path, branch);
            })
            console.log('langPathStore Finish');
            // next();
            // } else {
            //     ctx.response.body = { msg: 'langPathStore already exist' };
            //     // next();
            // }

        })
    },
    //获取当前登录人
    getCurrentUser: async (ctx) => {
        ctx.response.body = {
            name: ctx.session.name,
            isAdmin: ctx.session.isAdmin
        }
    },
    //登录
    login: async (ctx) => {
        let { name, password } = ctx.request.body;
        let loginUser = await user.findOne({ username: name }).exec()
        if (loginUser && loginUser.password === password) {
            ctx.session = {
                name,
                password,
                isAdmin: loginUser.isAdmin
            }
            ctx.body = true
        }
        else {
            // ctx.body = false
            ctx.throw(401, 'wrong password')
        }
    },
    //导出
    export: async (ctx) => {
        let wholeList = await trans.find({ state: true }).exec()
        let inputstrCn = ''
        wholeList.forEach(item => {
            inputstrCn += "'" + item.identifer + "':'" + item.name + "',\n"
        })
        let inputstrEn = ''
        wholeList.forEach(item => {
            inputstrEn += "'" + item.identifer + "':'" + item.eName + "',\n"
        })
        //todo根据location分组
        let arrObj = {}
        let locationList = [... new Set(wholeList.map(item => item.location))]
        locationList.forEach(item => {
            arrObj[item] = wholeList.filter(unit => unit.location == item)
        })
        for (let i in arrObj) {
            writeF(true, i)
            writeF(false, i)
        }
        function writeF(flg, i) {
            let cnOutput = ''
            arrObj[i].forEach(item => {
                cnOutput += "'" + item.identifer + "':'" + item[flg ? 'name' : 'eName'] + "',\n"
            })
            let cnOut = `let $lang={
                ${cnOutput}
            }
            export default $lang`
            // console.log(`../${i}${flg ? '/lang.c.js' : '/lang.e.js'}`);
            writeFile(`../${i}${flg ? '/lang.c.js' : '/lang.e.js'}`, cnOut)
        }

        ctx.response.body = true

    },
    //生效接口（生效）
    enable: async (ctx, next) => {
        let req = ctx.request.body.list
        req.forEach(async (item) => {
            await trans.findByIdAndUpdate(item, { state: true }).exec()
        })
        ctx.response.body = true
    },
    //保存接口（未生效）
    save: async (ctx, next) => {
        let req = ctx.request.body.list
        req.forEach(async (item) => {
            await trans.findByIdAndUpdate(item._id, { eName: item.eName, state: false }).exec()
        })
        ctx.response.body = true
    }
}
module.exports = option