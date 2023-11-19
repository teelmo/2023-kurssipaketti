const path = require('path');
const name = require('./package.json').name;
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  name:name,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules\//,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: false,
              name:'[path][name].[ext]'
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: 'js/' + name + '.min.js',
    path: path.resolve(__dirname, './public'),
    clean: true
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'assets/img/', to: '../public/assets/img/', noErrorOnMissing: true, globOptions: { dot: true, gitignore: true, ignore: ['**/.DS_Store'] }},
        { from: 'assets/vid/', to: '../public/assets/vid/', noErrorOnMissing: true, globOptions: { dot: true, gitignore: true, ignore: ['**/.DS_Store'] }},
        { from: 'assets/data/2023-kurssipaketti - keskittyminen.csv', to: '../public/assets/data/2023-kurssipaketti_keskittyminen.csv', noErrorOnMissing: true, globOptions: { dot: true, gitignore: true, ignore: ['**/.DS_Store'] }},
        { from: 'assets/data/2023-kurssipaketti - muisti.csv', to: '../public/assets/data/2023-kurssipaketti_muisti.csv', noErrorOnMissing: true, globOptions: { dot: true, gitignore: true, ignore: ['**/.DS_Store'] }},
        { from: 'assets/data/2023-kurssipaketti - rentoutuminen.csv', to: '../public/assets/data/2023-kurssipaketti_rentoutuminen.csv', noErrorOnMissing: true, globOptions: { dot: true, gitignore: true, ignore: ['**/.DS_Store'] }},
        { from: 'src/font/', to: '../public/font/', noErrorOnMissing: true, globOptions: { dot: true, gitignore: true, ignore: ['**/.DS_Store'] }},
        { from: 'src/styles/darkmode.css', to: '../public/css/darkmode.css', noErrorOnMissing: true, globOptions: { dot: true, gitignore: true, ignore: ['**/.DS_Store'] }},
        { from: './favicon.png', to: '../public', noErrorOnMissing: true, globOptions: { dot: true, gitignore: true, ignore: ['**/.DS_Store'] }}
      ]
    })
  ]
};