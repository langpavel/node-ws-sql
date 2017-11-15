import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers';

const loggerOptions = {
  collapsed: true,
};

const store = createStore(
  reducer,
  applyMiddleware(
    thunk,
    createLogger(loggerOptions),
  ),
);

window.store = store;

export default store;
