var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
		home: ['babel-polyfill', './public/_js/home.js'],
		component: ['babel-polyfill', './public/_js/component.js']
	},
    output: {
        path: __dirname,
        filename: './public/js/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015']
                }
            }
        ],
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ],
    stats: {
        colors: true
    },
    devtool: 'source-map',   // Create Sourcemaps for the bundle

};
