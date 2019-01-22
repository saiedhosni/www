const path = require('path');
const package = require('./package.json');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  extends: path.resolve(__dirname, 'webpack.dev.js'),
  mode: 'production',
  watch: false,
  entry: [
    './javascript/src/index.js',
    './style/less/build.less'
  ],
  output: {
    filename: 'app.min.js'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          output: {
            comments: false,
            preamble: `/*!\n  ${package.name} – ${package.description}\n  ${package.author.name} ${package.author.github} ${package.year} ${package.license}\n  ${package.version}\n*/`
          }
        }
      })
    ]
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
          loader: 'less-loader',
          options: {
            relativeUrls: false
          }
        }
      ]
    }]
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
    new MiniCssExtractPlugin({
      filename: '../style/default.min.css'
    })
  ]
};
