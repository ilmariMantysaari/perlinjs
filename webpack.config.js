const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: [ /\.vert$/, /\.frag$/ ],
        use: 'raw-loader'
      },
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  //without this webpack fails to build with socketio
  node: {
    fs: 'empty',
    ws: 'empty'
  },
  optimization: {
    minimize: true
  }
};
