import React from 'react';
// import { Provider } from 'react-redux';
import { render } from 'react-dom';
// import store from 'src/store';
import App from 'src/containers/App';

const start = () => {
  render(
    <App />,
    document.getElementById('root'),
  );
};

const onDeviceReady = () => {
  start();
};

if (process.env.MOBILE) {
  document.addEventListener('deviceready', onDeviceReady, false);
} else {
  start();
}
