import * as React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { createBrowserHistory } from 'history';
import createstore from 'src/store';
import Amplify from 'aws-amplify';
import * as AWS from 'aws-sdk';
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

(global as any).fetch = require('node-fetch');

AWS.config.region = Config.Region;
AWS.config.update({
  region: Config.Region,
  accessKeyId: Config.AccessKeyId,
  secretAccessKey: Config.SecretAccessKey,
});

Amplify.configure({
  Auth: {
    region: Config.Region,
    identityPoolId: Config.Cognito.IdentityPoolId,
    userPoolId: Config.Cognito.UserPoolId,
    userPoolWebClientId: Config.Cognito.UserPoolWebClientId,
  },
  Storage: {
    region: Config.Region,
    bucket: Config.bucket,
    IdentityPoolId: 'ap-northeast-1:00cc4b25-0d8e-4b64-a15f-ecb62f3d26f3',
  },
});

const username: string = 'test';
const password: string = 'test1234567890';

if (isIOS) {
  document.addEventListener(
    'deviceready',
    () => Cognito.login(username, password).then(() => start()),
    false);
} else {
  Cognito.login(username, password).then(() => {
    start();
  }).catch(err => console.log(err));
}
