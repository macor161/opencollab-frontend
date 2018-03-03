const webpack = require('webpack');
let path = require('path');
let CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	context: path.join(__dirname, '../app'),
	devtool: 'inline-source-map',
	target: 'web',
	entry: {
		'app': [
			'babel-polyfill',
			'react-hot-loader/patch',
			'webpack-dev-server/client?http://localhost:8080',
			'webpack/hot/only-dev-server',
			'./src/main/js/index.js',
		],
	},
	node: {
		fs: "empty",
		child_process: "empty"
	},
	output: {
		path: path.resolve(__dirname, './app/build'),
		filename: 'app.bundle.js',
		publicPath: 'http://localhost:8080/',
	},
	devServer: {
		hot: true,
		publicPath: 'http://localhost:8080/',
		historyApiFallback: true,
	},
	module: {
		loaders: [
			{
				exclude: [/node_modules/, /opencollab-lib/],
				test : /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-1'],
					plugins: ["transform-decorators-legacy"]
				}
			},
			{
				exclude: [/node_modules/, /opencollab-lib/],
				use: [
					{ loader: 'style-loader'},
					{ loader: 'css-loader'}
				],
				test: /\.css$/
			},
			{
				test: /\.(png|jpg|svg)$/,
				exclude: [/node_modules/, /opencollab-lib/],
				use: {
				  loader: "url-loader",
				  
				},
			}			
		],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new CopyWebpackPlugin([
            {from: './src/main/app.js'},
            {from: './src/main/index.html'},
            {from: './src/main/res', to: 'res'}
		]),
	],
};
