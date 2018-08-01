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

module.exports = {
    getBranchList
}