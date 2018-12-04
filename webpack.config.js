const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const env = process.env.NODE_ENV || "production"

module.exports = {
    entry: path.resolve(__dirname, "./src/index.js"),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [ 
                    "babel-loader",
                    "source-map-loader"
                ]
            }, 
            {
                test: /\.(png|jpe?g|)$/,
                use: [ "file-loader" ],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: path.resolve(__dirname,'src/index.html'),
          title: "Hello Gamify",
          hash: true
        }),
        new webpack.DefinePlugin({
            'CANVAS_RENDERER': JSON.stringify(true),
            'WEBGL_RENDERER': JSON.stringify(true)
        })
    ],
    watch:true,
    devtool:'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 8000,
        overlay: env === "development",
    },
    resolve:{
        extensions: [ ".js", ".json" ]
    }
}