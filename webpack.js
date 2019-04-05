const path = require("path");
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
};

const config = {
    entry: {
        index: PATHS.source + '/js/index.js',
    },
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
            minimizer: [new UglifyJsPlugin({sourceMap: true})],
        }
    } else {
        config.watch = true;
        config.watchOptions = {
            ignored: ['node_modules']
        }
        config.devServer = {
            stats: 'errors-only',
                port: 9000
        }
    }

    return config;
};


