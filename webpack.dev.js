const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'client', 'dist'),
    },
    compress: true,
    port: 9000,
    open: true,
  },
  plugins: [new ESLintPlugin()],
});
