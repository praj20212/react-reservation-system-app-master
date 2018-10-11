var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractStyle = new ExtractTextPlugin({
    filename: "css/bundle.min.css"
});

var loaders = [
	{
	    test: /\.css$/,
	    loader: extractStyle.extract({
	        use: [{
	            loader: "css-loader"
	        }, {
	            loader: 'postcss-loader',
	            options: {
	                plugins: function () {
	                    return [
              require('autoprefixer')
	                    ];
	                }
	            }
	        }],
	        fallback: "style-loader"
	    })
	},
	{
	    test: /\.less$/,
	    loader: extractStyle.extract({
	        use: [{
	            loader: "css-loader"
	        }, {
	            loader: 'postcss-loader',
	            options: {
	                plugins: function () {
	                    return [
              require('autoprefixer')
	                    ];
	                }
	            }
	        }, {
	            loader: "less-loader"
	        }],
	        // use style-loader in development
	        fallback: "style-loader"
	    })
	},
	{
	    test: /\.js(x?)$/,
	    include: path.join(__dirname, 'src'),
	    use: [
          {
              loader: 'babel-loader'
          }
	    ]
	},
  {
      test: /\.(jpg|png|gif)$/,
      use: 'file-loader'
  }, {
      test: /\.(woff|woff2|eot|ttf|svg)$/,
      use: {
          loader: 'url-loader',
          options: {
              limit: 100000
          }
      }
  }
]

module.exports = {
    devtool: 'eval',
    cache: false,
    entry: [
		'webpack-hot-middleware/client?reload=true',
		'./src/client/index.jsx'
    ],
    output: {
        path: path.join(__dirname, './src/client/assets'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
		extractStyle,
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/) // Ignore all optional deps of moment.js
    ],
    module: {
        rules: loaders
    },
    resolve: {
        modules: [
     path.join(__dirname, "src"),
		 "node_modules"
        ],
        extensions: ['.jsx', '.js']
    }
};
