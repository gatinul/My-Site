var merge = require("webpack-merge");
var webpack = require("webpack");
var baseWebpackConfig = require("./webpack.base.config");

module.exports = merge(baseWebpackConfig, {
  devtool: "eval-source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    })
  ]
});
