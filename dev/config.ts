import Chalk            from 'chalk'
import log              from 'fancy-log'
import meow, { Result } from 'meow'
import path             from 'path'

// region - Interfaces

interface IFlags {
  help: boolean
  version: boolean
  development: boolean
  port: number
  backend: string
  base: string
}

type IMeowResult = Result<EmptyObject>&{ flags: IFlags }

type IBuildPathFn = (...path: string[]) => string

interface IConfig {
  argv: IMeowResult
  pkg: unknown
  serverPort: number
  apiPrefixes: string[]
  backendDest: string
  baseUrl: string

  root: IBuildPathFn
  absRoot: IBuildPathFn
  source: IBuildPathFn
  absSource: IBuildPathFn
  building: IBuildPathFn
  absBuilding: IBuildPathFn
  output: IBuildPathFn
  absOutput: IBuildPathFn
  outputByEnv: IBuildPathFn
  absOutputByEnv: IBuildPathFn
}

// endregion

// region - Default constants

const DEFAULT_BASE = ''
const DEFAULT_IS_DEVELOPMENT = false
const DEFAULT_PORT = 8888
const DEFAULT_PREFIX = ['/api/']
const DEFAULT_BACKEND = 'http://localhost:3333'

const DEFAULT_BUILDING_DIR = '.building'
const DEFAULT_OUTPUT_DIR = 'dist'
const DEFAULT_SOURCE_BASE_DIR = 'src'

// endregion

const { blue, green, gray, yellow } = Chalk

// region - Configure Meow

const argv: IMeowResult = meow(
  `
    Usage:
      $ npm ${yellow('<task>')} -- ${yellow('<options>')}

    Tasks:
      run server           start preview server
      start                alias of "run server"
      test                 run tests
      run coverage         generate coverage report
      run build            build the source code

    Options:                                                     [${gray('default value')}]
      common:
        -h, --help         show this help message
        -v, --version      show version
        -d, --development  set NODE_ENV to "development"         [${yellow(`${DEFAULT_IS_DEVELOPMENT}`)}]
        -b, --base         base URL                              [${green(`"${DEFAULT_BASE}"`)}]
      developing:
        -p, --port         port of preview server                [${blue('8888')}]
        -e, --backend      start the server in integration mode  [${green('"http://localhost:8091"')}]
                           can specify the destination

    For more detail of tasks / options, see code in "dev/gulp" directory.
  `,
  {
    flags: {
      help       : { alias: 'h', type: 'boolean', default: false },
      version    : { alias: 'v', type: 'boolean', default: false },
      development: { alias: 'd', type: 'boolean', default: DEFAULT_IS_DEVELOPMENT },
      port       : { alias: 'p', type: 'number', default: DEFAULT_PORT },
      backend    : { alias: 'e', type: 'string', default: DEFAULT_BACKEND },
      base       : { alias: 'b', type: 'string', default: DEFAULT_BASE },
    },
  },
)

// endregion

// region - Main exports

const rootDir = path.join(__dirname, '..')
const sourceDir = DEFAULT_SOURCE_BASE_DIR
const buildingDir = DEFAULT_BUILDING_DIR
const outputDir = DEFAULT_OUTPUT_DIR

process.env.NODE_ENV = argv.flags.development || DEFAULT_IS_DEVELOPMENT ? 'development' : 'production'
process.env.BABEL_ENV = process.env.NODE_ENV

log(`Initializing project in "${rootDir}" for ${process.env.NODE_ENV} environment.`)

const root: IBuildPathFn = (...pathInRoot) => path.join(rootDir, ...pathInRoot)
const absRoot = root

const source: IBuildPathFn = (...pathInSource) => path.join(sourceDir, ...pathInSource)
const absSource: IBuildPathFn = (...pathInSource) => root(sourceDir, ...pathInSource)

const building: IBuildPathFn = (...pathInBuilding) => path.join(buildingDir, ...pathInBuilding)
const absBuilding: IBuildPathFn = (...pathInBuilding) => root(buildingDir, ...pathInBuilding)

const output: IBuildPathFn = (...pathInOutput) => path.join(outputDir, ...pathInOutput)
const absOutput: IBuildPathFn = (...pathInOutput) => root(outputDir, ...pathInOutput)

const outputByEnv: IBuildPathFn = (...pathInOutput) => {
  const dir = process.env.NODE_ENV === 'development' ? buildingDir : outputDir
  return path.join(dir, ...pathInOutput)
}

const absOutputByEnv: IBuildPathFn = (...pathInOutput) => {
  const dir = process.env.NODE_ENV === 'development' ? buildingDir : outputDir
  return root(dir, ...pathInOutput)
}

const config: IConfig = {
  argv,
  pkg        : argv.pkg || {},
  serverPort : argv.flags.port,
  apiPrefixes: DEFAULT_PREFIX,
  backendDest: argv.flags.backend === '' ? DEFAULT_BACKEND : argv.flags.backend,
  baseUrl    : argv.flags.base,
  root,
  absRoot,
  source,
  absSource,
  building,
  absBuilding,
  output,
  absOutput,
  outputByEnv,
  absOutputByEnv,
}

// endregion

export default config
