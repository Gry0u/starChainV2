const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: ['url-loader']
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{ from: './index.html', to: 'index.html' }])
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true
  }
}
