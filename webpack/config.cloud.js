var webpack = require('webpack');
var merge = require('webpack-merge');

var base = require('./config.base.js');

module.exports = merge.smart(base, {
  plugins: []
})
