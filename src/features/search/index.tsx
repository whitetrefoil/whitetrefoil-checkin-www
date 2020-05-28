import { useMemo, useState }         from 'preact/hooks';
import React, { FC, Fragment, memo } from 'react';
import List                          from '../List';
import CancelButton                  from './CancelButton';
import SearchBar                     from './SearchBar';
// import * as css from './index.scss';


const SearchFeature: FC = () => {

  const [searchText, setSearchText] = useState('');

  const list = useMemo(() => {
    if (searchText == null || searchText === '') {
      return null;
    }
    return <List
      token={token}
      history={history}
      search={searchText}
      geo={geo}
      onNewHistory={onNewHistory}
      onAuthError={onAuthError}
    />;
  }, [geo, history, onAuthError, onNewHistory, searchText, token]);

  return (
    <Fragment>
      <SearchBar current={searchText} onChange={val => setSearchText(val)}/>
      {list}
      <CancelButton onClick={onCancel}/>
    </Fragment>
  );
};


export default memo(SearchFeature);
