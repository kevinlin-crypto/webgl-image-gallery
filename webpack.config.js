/**
 * Webpack Configuration
 */
const path = require("path");
const webpack = require("webpack");

// Plugins
const HtmlWepackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Environment
const IS_DEVELOPMENT = process.env.NODE_ENV === "dev";

// Directories
const dirApp = path.join(__dirname, "app");
const dirAssets = path.join(__dirname, "assets");
const dirStyles = path.join(__dirname, "styles");
const dirNode = "node_modules";

// Config
module.exports = {
    entry: [
        path.join(dirApp, "index.js"),
        path.join(dirStyles, "index.scss")
    ],

    resolve: {
        modules: [
            dirApp,
            dirAssets,
            dirNode
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            IS_DEVELOPMENT
        }),

        new webpack.ProvidePlugin({}),

        new HtmlWepackPlugin({
            filename: "index.html",
            template: path.join(__dirname, "index.html")
        }),

        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],

    module: {
        rules: [
            {
                test: /\.pug$/,
                use: ["pug-loader"]
            },

            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader"
                }
            },

            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: ''
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: false
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: false
                        }
                    }
                ]
            },

            {
                test: /\.(jpe?g|png|gif|svg|woff2?|fnt|webp)$/,
                loader: 'file-loader',
                options: {
                    name (file) {
                        return '[hash].[ext]'
                    }
                }
            },

            {
                test: /\.(glsl|frag|vert)$/,
                loader: 'raw-loader',
                exclude: /node_modules/
            },

            {
                test: /\.(glsl|frag|vert)$/,
                loader: 'glslify-loader',
                exclude: /node_modules/
            }
        ]
    }
}