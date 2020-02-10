import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers';

export default function configureStore(defaultState) {
  const store = createStore(
    rootReducer,
    defaultState,
    applyMiddleware(thunkMiddleware)
  );

  return store;
}
