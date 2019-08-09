const webpack = require('webpack');

module.exports = (env) => {
  return {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        publicPath: "/js/",
        chunkFilename: '[name].bundle.js',
        path: __dirname + "/dist"
    },

    devServer: {
      historyApiFallback: true,
      proxy: {
        '*': 'http://localhost:8000'
      }
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: ["babel-loader", "awesome-typescript-loader"] },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

        ]
    },

    plugins: [
      // add the plugin to your plugins array
      new webpack.DefinePlugin({ "process.env.API_URL": JSON.stringify(env.API_URL) })
    ],

    externals: {
      "react": "React",
      "react-dom": "ReactDOM"
    }
  }
};
