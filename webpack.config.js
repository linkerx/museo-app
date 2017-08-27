var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
    'webpack-dev-server/client?http://emmanozzi.org/',
    './src/index.js',
  ],
  output: {
    path: path.resolve(__dirname,'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
    contentBase: '.',
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader', exclude: /node_modules/,},
      { test: /\.(less|css)$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "less-loader", options: {
                paths: [
                    path.resolve(__dirname, "src/less")
                ]
            }
        }]
      },
      { test: /\.(?:png|jpg|svg)$/, use: 'url-loader'}
    ]
  },
  resolve: {
    modules: [
      path.resolve('./src/components'),
      path.resolve('./less'),
      path.resolve('./node_modules')
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'src/index.html'
  })]
};
