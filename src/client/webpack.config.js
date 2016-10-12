var webpack = require('webpack');
var path = require('path');

var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
// var HistoryApiFallback = require('connect-history-api-fallback');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var COMPONENTS_DIR = path.resolve(__dirname, './components');
var BUILD_DIR = path.resolve(__dirname, './dist');
var LIBRARIES_DIR = path.resolve(__dirname, './libraries');
var MODULES_DIR = path.resolve(__dirname, './node_modules');

var devDefinePlugin = new webpack.DefinePlugin({
  __DEV__: true,
});

var vendorList = [
  "moment"
];

var corePluginList = [
  new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor-bundle.js"),
  // new webpack.ProvidePlugin({
  //   // 'googletile': 'imports?this=>global!exports?googletile!googletile',
  //   // 'leaflet-canvas-marker': 'imports?this=>global!exports?leaflet-canvas-marker!leaflet-canvas-marker',
  //   // 'iscroll': 'imports?this=>global!exports?iscroll!iscroll',
  //   // 'chartjs': 'imports?this=>global!exports?chartjs!chartjs',
  //   // 'createjs': 'imports?this=>global!exports?createjs!createjs',
  // })
  // ,
  new CopyWebpackPlugin([
    { from: path.join(__dirname, "./.htaccess"), to: BUILD_DIR },
    { from: path.join(__dirname, "./index.html"), to: path.join(BUILD_DIR, "./index.html") },
    { from: path.join(__dirname, "./favicons/"), to: path.join(BUILD_DIR, "./favicons/") },
    { from: path.join(__dirname, "./localizations/"), to: path.join(BUILD_DIR, "./localizations/") },
    { from: path.join(__dirname, "./data/"), to: path.join(BUILD_DIR, "./data/") },
    // { from: path.join(__dirname, "./images/"), to: path.join(BUILD_DIR, "./images/") },
    { from: path.join(__dirname, "./libraries/"), to: path.join(BUILD_DIR, "./js/") }
    // { from: SETTING_DIR, to: path.join(BUILD_DIR, "./setting/") },
    // { from: path.join(LIBRARIES_DIR, "./chart-core.js"), to: path.join(BUILD_DIR, "./js/chart-core.js") },
    // { from: path.join(LIBRARIES_DIR, "./chart-scatter.js"), to: path.join(BUILD_DIR, "./js/chart-scatter.js") },
    // { from: path.join(LIBRARIES_DIR, "./ExifRestorer.js"), to: path.join(BUILD_DIR, "./js/exif-restorer.js") },
    // { from: path.join(LIBRARIES_DIR, "./canvas-to-blob.min.js"), to: path.join(BUILD_DIR, "./js/canvas-to-blob.js") },
  ])
];

var devPluginList = [
  devDefinePlugin,
  new ExtractTextPlugin('./../css/app-bundle.css', {
    allChunks: true
  }),
  new BrowserSyncPlugin({
    host: process.env.IP || 'localhost',
    port: process.env.PORT || 3000,
    open: false,
    server: {
      baseDir: BUILD_DIR
      // middleware: [ HistoryApiFallback() ]
    }
    // proxy: 'http://localhost'
  })
];

var loaderList = [
  { test: /\.png$/, loader: "url-loader?limit=10000&name=./images/[hash].[ext]" },
  { test: /\.jpg$/, loader: "file-loader?limit=10000&name=./images/[hash].[ext]" },
  { test: /\.jsx?/, exclude: MODULES_DIR, loader: 'babel' },
  { test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass') },
  { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff&name=./fonts/[hash].[ext]" },
  { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff&name=./fonts/[hash].[ext]" },
  { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream&name=./fonts/[hash].[ext]" },
  { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file?limit=10000&&name=./fonts/[hash].[ext]" },
  { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml&name=./fonts/[hash].[ext]" }
];

var config = {
  entry: {
    app: path.join(COMPONENTS_DIR, "./index.js"),
    vendor: vendorList
  },
  output: {
    path: path.join(BUILD_DIR, "./js/"),
    filename: '[name]-bundle.js',
  },
  plugins: corePluginList.concat(devPluginList),
  devtool: 'eval',
  resolve: {
    // Absolute path that contains modules
    root: __dirname,
    // Directory names to be searched for modules
    modulesDirectories: ['libraries', 'node_modules'],
    extensions: ['', '.js', '.jsx'],
    alias: {
      // 'googletile' : path.join(__dirname, './node_modules/leaflet-plugins/layer/tile/Google.js'),
      // 'leaflet-canvas-marker' : path.join(__dirname, './libraries/leaflet-canvas-marker.js'),
      // 'iscroll' : path.join(__dirname, './libraries/iscroll-zoom.js'),
      // 'chartjs' : path.join(__dirname, './libraries/Chart.Core.js'),
      // 'createjs' : path.join(__dirname, './libraries/createjs.js')
    }
  },
  module : {
    loaders : loaderList
  }
};

module.exports = config;
