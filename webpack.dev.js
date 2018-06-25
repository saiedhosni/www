const path = require('path');

module.exports = {
	mode: 'development',
	watch: true,
	entry: './javascript/script.js',
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, 'javascript')
	}
};