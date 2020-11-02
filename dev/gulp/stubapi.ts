import { bodyParser, createMockServer, Koa, LogLevel } from '@whitetrefoil/msm'
import gulp                                            from 'gulp'
import config                                          from '../config'


gulp.task('stubapi', () => {
  const app = new Koa()

  app.use(bodyParser())
  app.use(createMockServer({
    apiPrefixes      : config.apiPrefixes,
    logLevel         : LogLevel.DEBUG,
    ignoreQueries    : false,
    fallbackToNoQuery: true,
  }))

  app.listen(config.serverPort + 1)
})
