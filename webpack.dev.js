var path = require('path')
var webpack = require('webpack')

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.js', '.json']
  },
  entry: [
    './src/index.js'
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
    disableHostCheck: true  // 解决 Invalid Host header
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
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
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}