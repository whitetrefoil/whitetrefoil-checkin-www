import del                from 'del'
import log                from 'fancy-log'
import * as fs            from 'fs-extra'
import gulp               from 'gulp'
import webpack, { Stats } from 'webpack'
import config             from '../config'
import webpackConfig      from '../webpack'


gulp.task('build', async() => {

  await del([config.outputByEnv('')])

  const compiler = webpack(webpackConfig)

  return new Promise((resolve, reject) => {
    compiler.run((err?: Error, stats?: Stats) => {
      if (err != null) {
        return reject(err)
      }
      // Base on 'minimal' + filter ts-loader transpileOnly related warnings.
      // See: https://github.com/webpack/webpack/blob/30882ca548625e6d1e54323ff5c61795c6ab4bda/lib/Stats.js#L1397
      if (stats != null) {
        log('[webpack]:\n', stats.toString({
          all           : false,
          modules       : true,
          maxModules    : 0,
          errors        : true,
          warnings      : true,
          warningsFilter: /export .* was not found in/u,
          chunks        : true,
          chunkModules  : false,
          chunkOrigins  : false,
          colors        : true,
        }))
      }
      fs.ensureDirSync('test_results')
      // fs.writeJsonSync('test_results/stats.json', stats.toJson({
      //   warningsFilter: /export .* was not found in/,
      // }));
      gulp.src(config.source('data/**'))
        .pipe(gulp.dest(config.output('data/')))
        .on('end', () => {
          resolve()
        })
      return undefined
    })
  })
})
