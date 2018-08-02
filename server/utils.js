const shell = require('shelljs');
const config = require('config');
/**
 *返回工程目录的git 分支信息
 *
 * @returns {Array} 分支数组
 */
function getBranchList() {
    if (!shell.which('git')) {
        shell.echo('Sorry, this script requires git');
        shell.exit(1);
        return [];
    }
    shell.cd(config.get('projectPath'));
    shell.exec('git fetch');
    let branches = shell.exec('git branch').stdout.split('\n').filter(i => i.trim().startsWith('v')).map(i => i.trim());
    return branches;
}
/**
 *将文本按照每行分割成数组
 *
 * @param {String} text 待分割文本
 * @returns {Array} 分割结果
 */
function getArrayByLine(text) {
    return text.replace(/\r\n/g, '\r').replace(/\n/g, '\r').split(',\r')
}
/**
 *获取项目中的语言包路径
 *
 * @returns {Array} 语言包路径集合
 */
function getLangPathStore() {
    const platformArr = ["pc", "mobile"],
        langDirArr = ["apps", "components"],
        filePathArr = [];
    platformArr.forEach(platform => {
        langDirArr.forEach(dir => {
            filePathArr.push(config.get('projectPath') + `Myth.SIS.Web/fe_${platform}/fe/${dir}/`)
        })
    })
    let arr = shell.find(filePathArr).filter(file => {
        return file.match(/lang.*\.js$/)
    });
    return arr;
}

module.exports = {
    getBranchList,
    getArrayByLine,
    getLangPathStore
}