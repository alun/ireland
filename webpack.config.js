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
      {test: /\.html$/, loader: 'raw'},
      {test: /\.css$/, loader: 'style!css'},
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015']
        }
      }
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
