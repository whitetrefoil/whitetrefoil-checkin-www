import React, { FC, memo } from 'react';
import * as css            from './index.scss';


const CancelButton: FC<{
  onClick?(): unknown;
}> = ({
  onClick,
}) => <div className={css.cancelButton} onClick={onClick}>🔙</div>;


export default memo(CancelButton);
