const path = require('path');
var webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: './frontend/timejoy.jsx',
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'bundle.js'
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
          plugins: ["transform-object-rest-spread"]
        }
      },
      {
        include: /\.json$/,
        loaders: ["json-loader"]
      }
    ]
  },
  devtool: 'source-maps'
};
