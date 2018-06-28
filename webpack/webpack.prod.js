const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: [
    './index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      src: path.resolve(__dirname, 'src/'),
      ui: path.resolve(__dirname, 'src/components/common/'),
      components: path.resolve(__dirname, 'src/components/'),
      utils: path.resolve(__dirname, 'src/utils/'),
      constant: path.resolve(__dirname, 'src/constant/'),
      containers: path.resolve(__dirname, 'src/containers/'),
      reducers: path.resolve(__dirname, 'src/reducers/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin(['API_URL']),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Study Front',
      filename: 'index.html',
      template: path.join(__dirname, 'index.template.ejs'),
      minify: false,
      hash: true,
      inject: 'body',
    }),
  ],
};
