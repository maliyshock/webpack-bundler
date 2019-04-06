const path = require("path");
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackplugin = require('html-webpack-plugin');

const PATHS = {
    source: __dirname + '/src',
    build: __dirname + '/build'
};

var config = {
    entry: path.resolve(__dirname, 'src') + '/js/index.js',
    output: {
        filename: '[name].bundle.js',
        path: PATHS.build,
    },
    resolve: {
        modules: [path.resolve('src'), "node_modules"],
    },
    plugins: [
        new CleanWebpackPlugin(['build']),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery'
        }),
        new CopyWebpackPlugin([
            { context: PATHS.source + '/assets/images', from: '**/*', to: 'images' },
            { context: PATHS.source + '/assets/fonts', from: '**/*', to: 'fonts' }
        ]),
        new HtmlWebpackplugin({
            filename: 'index.html',
            template: PATHS.source + '/pug/index.pug'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            }, {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            }, {
                test: /\.scss$/,
                use: [ { loader: 'style-loader'},{loader: 'css-loader'},{loader: 'sass-loader'} ]
            }, {
                test: /\.js/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env']
                        ]
                    }
                }]
            }, {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            }

        ]
    }
}

module.exports = (env, argv) => {
    if(argv.mode === 'production') {
        config.optimization = {
            minimizer: [new UglifyJsPlugin({sourceMap: false})],
        }
    } else {
        config.watch = true;
        config.watchOptions = {ignored: ['node_modules']};
        config.devServer = {
            stats: 'errors-only', hot: true, contentBase:  PATHS.build
        }
    }

    return config;
};


