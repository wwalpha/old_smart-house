import * as React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { createBrowserHistory } from 'history';
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify';
import { isIOS } from 'react-device-detect';
import { Cognito } from 'utils/aws';
import App from 'src/containers/App';
import createstore from 'src/store';
import config from 'src/aws-exports';
import AWSAppSyncClient from 'aws-appsync';
import gql from 'graphql-tag';
import * as Observable from 'zen-observable';

const history = createBrowserHistory();
const store = createstore(history);

const start = (userInfo?: any) => {
  // console.log(userInfo);
  render(
    <Provider store={store}>
      <App userInfo={userInfo} />
    </Provider>,
    document.getElementById('root'),
  );
};

// (global as any).fetch = require('node-fetch');

// Amplify.configure(config);

const username: string = 'test11';
const password: string = 'Test1234567890';

const AUTH_TYPE = require('aws-appsync/lib/link/auth-link').AUTH_TYPE;

const startX = async () => {
  const userInfo = await Cognito.login(username, password);
  const jwtToken = (await Auth.currentSession()).getIdToken().getJwtToken();

  const client = new AWSAppSyncClient({
    disableOffline: true,
    url: config.aws_appsync_graphqlEndpoint,
    region: config.aws_project_region,
    auth: {
      type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
      jwtToken,
    },
  });

  client.hydrated().then((client) => {
    console.log(2222222222222222222222222);
    const subquery = gql(`
    subscription SubscribeToRecvMessage {
      subscribeToRecvMessage {
        signedURL
      }
    }`);

    //Now subscribe to results
    const observable = client.subscribe({ query: subquery });
    console.log(33333);
    const realtimeResults = function realtimeResults(data: any) {
      console.log('realtime data: ', data);
    };

    observable.subscribe({
      next: realtimeResults,
      complete: console.log,
      error: console.log,
    });
  });
}

const test = () => {
  Cognito.login(username, password).then((userInfo) => {
    console.log(userInfo);

    // const AddMessage = `mutation AddMessage($bucket: String!, $key: String!, $region: String!, $localUri: String!, $mimeType: String!) {
    //   addMessage(bucket: $bucket, key: $key, region: $region, localUri: $localUri, mimeType: $mimeType) {
    //     signedURL
    //   }
    // }`;

    // // Mutation
    // const eventDetails = {
    //   bucket: "xxx",
    //   key: "private/README.txt",
    //   region: "ap-northeast-1",
    //   localUri: "xxx",
    //   mimeType: "wav"
    // };

    // (API.graphql(graphqlOperation(AddMessage, eventDetails)) as Promise<any>).then((value) => {
    //   console.log(value);
    // });


    const SubscribeToEventComments = `subscription SubscribeToRecvMessage {
      subscribeToRecvMessage {
        signedURL
      }
    }`;

    // Subscribe with eventId 123
    const subscription = (API.graphql(
      graphqlOperation(SubscribeToEventComments)
    ) as Observable<any>).subscribe({
      next: (eventData) => console.log(eventData.value.data.subscribeToRecvMessage.signedURL)
    });

  }).catch(err => console.log(err));
}



const startX2 = () => {
  // console.log(Auth.currentCredentials());

  const auth = {
    type: AUTH_TYPE.API_KEY,
    apiKey: () => config.aws_appsync_apiKey,
  };

  console.log(auth);

  const client = new AWSAppSyncClient({
    disableOffline: true,
    url: config.aws_appsync_graphqlEndpoint,
    region: config.aws_project_region,
    auth,
  });

  client.hydrated().then((client) => {
    console.log(2222222222222222222222222);
    const subquery = gql(`
    subscription SubscribeToRecvMessage {
      subscribeToRecvMessage {
        signedURL
      }
    }`);

    //Now subscribe to results
    const observable = client.subscribe({ query: subquery });
    console.log(33333);
    const realtimeResults = function realtimeResults(data: any) {
      console.log('realtime data: ', data);
    };

    observable.subscribe({
      next: realtimeResults,
      complete: console.log,
      error: console.log,
    });
  });
}

const startNew = async () => {
  await Cognito.login(username, password);
  const jwtToken = (await Auth.currentSession()).getIdToken().getJwtToken();
  const credentials = await Auth.currentCredentials();

  const client = new AWSAppSyncClient({
    disableOffline: true,
    url: config.aws_appsync_graphqlEndpoint,
    region: config.aws_project_region,
    auth: {
      type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
      jwtToken,
    },
    complexObjectsCredentials: credentials,
  });

  client.hydrated().then((client) => {
    const AddMessage = gql(`mutation AddMessage($bucket: String!, $key: String!, $region: String!, $localUri: String!, $mimeType: String!) {
      addMessage(bucket: $bucket, key: $key, region: $region, localUri: $localUri, mimeType: $mimeType) {
        signedURL
      }
    }`);

    client
      .mutate({
        mutation: AddMessage, context: {
          bucket: config.aws_user_files_s3_bucket,
          key: "private/test.wav",
          region: config.aws_user_files_s3_bucket_region,
          localUri: "xxx",
          mimeType: 'audio/wav'
        }
      })
      .then((value) => console.log(value))
      .catch(console.log);
  });
}


if (isIOS) {
  document.addEventListener(
    'deviceready',
    () => Cognito.login(username, password).then(userInfo => start(userInfo)),
    false);
} else {
  // startNew();
  start();
}
