var webpack = require('webpack');
var path = require('path');

var srcPath = path.join(__dirname, "src");

var config = {
  entry: [
    path.join(srcPath, 'index.js')
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },

  resolve: {
    modulesDirectories: ['node_modules', srcPath],
    extensions: ['', '.js']
  },

  plugins: [
      new webpack.NoErrorsPlugin()
  ], // add all common plugins here

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ] // add all common loaders here
  }
}

// add hotloading
config.entry.unshift("webpack-hot-middleware/client?reload=true");

// Add dev plugins
config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    __CLIENT__: true,
    __SERVER__: false,
    __DEVELOPMENT__: true,
    __DEVTOOLS__: false
  })
]);

module.exports = config;
