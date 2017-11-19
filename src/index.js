import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createWsClient } from './wsClient';
import store from './redux';
import { Provider } from 'react-redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const psql = createWsClient();
psql.addEventListener('open', (e) => {
  console.info('PSQL opened');
});
psql.addEventListener('message', (e) => {
  const response = JSON.parse(e.data);
  console.info('PSQL message', response);
  store.dispatch({
    type: response.T ? `WS_${response.T}` : 'WS_RESPONSE',
    payload: response,
  })
});
psql.addEventListener('error', (e) => {
  console.error('PSQL error', e);
});
psql.addEventListener('close', (e) => {
  console.info('PSQL closed');
});

window.psql = psql;

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
