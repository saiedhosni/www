const path = require('path');

module.exports = {
	mode: 'development',
	entry: './javascript/script.js',
	output: {
		filename: 'app.min.js',
		path: path.resolve(__dirname, 'javascript')
	}
};