const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
const sourcePath = path.join(__dirname, "./static/src");
const outputPath = path.join(__dirname, "./static/dist/");

module.exports = {
  entry: {
    main: "./static/routes/index.js",
    vendor: ["react", "react-dom", "whatwg-fetch"]
  },
  output: {
    path: outputPath,
    publicPath: "/static/dist/",
    filename: "js/[name].js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            query: {
              // presets: ['es2015', 'react'],
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader"]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "less-loader"]
        })
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [sourcePath, "node_modules"]
  },
  plugins: [
    new ExtractTextPlugin("css/[name].css"),
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor"],
      minChunks: Infinity,
      filename: "js/[name].js"
    })
  ]
};