const path = require("path");
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env']
                        ]
                    }
                }]
            }, {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            }, {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            url: false,
                            sourceMap: true
                        },
                    },
                    'sass-loader',
                ]
            }, {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            }, {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
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


