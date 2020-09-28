const path = require('path')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports={
	mode: 'development',
	devtool: 'source-map',
	context: path.resolve(__dirname, 'src'),
	entry: ['./index.js', './style.scss'],

	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 3000
	},

	module: {
		rules: [
			{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
			},
			{
			test: /\.(scss|css)/,
				exclude: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							reloadAll: true
						}
					},
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			}
		]
	},
	plugins: [
		new MinifyPlugin({}, {
			comments: false
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new HtmlWebpackPlugin({
			title: 'Home',
			template: 'views/index.html',
			filename: 'index.html',
			minify: true
		}),
		new HtmlWebpackPlugin({
			title: 'About',
			template:'views/about.html',
			filename: 'about.html',
			minify: true
		})
	]
}
