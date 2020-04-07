const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackNotifierPlugin = require('webpack-notifier');
const path = require('path');
const common = require('./common.js');

console.log(process.cwd());

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: [
    'webpack-hot-middleware/client?overlay=false',
    path.resolve(process.cwd(), 'src/client'),
  ],
  cache: true,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new WebpackNotifierPlugin({
      excludeWarnings: true,
      title: `${process.cwd().split('/').pop()}`,
    }),
  ],
});
