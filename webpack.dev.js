var webpack = require('webpack')
var merge = require('webpack-merge')
var common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    port: '8080',
    contentBase: './dist',
    hot: true, // 开启模块热替换
    disableHostCheck: true // 解决 Invalid Host header
  },
  plugins: [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()]
})
