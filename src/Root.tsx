import React, { FC, memo } from 'react'
import ReactDOM            from 'react-dom'
import { Provider }        from 'react-redux'
import { BrowserRouter }   from 'react-router-dom'
import App                 from './App'
import FeatureDetector     from './components/FeatureDetector'
import rootStore           from './store'


let Root: FC<{
  store: typeof rootStore
}> = ({
  store,
}) => (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
    <FeatureDetector/>
  </Provider>
)

Root = memo(Root)

export default Root


export async function render(rootNode: HTMLElement): Promise<void> {
  ReactDOM.render(<Root store={rootStore}/>, rootNode)
}
