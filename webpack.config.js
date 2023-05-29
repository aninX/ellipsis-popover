const path = require('path');
const NODE_ENV = process.env.NODE_ENV;
const isProd = NODE_ENV === 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals')

module.exports = {
    mode: isProd ? 'production':'development',
    entry: isProd ? './src/index.ts' : './src/app.tsx',
    // experiments: {
    //     outputModule: true
    // },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'lib'),
        clean: true,
        library: {
            name:'ellipsis-popover',
            type: 'umd',
            // export: 'default'
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css?$/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    plugins:isProd ? [] : [
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'public/index.html')
        })
    ],
    devServer: {
        port: 7001,
        open: true
    },
    resolve: {
        extensions: ['.tsx','.ts','.js']
    },
    externals: isProd ? [nodeExternals()]: []

}