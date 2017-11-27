import React from 'react';
import ReactDOM from 'react-dom';

import { createWsClient } from './wsClient';
import store from './redux';
import { Provider } from 'react-redux';
import App from './App';
import acceptWsMessage from './redux/actions/acceptWsMessage';

import './index.css';

import registerServiceWorker from './registerServiceWorker';


const psql = createWsClient();

psql.addEventListener('open', (e) => {
  console.info('PSQL opened');
});

psql.addEventListener('message', (e) => {
  const msg = JSON.parse(e.data);
  store.dispatch(acceptWsMessage(msg));
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
