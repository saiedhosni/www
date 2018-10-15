const path = require('path');

module.exports = {
  mode: 'development',
  watch: true,
  entry: './javascript/src/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'javascript')
  }
};
