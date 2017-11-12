import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createWsClient } from './wsClient';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const psql = createWsClient();
psql.addEventListener('message', (e) => {
  console.info('Received', JSON.parse(e.data));
});

window.psql = psql;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
