import { useLayoutEffect } from 'preact/hooks';
import { FC, memo }        from 'react';


/** @see https://stackoverflow.com/questions/5573096/detecting-webp-support */
function canUseWebP() {
  const elem = document.createElement('canvas');

  if (elem.getContext && elem.getContext('2d')) {
    // was able or not to get WebP representation
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  // very old browser like IE 8, canvas not supported
  return false;
}


const FeatureDetector: FC = () => {

  useLayoutEffect(() => {
    if (canUseWebP()) {
      window.document.body.className = `${window.document.body.className} webp`.trim();
    }
  }, []);

  return null;
};


export default memo(FeatureDetector);
