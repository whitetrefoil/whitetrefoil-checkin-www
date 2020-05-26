import { useMemo, useState }         from 'preact/hooks';
import React, { FC, Fragment, memo } from 'react';
import { Geo }                       from '~/interfaces/geo';
import { User }                      from '~/interfaces/user';
import List                          from '../List';
import CancelButton                  from './CancelButton';
import SearchBar                     from './SearchBar';
// import * as css from './index.scss';


const Search: FC<{
  token: string;
  user: User|null;
  history: Record<string, number>|null;
  geo: Geo|null;
  onCancel(): unknown;
  onNewHistory(venueId: string): unknown;
  onAuthError(): unknown;
}> = ({
  token,
  user,
  history,
  geo,
  onCancel,
  onNewHistory,
  onAuthError,
}) => {

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


export default memo(Search);
