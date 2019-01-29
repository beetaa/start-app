var path = require('path')
var webpack = require('webpack')

var postcssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: [require('autoprefixer')()]
  }
}

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  entry: ['./src/index.ts'],
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
    hot: true, // 开启模块热替换
    disableHostCheck: true // 解决 Invalid Host header
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', postcssLoader]
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', postcssLoader, 'less-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()]
}
