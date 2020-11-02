import log              from 'fancy-log'
import gulp             from 'gulp'
import webpack          from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import config           from '../config'
import webpackConfig    from '../webpack'


gulp.task('devServer', async done => {

  const devServerOptions: WebpackDevServer.Configuration = {
    host              : '0.0.0.0',
    port              : config.serverPort,
    publicPath        : `${config.baseUrl}/`,
    contentBase       : [config.absRoot('stubapi/static'), config.absSource('')],
    hot               : true,
    noInfo            : false,
    // index             : 'index.html',
    clientLogLevel    : 'error',
    injectClient      : compilerConfig => (compilerConfig as unknown as webpack.Configuration)?.target !== 'webworker',
    injectHot         : compilerConfig => (compilerConfig as unknown as webpack.Configuration)?.target !== 'webworker',
    // Base on 'errors-only' + filter ts-loader transpileOnly related warnings.
    // See https://github.com/webpack/webpack/blob/30882ca548625e6d1e54323ff5c61795c6ab4bda/lib/Stats.js#L1405
    stats             : {
      all           : false,
      errors        : true,
      moduleTrace   : true,
      warningsFilter: /export .* was not found in/u,
    },
    https             : true,
    proxy             : [
      {
        context: config.apiPrefixes.map((p: string): string => `${p}**`),
        target : `http://0.0.0.0:${config.serverPort + 1}`,
        secure : false,
      },
    ],
    historyApiFallback: {
      index  : `${config.baseUrl}/index.html`,
      verbose: true,
    },
    disableHostCheck  : true,
    compress          : process.env.NODE_ENV !== 'development',
  }

  WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerOptions)

  const webpackCompiler = webpack(webpackConfig)

  const server = new WebpackDevServer(webpackCompiler, devServerOptions)

  server.listen(config.serverPort, '0.0.0.0', error => {
    if (error != null) {
      log.error('Webpack Dev Server startup failed!  Detail:')
      log.error(error)
    } else {
      log(`Webpack Dev Server started at port ${config.serverPort}`)
    }

    done()
  })
})
