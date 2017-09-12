var path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    'webpack-dev-server/client?http://dev.emmanozzi.org/',
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
      template: 'src/index.html',
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true
      }
    }),
  new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true
      },
      output: {
          comments: false
      }
  }),
  new CompressionPlugin({
              asset: '[path].gz[query]',
              algorithm: 'gzip',
              test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
              threshold: 10240,
              minRatio: 0.8
  }),
  new webpack.DefinePlugin({
    'lnk_api_host': "'http://admin.emmanozzi.org'",
    'lnk_api_dir': "'/api'",
  })

]
};
