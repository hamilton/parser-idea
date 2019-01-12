const webpack = require('webpack')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const APP_DIR = path.resolve(__dirname, 'src/')

let APP_PATH_STRING
let CSS_PATH_STRING

module.exports = (env) => {
  const plugins = []
  if (env === 'prod') {
    BUILD_DIR = path.resolve(__dirname, 'prod/')
    plugins.push(new UglifyJsPlugin())
    CSS_PATH_STRING = APP_PATH_STRING
  } else if (env === 'dev') {
    BUILD_DIR = path.resolve(__dirname, 'dev/')
    APP_VERSION_STRING = 'dev'
    APP_PATH_STRING = ''
    CSS_PATH_STRING = ''
  }

  return {
    entry: {
      parser: `${APP_DIR}/parser.js`,
      frontend: `${APP_DIR}/components/index.jsx`,

    },
    mode: 'development',
    output: {
      path: BUILD_DIR,
      filename: '[name].js',
      library: 'parser',
      libraryTarget: 'umd',
      libraryExport: 'default',
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          enforce: 'pre',
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            // eslint options (if necessary)
            emitWarning: true,
            emitError: true,
            extensions: ['.js', '.jsx'],
          },
        },
        {
          test: /\.js?/,
          include: APP_DIR,
          resolve: { extensions: ['.js', '.jsx'] },
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      ],

    },
    watchOptions: { poll: true },
    plugins,
  }
}
