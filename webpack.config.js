const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");


let pro = process.env.NODE_ENV == "production"?true:false,
	plg;

if(pro){
	plg = [
		new CleanWebpackPlugin(["dist"]),
		new HtmlWebpackPlugin({
			template:path.join(__dirname,"/src/index.html")
		}),
		new MiniCssExtractPlugin({
			filename:"[name].[hash].css",
			chunkFilename:"[id].[hash].css"
		})
	]
}else{
	plg = [
		new HtmlWebpackPlugin({
			template:path.join(__dirname,"/src/index.html")
		}),
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin({
			filename:"[name].css",
			chunkFilename:"[id].css"
		})
	]
}


let config = {
	mode:pro?"production":"development",
	entry:{
		main:['@babel/polyfill','./src/index.js'],
		vendors:['react','react-dom']
	},
	optimization:{
		splitChunks:{
			chunks:"all",
			cacheGroups:{
				vendors:{
					name:"vendors",
					chunks:"all"
				}
			}
		},
		runtimeChunk:{
			name:"mainfest"
		}
	},
	plugins:plg,
	resolve:{
		extensions:['.js','.jsx','.less','.css'],
		alias:{
			'~': path.resolve(__dirname, 'src')
		}
	},
	output:{
		filename:pro?'[name].[hash].js':'[name].js',
		path:path.join(__dirname,'dist'),
		publicPath:pro?'./':'/'
	},
	devtool:pro?false:"inline-source-map",
	module:{
		rules:[
			{
				test:/\.js$/,
				exclude:/node_modules/,
				use:[{
					loader:"babel-loader",
					options:{
						"presets":[
							"@babel/preset-env",
							"@babel/preset-react"
						],
						"plugins":[
							[
								"import",
								{
									"libraryName":"antd",
									"libraryDirectory":"es",
									"style":true
								}
							]
						]
					}
				}]
			},{
				test: /\.(less|css)$/,
				use: [
					pro ? MiniCssExtractPlugin.loader:'style-loader',
					{
						loader: 'css-loader',
						options: {
							minimize: true,
							importLoaders: 1
						}
					}, {
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: (loader)=>[
								require('postcss-preset-env')(),
								  require('cssnano')(),
								require('autoprefixer')()
							]
						}
					}, {
						loader: 'less-loader',
						options: {
							javascriptEnabled: true
						}
					}
				]
			},{
				test:/\.(png|jpg|jpeg|gif)$/,
				use:[{
					loader:"url-loader",
					options:{
						limit:8192
					}
				}]
			},{
				test:/\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader:"file-loader"
			},{
				test:/\.json$/,
				use:"json-loader"
			}
		]
	},
	devServer:{
		contentBase:__dirname+'/src',
		port:"1224",
		historyApiFallback:true,
		hot:true,
		inline:true,
		host:"0.0.0.0",
		proxy:{
			'/api':{
				target:"http://admdev.haoqianbao.com/",
				changeOrigin: true
			}
		}
	}
}

module.exports = config