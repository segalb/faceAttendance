
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './src/webpack-public-path',
    'webpack-hot-middleware/client?reload=true',
    './src/index'
  ],
    target: 'web',
    output: {
      path: `${__dirname}/src`,
      publicPath: '/',
      filename: 'bundle.js'
    },
  plugins: [
    /**
     * This is where the magic happens! You need this to enable Hot Module Replacement!
     */
     new webpack.DefinePlugin({
       'process.env.NODE_ENV': JSON.stringify('development'),
       __DEV__: true
     }),

    new webpack.HotModuleReplacementPlugin(),
    /**
     * NoErrorsPlugin prevents your webpack CLI from exiting with an error code if
     * there are errors during compiling - essentially, assets that include errors
     * will not be emitted. If you want your webpack to 'fail', you need to check out
     * the bail option.
     */
    new webpack.NoErrorsPlugin(),
    /**
     * This is a webpack plugin that simplifies creation of HTML files to serve your
     * webpack bundles. This is especially useful for webpack bundles that
     * include a hash in the filename which changes every compilation.
     */
     new HtmlWebpackPlugin({
       template: 'src/index.ejs',
       minify: {
         removeComments: true,
         collapseWhitespace: true
       },
       inject: true
     }),
    /**
     * DefinePlugin allows us to define free variables, in any webpack build, you can
     * use it to create separate builds with debug logging or adding global constants!
     * Here, we use it to specify a development build.
     */
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file'},
      {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
      {test: /\.(jpe?g|png|gif)$/i, loader: 'file?name=[name].[ext]'},
      {test: /\.ico$/, loader: 'file?name=[name].[ext]'},
      {test: /(\.css|\.scss)$/, loaders: ['style', 'css?sourceMap', 'postcss', 'sass?sourceMap']}
    ]
  },
    postcss: ()=> [autoprefixer]
};
