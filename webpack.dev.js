const path = require('path');

module.exports = {
	mode: 'development',
	watch: true,
	entry: './javascript/script.js',
	output: {
		filename: 'script.min.js',
		path: path.resolve(__dirname, 'javascript')
	}
};