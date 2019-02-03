// var webpack = require('webpack')
var merge = require('webpack-merge')
var common = require('./webpack.common.js')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    })
  ]
})
