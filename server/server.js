/*
    这个文件是启动HTTP服务，设置路由，具体操作由api文件维护
*/
const Koa = require('koa');
const Router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
// var bodyParser = require('body-parser')
const api = require('./api')
console.log(api);
var app = new Koa();
var host = '127.0.0.1';
var port = 9090;
app.use(bodyParser())
Router.get('/branchList', api.getBranchList)
Router.get('/moduleList', api.getModuleList)
Router.post('/syncData', api.syncData)
Router.post('/data', api.getData)
Router.post('/getTransTotalList', api.getTransTotalList)
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


app.listen(port, host, function (req, res) {
    console.log(`running at ${port}`);
})