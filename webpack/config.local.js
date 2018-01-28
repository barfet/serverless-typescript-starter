var webpack = require('webpack');
var merge = require('webpack-merge');

var base = require('./config.base.js');

var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = merge.smart(base, {
  plugins: [
    new FriendlyErrorsWebpackPlugin()
  ]
})
