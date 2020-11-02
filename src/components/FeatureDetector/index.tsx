import { useLayoutEffect } from 'preact/hooks'
import type { FC }         from 'react'
import { memo }            from 'react'


/** @see https://stackoverflow.com/questions/5573096/detecting-webp-support */
function canUseWebP() {
  const elem = document.createElement('canvas')

  if (elem.getContext?.('2d') != null) {
    // was able or not to get WebP representation
    return elem.toDataURL('image/webp').startsWith('data:image/webp')
  }

  // very old browser like IE 8, canvas not supported
  return false
}


const FeatureDetector: FC = () => {

  useLayoutEffect(() => {
    if (canUseWebP()) {
      window.document.body.classList.add('webp')
    }
  }, [])

  return null
}


export default memo(FeatureDetector)
