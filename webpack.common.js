var path = require('path')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  resolve: {
    extensions: ['.vue', '.ts', '.js', '.json'],
    mainFiles: ['index']
  },
  entry: {
    app: './src/app.ts',
    landing: './src/landing.ts'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        // 应用到普通的 ts 文件，以及 vue 组件中的 ts 代码块
        test: /\.ts$/,
        loader: 'ts-loader',
        options: { appendTsSuffixTo: [/\.vue$/] }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        // 应用到普通的 css 文件，以及 vue 组件中的 css 样式
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader']
      },
      {
        // 应用到普通的 less 文件，以及 vue 组件中的 less 样式
        test: /\.less$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.pug$/,
        oneOf: [
          // 这条规则应用到 Vue 组件内的 `<template lang="pug">`
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader']
          },
          // 这条规则应用到 JavaScript 内的 pug 导入
          {
            use: ['raw-loader', 'pug-plain-loader']
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },
      {
        test: /\.(mp3|ogg|wav)$/,
        use: ['file-loader']
      },
      {
        test: /\.(mp4|mpg|avi)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'template.landing.html',
      title: '主页',
      chunks: ['landing'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: 'template.app.html',
      title: '应用',
      chunks: ['app'],
      filename: 'app.html'
    })
  ]
}
