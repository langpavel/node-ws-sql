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

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
