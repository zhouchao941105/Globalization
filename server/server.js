// import jaa from '../../Docs/lang.cn'

var express = require('express');
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
    state: Boolean
})
var trans = mongoose.model('Trans', transSchema);
// var instance = new trans({
//     identifer: '系统首页',
//     name: '首页',
//     eName: 'Homepage',
//     module: 'home',
//     branch: '1.0',
//     state: true
// })
trans.find(function (err, list) {
    if (err) return console.log(err)
    if (list.length === 0) {
        // instance.save(function (err, ins) {
        //     if (err) return console.log(err);
        // })
        trans.create({
            identifer: '系统首页',
            name: '首页',
            eName: 'Homepage',
            module: 'home',
            branch: '1.0',
            state: true
        })
    }

})
// var json = require(path.join(__dirname,'../../docs/lang.cn.js'))
// console.log(jaa['导航名称']);
var cnList = []
var enList = []
var cnRes = fs.readFileSync(path.join(__dirname, '../../docs/lang.cn.js'))
// console.log(cnRes.toString('utf-8',13,cnRes.length-28).split(','));
cnList = cnList.concat(cnRes.toString('utf-8', 13, cnRes.length - 28).split(','))
// cnList.concat([1,2,3])
// console.log(err);
// var res=data   
// console.log(res);
// cnList=cnList.concat(res.split(','))
// console.log(i.length);
// console.log(i[0],i[i.length-1]);
// i.forEach((item,idx,arr)=>{
//     var temp=item.split(':')
//     // console.log(item.split(':')[0],item.split(':')[1]);
//     // arr[idx].replace('\r\n\t','')
//     kitty.create({identifer:temp[0]&&temp[0].trim(),name:temp[1]&&temp[1].trim()},(err,list)=>{
//         err&&console.log(err);
//     })
// })

// })

var enRes = fs.readFileSync(path.join(__dirname, '../../Docs/lang.en.js'))
enList = enList.concat(enRes.toString('utf-8', 13, enRes.length - 28).split(','))
cnList.forEach((item, idx) => {
    var identifer = item.split(':')[0]
    var name = item.split(':')[1]
    var eName = enList[idx].split(':')[1]
    identifer == enList[idx].split(':')[0] && trans.create({
        identifer,
        name,
        eName
    })
})
var proxy = require('express-http-proxy');

var app = express();
var host = '127.0.0.1';
var port = 9090;

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/get', function (req, res) {
    // switch (+req.url.split('?')[1].split('=')[1]) {
    //     case 0: res.send('hh0'); break;
    //     case 1: res.send('hh1'); break;
    //     case 2: res.send('hh2'); break;
    // }
    kitty.find(function (err, list) {
        if (err) return console.log(err);
        res.send(list.filter(item => item.name.indexOf(req.query.type) !== -1))
    })
})
app.post('/create', (req, res) => {
    kitty.collection.insert([req.body], (err, docs) => {
        if (err) {
            res.send(err)
        }
        console.log(docs);
        res.send(true)
    })
})
app.get('/delete', function (req, res) {
    kitty.remove({ id: req.query.id }, err => {
        if (err) {
            res.send('error')
        } else {
            res.send(true)
        }
    })
})
app.listen(port, host, function (req, res) {
    console.log(`running at ${port}`);
})