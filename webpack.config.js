const
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin')

const
  root = (path) => {
    return `${__dirname}` + (path ? `/${path}` : '')
  }

module.exports = {
  context: root(),
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
      {test: /\.coffee$/, loader: 'coffee'},
      {test: /\.css$/, loader: 'style!css'}
    ]
  },
  resolve: {
    extensions: ["", ".coffee", ".js"]
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
