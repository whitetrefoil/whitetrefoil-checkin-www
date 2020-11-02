import { useMemo }     from 'preact/hooks'
import prettyMs        from 'pretty-ms'
import type { FC }     from 'react'
import React, { memo } from 'react'
import css             from './index.scss'


const LastCheckin: FC<{
  ms: number
}> = ({
  ms,
}) => {

  const deltaStr = useMemo(() => {
    const delta = Date.now() - ms
    if (delta < 60000) {
      return 'now'
    }
    return prettyMs(delta, { compact: true })
  }, [ms])

  return (
    <div className={css.lastCheckin}>{deltaStr}</div>
  )
}


export default memo(LastCheckin)
