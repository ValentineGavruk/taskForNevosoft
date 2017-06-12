var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (() => {

    var options = {
        entry: path.resolve('./front/app.js'),
        output: {
            path: path.resolve('./public/build'),
            publicPath: "build/",
            filename: "bundle.js"
        },
        module: {
            loaders: [
                {
                    loader: "babel-loader",
                    exclude: [/node_modules/],
                    test: /\.js?$/,
                    query: {
                        presets: ['es2015']
                    }
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin('bundle.css')
    ]

}
    ;

    return options;
})();