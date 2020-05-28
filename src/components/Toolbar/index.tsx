import { prevented }                 from '@whitetrefoil/jsx-sp-events/react';
import { useLayoutEffect, useState } from 'preact/hooks';
import React, { FC, memo }           from 'react';
import { Redirect }                  from 'react-router';
import * as css                      from './index.scss';


const Toolbar: FC = () => {

  const [isGotoSearch, goToSearch] = useState(false);

  useLayoutEffect(() => {
    window.document.body.classList.add(css.hasToolbar);
    return () => window.document.body.classList.remove(css.hasToolbar);
  }, []);

  const onBackClick = () => {
    if (window.history.length <= 1) {
      window.close();
    } else {
      window.history.back();
    }
  };

  const onSearch = () => goToSearch(true);

  if (isGotoSearch) {
    goToSearch(false);
    return <Redirect push to="/search"/>;
  }

  const isFullscreen = process.env.NODE_ENV === 'development' || window.matchMedia('(display-mode: fullscreen)').matches;

  return (
    <div className={css.root}>
      {isFullscreen && <a href="#" className={css.back} onClick={prevented(onBackClick)}>Back</a>}
      <a href="#" className={css.search} onClick={prevented(onSearch)}>Search</a>
    </div>
  );
};


export default memo(Toolbar);
