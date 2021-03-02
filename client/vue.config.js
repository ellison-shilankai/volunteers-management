const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    proxy: process.env.VUE_APP_MOCK_SERVER
  },
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      // 需要重启 IDE
      // .set('styles',resolve('src/assets/styles'))
      // 这里只写了两个个，你可以自己再加，按这种格式.set('', resolve(''))
  }
}