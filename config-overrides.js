const { injectBabelPlugin } = require('react-app-rewired')
const rewireLess = require('react-app-rewire-less')
module.exports = function override(config, env) {
    //antd按需打包
    config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }], config)
    config = rewireLess.withLoaderOptions({
        modifyVars: { "@primary-color": "#ff7500" },
    })(config, env)
    console.log(config);
    return config
}