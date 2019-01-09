var path = require('path')
var webpack = require('webpack')

var VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.vue', '.ts', '.js', '.json']
  },
  entry: [
    './src/index.ts'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    host: '127.0.0.1',
    port: '3000',
    contentBase: './dist',
    hot: true,  // 开启模块热替换
    disableHostCheck: true,  // 解决 Invalid Host header
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/.vue$/]
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}