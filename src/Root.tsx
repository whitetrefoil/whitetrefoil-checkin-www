import React, { FC, memo } from 'react';
import ReactDOM            from 'react-dom';
import App                 from './App';

let Root: FC = () => <App/>;

Root = memo(Root);

export default Root;

export function render(rootNode: HTMLElement): void {
  ReactDOM.render(<Root/>, rootNode);
}
