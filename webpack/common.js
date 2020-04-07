const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const isDev = process.env.APP_ENV === 'development';

module.exports = {
  context: path.resolve(process.cwd()),
  output: {
    path: path.resolve(process.cwd(), 'public'),
    publicPath: '/',
    filename: isDev ? '[name].js' : '[name].[contenthash].js',
    chunkFilename: isDev ? '[name].chunk.js' : '[name].[contenthash].chunk.js',
    pathinfo: false,
  },
  module: {
    rules: require('./loaders'),
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new StyleLintPlugin({
      failOnError: false,
      files: '**/*.styled.js',
    }),
    new ManifestPlugin({
      fileName: path.resolve(process.cwd(), 'public/webpack-assets.json'),
      filter: file => file.isInitial,
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      APP_ENV: JSON.stringify(process.env.APP_ENV || 'development'),
    }),
    new webpack.DefinePlugin({
      RUNTIME_ENV: JSON.stringify('client'),
    }),
  ],
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  resolve: {
    modules: ['src', 'node_modules'],
    descriptionFiles: ['package.json'],
    extensions: ['.js', '.jsx', '.json'],
    alias: require('./alias'),
  },
  stats: {
    entrypoints: false,
  },
  node: {
    fs: 'empty',
    vm: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};
