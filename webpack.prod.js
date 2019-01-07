const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
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
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}