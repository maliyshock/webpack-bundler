const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(paths) {
    return {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    include: paths,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                                {
                                    loader:'css-loader',
                                    options: { importLoaders: 1, url: false, minimize: true}
                                },
                                {
                                    loader:'sass-loader'
                                }
                            ],
                    }),
                },
                {
                    test: /\.css$/,
                    include: paths,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader:'css-loader',
                                options: { importLoaders: 1, url: false,  minimize: true }
                            }
                        ]
                    }),
                },
            ],
        },
        plugins: [
            new ExtractTextPlugin('./css-compiled/[name].min.css'),
        ],
    };
};
