const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const package = require('./package.json');

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
      new uglify({
        parallel: true,
        uglifyOptions: {
          output: {
            comments: false,
            preamble: `/*!\n  ${package.name} – ${package.description}\n  ${package.author.name} ${package.author.github} 2018 ${package.license}\n  ${package.version}\n*/`
          }
        }
      })
    ]
  }
};
