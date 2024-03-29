var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        app: './src/app.jsx'
    },
    output: {
        filename: 'build/bundle.js',
        sourceMapFilename: 'build/bundle.map'
    },
    devtool: '#source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader:'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    }
}