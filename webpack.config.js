'use strict'
var path = require('path');
var webpack = require('webpack');
var env = process.env.NODE_ENV || 'development';
var extractor = require("extract-text-webpack-plugin");
var purify = require("purifycss-webpack-plugin");
var config = {
    entry: {
        bundle: path.join(__dirname, 'public/js/index')
    },
    output: {
        path: path.join(__dirname, 'public/dist/'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js']
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: extractor.loader("style","css")
            }
        ]
    },
    plugins: [
        new extractor("[name].css"),
        new purify({
            path: path.join(__dirname, 'public/css/*.css'),
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            },
            beautify: false,
            // Eliminate comments
            comments: false,

        })
    ]
};
module.exports = config;
