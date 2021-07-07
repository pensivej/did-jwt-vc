const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    devtool: 'eval',
    resolve: {
        extensions: ['.jsx', '.js'],
        fallback: {
            "util": false,
            // "buffer": require.resolve('buffer-browserify'),
            "stream": require.resolve('stream-browserify'),
            "crypto": require.resolve('crypto-browserify')
        }
    },
    entry: {
        app: './lib/index.js'
    },
    module: {
        rules: [{
            test: /\.jsx?/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 0.25% in KR', 'not dead'],
                            ios: "13"
                        },
                        debug: false, // for production
                        useBuiltIns: "entry",
                        corejs: 3
                    }]
                ],
                plugins: [],
            },
        }],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            process: 'process/browser'
        })
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'did-jwt-vc.js',
        library:
        {
            type: "global"
        }
    },
}