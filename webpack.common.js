'use strict';

const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => ({
  entry: [
    './javascript/src/index.js',
    './style/src/build.less'
  ],
  output: {
    path: path.resolve(__dirname, 'javascript')
  },
  module: {
    rules: [{
      test: /\.(less|css)$/,
      use: [
        MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: {
            url: false
          }
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              autoprefixer()
            ]
          }
        }, {
          loader: 'less-loader',
          options: {
            relativeUrls: false
          }
        }
      ]
    }, {
      test: /\.(scss)$/,
      use: [{
        loader: 'sass-loader'
      }]
    }]
  }
});
