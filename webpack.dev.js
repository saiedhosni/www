'use strict';

const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (argv) => merge(require('./webpack.common.js')(argv), {
  mode: 'development',
  watch: true,
  output: {
    filename: 'app.js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../style/default.css'
    })
  ]
});
