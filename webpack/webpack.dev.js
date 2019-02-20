const merge = require('webpack-merge')
const common = require('./webpack.common')

const dev = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    noInfo: true,
    proxy: {
      '/socket.io': {
          target: 'http://localhost:8081',
          ws: true
      }
    },
  }
}

module.exports = merge(common, dev)
