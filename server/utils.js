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

module.exports = {
    getBranchList,
    getArrayByLine
}