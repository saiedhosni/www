const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');

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
            comments: false
          }
        }
      })
    ]
  }
};
