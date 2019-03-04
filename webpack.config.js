const copyWebpackPlugin = require("copy-webpack-plugin")
const path = require("path")

module.exports = {
  target: "node",
  mode: "development",
  devtool: "source-map",
  entry: {
    greet: "./src/greet/greet.ts"
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
  },
  plugins: [
    new copyWebpackPlugin([
      "src/host.json",
      "src/local.settings.json",
      {
        context: "src",
        from: "**/+(function.json|sample.dat)"
      }
    ])
  ]
}
