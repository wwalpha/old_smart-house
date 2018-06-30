const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const dev = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
  ],
};

const merged = merge(baseConfig, dev);

console.log(merged);

module.exports=merge(baseConfig, dev);
