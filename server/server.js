const Koa = require('koa');
const Router = require('koa-router')()
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var fs = require('fs')
var path = require('path')
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
    location: String
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
// var json = require(path.join(__dirname,'../../docs/lang.cn.js'))
// console.log(jaa['导航名称']);
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
        if (!enList[idx]) {
            debugger
        }
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
var proxy = require('express-http-proxy');

var app = new Koa();
var host = '127.0.0.1';
var port = 9090;
// Router.get('/', async (ctx, next) => {
//     try {
//         await next();
//     } catch (err) {
//         ctx.response.status = err.statusCode || err.status || 500;
//         ctx.response.body = {
//             message: err.message
//         };
//     }
// })
Router.get('/branchList', async (ctx, next) => {
    ctx.response.body = await trans.distinct('branch').exec()
    // next()

})
Router.get('/moduleList', async (ctx, next) => {
    ctx.response.body = await trans.distinct('module').exec()
})
Router.get('/data', async (ctx, next) => {
    var query = ctx.request.query
    var dbQuery
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
    ctx.response.body = await trans.find(dbQuery).exec()
})
app
    .use(Router.routes())
    .use(Router.allowedMethods());
// app.all('*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By", ' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.get('/branchList', (req, res) => {
//     trans.distinct('branch').exec((err, data) => {
//         res.send(data)
//     })
// })
// app.get('/moduleList', (req, res) => {
//     trans.distinct('module').exec((err, data) => {
//         res.send(data)
//     })
// })
// app.get('/data', function (req, res) {
//     var query = req.query
//     var dbQuery
//     if (query.module || query.branch) {
//         if (query.module) {
//             dbQuery = {
//                 module: query.module,
//             }
//         }
//         else {
//             dbQuery = {
//                 branch: query.branch,
//             }
//         }
//     } else {
//         if (query.state === true || query.state === false) {
//             dbQuery = {
//                 state: query.state,
//                 name: new RegExp(query.key)
//             }
//         } else {
//             dbQuery = {
//                 name: new RegExp(query.key)
//             }
//         }

//     }
//     trans.find(dbQuery, function (err, list) {
//         if (err) return console.log(err);
//         res.send(list)
//     })
// })
//Todo
//生效接口（生效）
//保存接口（未生效）
//获取同中文名的情况下，之前的翻译
//
//
//
//
app.listen(port, host, function (req, res) {
    console.log(`running at ${port}`);
})