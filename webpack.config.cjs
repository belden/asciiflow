const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  
  return {
    entry: {
      app: "./client/app.tsx",
    },
    
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProduction ? "[name].[contenthash].js" : "[name].js",
      clean: true,
    },
    
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      alias: {
        "#asciiflow": path.resolve(__dirname),
      },
    },
    
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", { targets: "defaults" }],
                ["@babel/preset-react"],
                ["@babel/preset-typescript"],
              ],
              plugins: [
                [
                  "@babel/plugin-proposal-decorators",
                  {
                    version: "2023-05",
                  },
                ],
              ],
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
    
    plugins: [
      new HtmlWebpackPlugin({
        template: "./client/index.html",
        filename: "index.html",
      }),
    ],
    
    devServer: {
      static: {
        directory: path.resolve(__dirname, "dist"),
      },
      port: 3000,
      open: true,
      hot: true,
    },
    
    devtool: isProduction ? "source-map" : "eval-source-map",
  };
};