const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const mobile = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: path.resolve(__dirname, '../cordova/platforms/ios/www'),
    // path: path.resolve(__dirname, '../cordova/www'),
    publicPath: '',
  },
};

const merged = merge(baseConfig, mobile);

module.exports = merged;

