import * as React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { createBrowserHistory } from 'history';
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify';
import { isIOS } from 'react-device-detect';
import { Cognito } from 'utils/aws';
import App from 'src/containers/App';
import createstore from 'src/store';
import { Config } from 'src/utils/aws';
import AWSAppSyncClient from 'aws-appsync';
import gql from 'graphql-tag';
import * as Observable from 'zen-observable';

const history = createBrowserHistory();
const store = createstore(history);

const start = (userInfo: any) => {
  render(
    <Provider store={store}>
      <App userInfo={userInfo} />
    </Provider>,
    document.getElementById('root'),
  );
};

// (global as any).fetch = require('node-fetch');

Amplify.configure(Config);

const username: string = 'test11';
const password: string = 'Test1234567890';

// const AUTH_TYPE = require('aws-appsync/lib/link/auth-link').AUTH_TYPE;

// const startX = async () => {
//   const userInfo = await Cognito.login(username, password);
//   const jwtToken = (await Auth.currentSession()).getIdToken().getJwtToken();

//   const client = new AWSAppSyncClient({
//     disableOffline: true,
//     url: Config.aws_appsync_graphqlEndpoint,
//     region: Config.aws_project_region,
//     auth: {
//       type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
//       jwtToken,
//     },
//   });

//   client.hydrated().then((client) => {
//     console.log(2222222222222222222222222);
//     const subquery = gql(`
//     subscription SubscribeToRecvMessage {
//       subscribeToRecvMessage {
//         signedURL
//       }
//     }`);

//     // Now subscribe to results
//     const observable = client.subscribe({ query: subquery });
//     console.log(33333);
//     const realtimeResults = function realtimeResults(data: any) {
//       console.log('realtime data: ', data);
//     };

//     observable.subscribe({
//       next: realtimeResults,
//       complete: console.log,
//       error: console.log,
//     });
//   });
// };

// const startX2 = () => {
//   // console.log(Auth.currentCredentials());

//   const auth = {
//     type: AUTH_TYPE.API_KEY,
//     apiKey: () => Config.aws_appsync_apiKey,
//   };

//   console.log(auth);

//   const client = new AWSAppSyncClient({
//     disableOffline: true,
//     url: Config.aws_appsync_graphqlEndpoint,
//     region: Config.aws_project_region,
//     auth,
//   });

//   client.hydrated().then((client) => {
//     console.log(2222222222222222222222222);
//     const subquery = gql(`
//     subscription SubscribeToRecvMessage {
//       subscribeToRecvMessage {
//         signedURL
//       }
//     }`);

//     // Now subscribe to results
//     const observable = client.subscribe({ query: subquery });
//     console.log(33333);
//     const realtimeResults = function realtimeResults(data: any) {
//       console.log('realtime data: ', data);
//     };

//     observable.subscribe({
//       next: realtimeResults,
//       complete: console.log,
//       error: console.log,
//     });
//   });
// };

// const startNew = async () => {
//   await Cognito.login(username, password);
//   const jwtToken = (await Auth.currentSession()).getIdToken().getJwtToken();
//   const credentials = await Auth.currentCredentials();

//   const client = new AWSAppSyncClient({
//     disableOffline: true,
//     url: Config.aws_appsync_graphqlEndpoint,
//     region: Config.aws_project_region,
//     auth: {
//       type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
//       jwtToken,
//     },
//     complexObjectsCredentials: credentials,
//   });

//   client.hydrated().then((client) => {
//     const addMessage = gql(`mutation AddMessage($bucket: String!, $key: String!, $region: String!, $localUri: String!, $mimeType: String!) {
//       addMessage(bucket: $bucket, key: $key, region: $region, localUri: $localUri, mimeType: $mimeType) {
//         signedURL
//       }
//     }`);

//     client
//       .mutate({
//         mutation: addMessage, context: {
//           bucket: Config.aws_user_files_s3_bucket,
//           key: 'private/test.wav',
//           region: Config.aws_user_files_s3_bucket_region,
//           localUri: 'xxx',
//           mimeType: 'audio/wav',
//         },
//       })
//       .then(console.log)
//       .catch(console.log);
//   });
// };

if (isIOS) {
  document.addEventListener(
    'deviceready',
    () => Cognito.login(username, password).then(userInfo => start(userInfo)),
    false);
} else {
  Cognito.login(username, password)
    .then(userInfo => start(userInfo))
    .catch(console.log);
}
