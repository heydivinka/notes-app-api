const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CspHtmlWebpackPlugin = require("csp-html-webpack-plugin"); // ✅ Pastikan ini diinstal

module.exports = {
    entry: "./script.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    mode: "development",
    devtool: "cheap-module-source-map", // ✅ Mencegah penggunaan eval()
    devServer: {
        static: path.resolve(__dirname, "dist"),
        open: true,
        hot: true,
        port: 8085, // Bisa diganti sesuai keinginan
        headers: {
            "Content-Security-Policy":
                "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self'; connect-src 'self' https://notes-api.dicoding.dev;"
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },
    resolve: {
        fallback: {
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "path": require.resolve("path-browserify"),
            "zlib": require.resolve("browserify-zlib"),
            "querystring": require.resolve("querystring-es3"),
            "url": require.resolve("url/"),
            "buffer": require.resolve("buffer/"),
            "util": require.resolve("util/"),
            "fs": false, // Webpack tidak bisa menjalankan `fs` di browser
            "net": false, // Sama, `net` tidak bisa digunakan di browser
            "http": require.resolve("stream-http")
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
        }),
        new MiniCssExtractPlugin(),
        new CspHtmlWebpackPlugin({
            "default-src": ["'self'"],
            "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            "font-src": ["'self'", "https://fonts.gstatic.com"],
            "script-src": ["'self'"],
            "connect-src": ["'self'", "https://notes-api.dicoding.dev"]
        }, {
            enabled: true
        })
    ],
};
