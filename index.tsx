import * as React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { createBrowserHistory } from 'history';
import createstore from 'src/store';
import App from 'src/containers/App';
import { isIOS } from 'react-device-detect';

const history = createBrowserHistory();
const store = createstore(history);

const start = () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
};

if (isIOS) {
  document.addEventListener('deviceready', start, false);
} else {
  start();
}
