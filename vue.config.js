const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        // target:process.env.VUE_APP_BASE_URL,//http://localhost:9898/api
        target: 'http://localhost:8989',//http://localhost:9898/api
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/foo': {
        target: 'http://www.baidu.com'
      }
    }
  }
})
