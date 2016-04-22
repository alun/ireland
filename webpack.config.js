const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: `${__dirname}`,
  entry: {
    index: './index.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/out'
  },
  target: 'web',
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'raw'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ["", ".js"]
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './index.html',
        inject: 'body'
    })
  ],
  devServer: {
    contentBase: './out',
    stats: 'minimal'
  }
}
