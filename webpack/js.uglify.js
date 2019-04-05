
module.exports = () => {
    return {
        optimization: {
            minimizer: [new UglifyJsPlugin({sourceMap: true})],
        },
    }
}

