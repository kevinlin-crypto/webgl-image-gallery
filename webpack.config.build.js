/**
 * Webpack configuration for production
 */
const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const { merge } = require("webpack-merge");
const config = require("./webpack.config");

module.exports = merge(config, {
    mode: "production",

    output: {
        path: path.join(__dirname, "InfiniteCircularGallery")
    },

    plugins: [
        new CleanWebpackPlugin()
    ]
});