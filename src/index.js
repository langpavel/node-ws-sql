import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createWsClient } from './wsClient';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const psql = createWsClient();
psql.addEventListener('open', (e) => {
  console.info('PSQL opened');
});
psql.addEventListener('message', (e) => {
  console.info('PSQL message', JSON.parse(e.data));
});
psql.addEventListener('error', (e) => {
  console.error('PSQL error', e);
});
psql.addEventListener('close', (e) => {
  console.info('PSQL closed');
});

window.psql = psql;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
