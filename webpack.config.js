const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env = {}) => {

  console.log(env);
  let doMinimize = false;

  const plugins = [
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new ExtractTextPlugin({ filename: '[name].bundle.css', allChunks: true }),
  ];

  if (doMinimize) {
    plugins.push(
      new webpack.LoaderOptionsPlugin({ minimize: true, debug: false })
    );
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true
        },
        output: {
          comments: false
        }
      })
    );
  }

  return {
    entry: {
      app: ['./client/index.js'],
    },
    devServer: {
      open: true,
      contentBase: './',
      noInfo: true,
      port: 3399,
      compress: false,
      inline: true,
      //hot: !isProd,
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      chunkFilename: '[id].chunk.js',
      libraryTarget: 'umd',
      library: 'myLibrary'
    },
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader',
          }),
          exclude: [/node_modules/],
        },
        {
          test: /\.(sass|scss)$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
          exclude: [/node_modules/],
        },
      ],
    },
    plugins: plugins,
    resolve: {
      extensions: ['.js','.jsx']
    },
    externals: {}
  };
};
