const path = require("path")

module.exports = {
  target: "node",
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    "greet": "./greet/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]/index.js",
    libraryTarget: "commonjs"
  },
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
      }
    ]
  }
}
