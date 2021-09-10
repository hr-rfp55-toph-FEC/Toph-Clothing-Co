const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.js`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'client', 'dist'),
    },
    compress: true,
    port: 9000,
  },
  resolve: { extensions: ['.js', '.jsx'] },
  plugins: [new ESLintPlugin()],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
};
