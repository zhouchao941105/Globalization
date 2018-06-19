var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
// var proxy = require('express-http-proxy');
mongoose.connect('mongodb://localhost')
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'error aaa'));
db.once('open', () => {
    console.log('ok');
})
var kittySchema = mongoose.Schema({
    name: String,
    school: String
})
// kittySchema.methods.speak = function () {
//     var greet = this.name ? "Meow name is" + this.name : "no Name"
//     console.log(greet);
// }
var kitty = mongoose.model('Kitty', kittySchema);
// var arr = [{ name: 'zhouchao0', school: '北京校区' }, { name: 'zhouchao1', school: '北京校区' }, { name: 'zhouchao2', school: '北京校区' }]
// kitty.find(function (err, list) {
//     if (err) return console.log(err);
//     kitty.collection.insert(arr, (err, docs) => {
//     })
// })

// var instance = new kitty({
//     name: 'zhouchao',
//     school: '北京校区'
// })
// // instance.speak();
// instance.save(function (err, ins) {
//     if (err) return console.log(err);
//     // ins.speak();
// })
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