import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import { createWsClient } from './wsClient';
import store from './redux';
import App from './App';
import acceptWsMessage from './redux/actions/acceptWsMessage';

import './index.css';

import registerServiceWorker from './registerServiceWorker';

const psql = createWsClient();
const intlConfig = {
  locale: 'en',
};

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

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider {...intlConfig}>
      <App />
    </IntlProvider>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
