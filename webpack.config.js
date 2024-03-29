const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")
const { EsbuildPlugin } = require('esbuild-loader')

module.exports = {
    entry: "./src/index",
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [new HtmlWebpackPlugin({
        template: 'src/index.html'
    })],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(ico|gif|png|jpg|jpeg)$/,
                type: 'asset/resource',
                generator: {
                    filename: './images/[name][ext]',
                },
            },
            {
                test: /\.(ttf|otf|woff|woff2)$/i,
                type: 'asset/resource',
                generator: {
                    filename: './fonts/[name][ext]',
                },
            }
        ]
    },
    devServer: {
        port: 3000
    },
    optimization: {
        minimizer: [
            new EsbuildPlugin({
                keepNames: true,
            })
        ]
    }
}
