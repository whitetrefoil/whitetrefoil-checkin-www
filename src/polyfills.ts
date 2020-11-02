import { LogLevel } from '@whitetrefoil/log-utils'
// Babel Polyfill
// Refer to: https://babeljs.io/docs/en/next/babel-preset-env.html#usebuiltins
import 'core-js/stable'
import 'regenerator-runtime/runtime'

if (process.env.NODE_ENV === 'production') {
  // Production
} else {
  // Development
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('preact/debug')
  Error.stackTraceLimit = Infinity
  window.__LOG_LEVEL__ = LogLevel.Debug
}
