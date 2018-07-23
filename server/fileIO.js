/*
    这个文件单独拎出来，为了把读取文案的部分与其他服务区分开来，在这里可以更独立的做一些测试等等
*/
const trans = require('./db')
console.log(trans);

module.exports = readFile