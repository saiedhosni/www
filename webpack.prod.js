'use strict';

const pack = require('./package.json');
const webpack = require('webpack');
const merge = require('webpack-merge');
const glob = require('glob-all');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

// package preamble
const preamble = `/*!\n  ${pack.name} – ${pack.description}\n  ${pack.author.name} ${pack.author.github} ${pack.year} ${pack.license}\n  ${pack.version}\n*/`;

module.exports = (argv) => merge(require('./webpack.common.js')(argv), {
  mode: 'production',
  watch: false,
  output: {
    filename: 'app.min.js'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          output: {
            comments: false,
            preamble: preamble
          }
        }
      })
    ]
  },
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: ['default', {
          discardComments: {
            removeAll: true
          }
        }],
      }
    }),
    new webpack.BannerPlugin({
      raw: true,
      banner: () => {
        return preamble;
      }
    }),
    new MiniCssExtractPlugin({
      filename: '../style/default.min.css'
    }),
    new PurgecssPlugin({
      paths: glob.sync([
        'javascript/src/**/*',
        'page/**/*'
      ], {
        nodir: true
      })
    })
  ]
});
