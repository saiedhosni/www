const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: './javascript/src/script.js',
	output: {
		filename: 'app.min.js',
		path: path.resolve(__dirname, 'javascript')
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
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