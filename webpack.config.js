const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin")
const env = process.env.NODE_ENV || "production"

module.exports = {
    entry: path.resolve(__dirname, "./client/game/index.js"),
    output: {
        path: path.resolve(__dirname, './.tmp/public'),
        filename: "assets/js/bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { 
                        loader: "style-loader"
                    }, 
                    {
                        loader: "css-loader", 
                        options: {
                            modules:true,
                            importLoaders: 1,
                            localIdentName: "[name]_[local]_[hash:base64]",
                            sourceMap: true,
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [ 
                    "babel-loader",
                    "source-map-loader"
                ]
            }, 
            {
                test: /\.(png|jpe?g|svg|gif)$/,
                use: {
                    loader: "file-loader", 
                    options:{
                        name:"assets/images/[hash].[ext]",
                    }
                },
            },
            {
                type: "javascript/auto", // bypass the default json loader from webpack
                test: /\.(json|xml|fnt)$/,
                use: {
                    loader: "file-loader", 
                    options:{
                        name:"assets/data/[hash].[ext]",
                    }
                },
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([".tmp"], { root: __dirname }),
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: path.resolve(__dirname,'client/game/index.html'),
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
        contentBase: path.resolve(__dirname, '.tmp/public'),
        watchContentBase:true,
        compress: true,
        port: 8000,
        overlay: env === "development",
    },
    resolve:{
        extensions: [ ".js" ]
    },
    node: {
        fs: 'empty'
    }
}