import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducers';

const store = createStore(
  reducer,
  applyMiddleware(
    thunk,
    logger
  ),
);

window.store = store;

export default store;
