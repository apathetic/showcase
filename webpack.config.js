var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: ['babel-polyfill','./public/js/home.js'],
    output: {
        path: __dirname,
        filename: './public/js/script.js'
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
