var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
    'webpack-dev-server/client?http://locahost:8080/',
    './src/index.js',
  ],
  output: {
    path: path.resolve(__dirname,'public'),
      filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader', exclude: /node_modules/,},
      { test: /\.(less)$/, use: ['style-loader','css-loader','less-loader']},
      { test: /\.(?:png|jpg|svg)$/, use: 'url-loader'}
    ]
  },
  resolve: {
    modules: [
      path.resolve('./src/components'),
      path.resolve('./node_modules')
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'src/index.html'
  })]
}
