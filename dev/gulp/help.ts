import { task } from 'gulp'
import config   from '../config'

task('help', () => {
  // eslint-disable-next-line no-console
  console.error(config.argv.help)
})
