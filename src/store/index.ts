import createSagaMiddleware, { Saga }                    from '@redux-saga/core';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools }                           from 'redux-devtools-extension';
import { fork }                                          from 'redux-saga/effects';
import { getInStorage }                                  from '~/utils/in-storage';
import list                                              from '~/features/list/reducer';
import * as listSagas                                    from '~/features/list/sagas';
import geo                                               from './geo/reducer';
import * as geoSagas                                     from './geo/sagas';
import history                                           from './history/reducer';
import * as historySagas                                 from './history/sagas';
import session                                           from './session/reducer';
import * as sessionSagas                                 from './session/sagas';


export const rootReducer = combineReducers({
  geo,
  history,
  session,
  list,
});

function *runSagas(sagas: Record<string, Saga>) {
  for (const key of Object.keys(sagas)) {
    yield fork(sagas[key]);
  }
}

function *rootWatch() {
  yield *runSagas(geoSagas);
  yield *runSagas(historySagas);
  yield *runSagas(sessionSagas);
  yield *runSagas(listSagas);
}


const createDefaultState = (): Partial<RootState> => {
  const inStorage = getInStorage();
  const token = inStorage.t;
  return {
    session: {
      token,
    },
  };
};


export function configureStore(initialState: Partial<RootState> = createDefaultState()) {
  const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  });

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(sagaMiddleware),
  ));

  sagaMiddleware.run(rootWatch);

  return store;
}


export const rootStore = configureStore();

export default rootStore;
