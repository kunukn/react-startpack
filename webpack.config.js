const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env = {}) => {
  const isProd = env.production === true;
  const nodeEnv = isProd ? 'production' : 'development';
  console.log(nodeEnv);

  const plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new ExtractTextPlugin({ filename: '[name].bundle.css', allChunks: true }),
  ];

  return {
    entry: {
      app: ['./client/index.js'],
    },
    devServer: {
      open: true,
      contentBase: './',
      noInfo: true,
      port: 3399,
      compress: isProd,
      inline: !isProd,
      //hot: !isProd,
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      chunkFilename: '[id].chunk.js',
      libraryTarget: 'umd',
      library: 'app'
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
