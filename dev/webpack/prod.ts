import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import * as fs                    from 'fs-extra'
import HtmlWebpackPlugin          from 'html-webpack-plugin'
import MiniCssExtractPlugin       from 'mini-css-extract-plugin'
import * as path                  from 'path'
import type { BabelConfig }       from 'ts-jest/dist/types'
import { TsconfigPathsPlugin }    from 'tsconfig-paths-webpack-plugin'
import * as webpack               from 'webpack'
import { BundleAnalyzerPlugin }   from 'webpack-bundle-analyzer'
import WorkboxPlugin              from 'workbox-webpack-plugin'
import config                     from '../config'
import htmlLoaderOptions          from './html-loader-options'


const SIZE_14KB = 14336

// See https://github.com/vuejs/vue-loader/issues/678#issuecomment-370965224
const babelrc = fs.readJsonSync(path.join(__dirname, '../../.babelrc')) as BabelConfig


const prodConfig: webpack.Configuration = {

  mode: 'production',

  context: config.absSource(''),

  profile: true,

  entry: {
    index: ['./polyfills', './index'],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.es6', '.js', '.json'],
    alias     : {
      'react/jsx-runtime'    : 'preact/jsx-runtime',
      'react/jsx-dev-runtime': 'preact/jsx-dev-runtime',
      'react'                : 'preact/compat',
      'react-dom/test-utils' : 'preact/test-utils',
      'react-dom'            : 'preact/compat',
    },
    plugins   : [
      new TsconfigPathsPlugin({
        configFile: config.absSource('tsconfig.json'),
      }),
    ],
  },

  output: {
    path         : config.absOutput(),
    publicPath   : '',
    filename     : '[id]-[contenthash].js',
    chunkFilename: '[id]-[contenthash].chunk.js',
    globalObject : 'self',
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test   : /\.[jt]sx?$/u,
        use    : [
          'source-map-loader',
          // 'eslint-loader?emitWarning',
        ],
        include: [
          config.absSource(),
        ],
      },
      {
        test: /\.html$/u,
        use : [
          {
            loader : 'html-loader',
            options: htmlLoaderOptions,
          },
        ],
      },
      {
        test: /\.tsx?$/u,
        use : [
          {
            loader : 'babel-loader',
            options: babelrc,
          },
          {
            loader : 'ts-loader',
            options: {
              transpileOnly: true,
              configFile   : config.absSource('tsconfig.json'),
            },
          },
        ],
      },
      {
        test: /\.jsx?$/u,
        use : [
          {
            loader : 'babel-loader',
            options: babelrc,
          },
        ],
      },
      {
        test: /\.css$/u,
        use : [
          MiniCssExtractPlugin.loader,
          {
            loader : 'css-loader',
            options: {
              modules      : {
                mode                  : 'global',
                exportGlobals         : false,
                localIdentName        : '[hash:base64]',
                exportLocalsConvention: 'camelCase',
              },
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/u,
        use : [
          MiniCssExtractPlugin.loader,
          {
            loader : 'css-loader',
            options: {
              modules      : {
                mode                  : 'global',
                exportGlobals         : false,
                localIdentName        : '[hash:base64]',
                exportLocalsConvention: 'camelCase',
              },
              importLoaders: 4,
            },
          },
          'postcss-loader',
          'resolve-url-loader?keepQuery',
          'svg-transform-loader/encode-query',
          {
            loader : 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [config.source('styles')],
              },
              sourceMap  : true,
            },
          },
        ],
      },
      {
        test: /manifest\.webmanifest$/u,
        use : [
          {
            loader : 'file-loader',
            options: {
              // manifest file path must NOT change
              // see: https://developers.google.com/web/fundamentals/integration/webapks
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test : /\.(?:png|jpe?g|gif|svg|webp|webm|woff2?|ttf|eot|ico)(?:\?.*)?$/u,
        oneOf: [
          {
            test: /icon\.c\.png$/u,
            use : [
              {
                loader : 'file-loader',
                options: {
                  name: '[path][name].[ext]',
                },
              },
            ],
          },
          {
            test: /\.svg(?:\?.*)?$/u,
            use : [
              {
                loader : 'url-loader',
                options: {
                  // limit for base64 inlining in bytes
                  limit   : SIZE_14KB,
                  // custom naming format if file is larger than
                  // the threshold
                  name    : '[contenthash].[ext]',
                  fallback: 'file-loader?outputPath=assets&publicPath=./',
                },
              },
              'svg-transform-loader',
            ],
          },
          {
            test: /\.weixin\.(?:png|jpe?g|gif|svg|webp|webm|woff2?|ttf|eot|ico)(?:\?.*)?$/u,
            use : [
              {
                loader : 'file-loader',
                options: {
                  name      : 'weixin-[contenthash].[ext]',
                  outputPath: 'assets',
                  publicPath: './',
                  // See: https://github.com/webpack-contrib/file-loader/issues/350
                  esModule  : false,
                },
              },
            ],
          },
          {
            use: [
              {
                loader : 'url-loader',
                options: {
                  // limit for base64 inlining in bytes
                  limit   : SIZE_14KB,
                  // custom naming format if file is larger than
                  // the threshold
                  name    : '[contenthash].[ext]',
                  fallback: 'file-loader?outputPath=assets&publicPath=./',
                },
              },
            ],
          },
        ],
      },
    ],
  },

  stats: {
    // See: https://github.com/TypeStrong/ts-loader#transpileonly-boolean-defaultfalse
    warningsFilter: /export .* was not found in/u,
  },

  node: {
    __dirname : true,
    __filename: true,
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile       : config.absSource('tsconfig.json'),
        diagnosticOptions: {
          semantic : true,
          syntactic: true,
        },
      },
    }),

    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting : true,
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.BASE_URL': JSON.stringify(config.baseUrl),
    }),

    new BundleAnalyzerPlugin({
      analyzerMode  : 'static',
      defaultSizes  : 'gzip',
      openAnalyzer  : false,
      reportFilename: config.absRoot('test_results/bundle-analysis-report.html'),
    }),

    new MiniCssExtractPlugin({
      filename     : '[id]-[contenthash].css',
      chunkFilename: '[id]-[contenthash].chunk.css',
    }) as webpack.WebpackPluginInstance,

    new HtmlWebpackPlugin({
      filename      : 'index.html',
      template      : './index.html',
      hash          : false,
      minify        : false,
      inject        : 'body',
      chunksSortMode: 'manual',
      base          : `${config.baseUrl}/`,
    }),
  ],
}

export default prodConfig
