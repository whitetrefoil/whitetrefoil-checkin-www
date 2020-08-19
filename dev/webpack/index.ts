import devConfig  from './dev'
import prodConfig from './prod'


const webpackConfig = process.env.NODE_ENV === 'development'
  ? devConfig
  : prodConfig



export default webpackConfig
