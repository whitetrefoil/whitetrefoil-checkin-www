import React, { FC, memo } from 'react';
import * as css            from './index.scss';


const SearchButton: FC<{
  onClick?(): unknown;
}> = ({
  onClick,
}) => <div className={css.searchButton} onClick={onClick}>🔍</div>;


export default memo(SearchButton);
