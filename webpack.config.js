const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { NODE_ENV } = process.env
const IN_PROD = NODE_ENV === 'production'

module.exports = {
  mode: IN_PROD ? 'production' : 'development',
  devtool: IN_PROD ? 'source-map' : 'eval-source-map',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: true,
      title: 'BattleShip',
      template: './public/index.html',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devServer: {
    static: './dist',
    hot: IN_PROD ? true : false,
  },
}
