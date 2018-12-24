const path = require('path');
const package = require('./package.json');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  extends: path.resolve(__dirname, 'webpack.dev.js'),
  mode: 'production',
  watch: false,
  entry: './javascript/src/index.js',
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
            preamble: `/*!\n  ${package.name} – ${package.description}\n  ${package.author.name} ${package.author.github} 2018 ${package.license}\n  ${package.version}\n*/`
          }
        }
      })
    ]
  }
};
