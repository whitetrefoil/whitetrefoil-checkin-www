import React, { FC, Fragment, memo } from 'react';
import List                          from '~/components/List';
import MainNav                       from '~/components/MainNav';
import { Geo }                       from '~/interfaces/geo';
import { User }                      from '~/interfaces/user';
import SearchButton                  from './SearchButton';
// import * as css from './index.scss';


const NonSearch: FC<{
  token: string;
  user: User|null;
  history: Record<string, number>|null;
  geo: Geo|null;
  onSearch(): unknown;
  onNewHistory(venueId: string): unknown;
  onAuthError(): unknown;
}> = ({
  token,
  user,
  history,
  geo,
  onSearch,
  onNewHistory,
  onAuthError,
}) => (
  <Fragment>
    <MainNav user={user}/>
    <List
      token={token}
      history={history}
      search={''}
      geo={geo}
      onNewHistory={onNewHistory}
      onAuthError={onAuthError}
    />
    <SearchButton onClick={onSearch}/>
  </Fragment>
);


export default memo(NonSearch);
