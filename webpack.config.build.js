const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const createVariants = require('parallel-webpack').createVariants;

const plugins = [
  new HtmlWebpackPlugin({
    template: './client/index.html',
    filename: 'index.html',
    inject: 'body',
  }),
  new ExtractTextPlugin({ filename: '[name].bundle.css', allChunks: true }),
];

// plugins.push(
//   new webpack.LoaderOptionsPlugin({ minimize: true, debug: false })
// );
// plugins.push(
//   new webpack.optimize.UglifyJsPlugin({
//     minimize: true,
//     compress: {
//       warnings: false,
//       screw_ie8: true,
//       conditionals: true,
//       unused: true,
//       comparisons: true,
//       sequences: true,
//       dead_code: true,
//       evaluate: true,
//       if_return: true,
//       join_vars: true,
//     },
//     output: {
//       comments: false,
//     },
//   })
// );

function createConfig(options) {
  return {
    entry: {
      app: ['./client/index.js'],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'myLibrary.' + options.target + '.js',
      library: 'myLibrary',
      libraryTarget: options.target,
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
      extensions: ['.js', '.jsx'],
    },
  };
}

module.exports = createVariants(
  {
    target: ['var', 'commonjs2', 'umd']
  },
  createConfig
);
