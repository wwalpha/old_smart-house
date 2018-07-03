const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');

module.exports = {
  entry: [
    './index.tsx',
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      src: path.resolve(__dirname, '../src/'),
      utils: path.resolve(__dirname, '../src/utils/'),
      components: path.resolve(__dirname, '../src/components/'),
      actions: path.resolve(__dirname, '../src/actions/'),
      models: path.resolve(__dirname, '../src/models/'),
      ActionTypes: path.resolve(__dirname, '../src/constants/ActionTypes'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: [
                '@babel/plugin-syntax-typescript',
                ["@babel/plugin-syntax-decorators", { "legacy": true }],
                '@babel/plugin-syntax-jsx',
                'react-hot-loader/babel',
              ],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              happyPackMode: true
            }
          }
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'source-map-loader',
        enforce: 'pre',
      },
    ]
  },
  plugins: [
    new HappyPack({
      loaders: ['babel-loader', 'ts-loader'],
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'GoogleHome Chat',
      filename: 'index.html',
      template: path.join(__dirname, '../index.template.ejs'),
      minify: false,
      hash: true,
      inject: 'body',
    }),
    new webpack.LoaderOptionsPlugin({
      debug: false,
    }),
  ],
  bail: true,
};

