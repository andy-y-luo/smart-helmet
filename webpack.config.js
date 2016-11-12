var path = require("path");
module.exports = {
  entry: {
    app: ["./app/main.jsx"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/assets/",
    filename: "bundle.js"
  },
  loaders: [
      {
        test: [/.jsx?$/, /.js?$/],
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
};
