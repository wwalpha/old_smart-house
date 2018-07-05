import * as React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { createBrowserHistory } from 'history';
import createstore from 'src/store';
import Amplify from 'aws-amplify';
import App from 'src/containers/App';
import { isIOS } from 'react-device-detect';
import { Cognito, Config } from 'utils/aws';

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

Amplify.configure({
  Auth: {
    region: Config.region,
    userPoolId: Config.pool.userPoolId,
    userPoolWebClientId: Config.pool.userPoolWebClientId,
  },
  Storage: {
    region: Config.region,
    bucket: Config.bucket,
    identityPoolId: 'ap-northeast-1:00cc4b25-0d8e-4b64-a15f-ecb62f3d26f3',
  },
});

if (isIOS) {
  document.addEventListener(
    'deviceready',
    () => Cognito.login().then(value => start()),
    false);
} else {
  start();
}
