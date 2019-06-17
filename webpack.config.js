const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const WebpackPreBuildPlugin = require("pre-build-webpack");

module.exports = {
  output: {
    path: path.resolve(__dirname, "public/js"), // string
    filename: "bundle.js" // string
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/"
            }
          }
        ]
      }
    ]
  },
  watch: false,
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "../index.html",
      path: __dirname + "../public"
    }),
    new WebpackPreBuildPlugin(function(stats) {
      const fs = require("fs");
      // https://github.com/isaacs/node-glob
      const glob = require("glob");

      var output = [];
      // var final = [];
      fs.writeFileSync("public/js/events.json", JSON.stringify([])); //limpando arquivo antes de incluir
      glob("public/events/**/*.json", (error, files) => {
        files.forEach(filename => {
          if (filename != "public/events/example.json") {
            const contents = JSON.parse(fs.readFileSync(filename, "utf8"));
            output = output.concat(contents);
          }
        });

        fs.writeFileSync("public/js/events.json", JSON.stringify(output));
      });
    })
  ],
  node: {
    fs: "empty"
  }
};
