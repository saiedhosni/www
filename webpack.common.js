'use strict';

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (argv) => ({
  entry: [
    './javascript/src/index.js',
    './style/src/build.less'
  ],
  output: {
    path: path.resolve(__dirname, 'javascript')
  },
  resolve: {
    alias: {
      root: __dirname,
      component: path.resolve(__dirname, 'javascript/src/component/'),
      utils: path.resolve(__dirname, 'javascript/src/utils/')
    }
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
  },
  plugins: [
    new webpack.DefinePlugin({
      build: {
        environment: `"${argv.define.env}"`,
      }
    })
  ]
});
