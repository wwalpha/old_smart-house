import * as React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { createBrowserHistory } from 'history';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { isIOS } from 'react-device-detect';
import { Cognito } from 'utils/aws';
import App from 'src/containers/App';
import createstore from 'src/store';
import config from './aws-exports';
import * as Observable from 'zen-observable';

const history = createBrowserHistory();
const store = createstore(history);

const start = (userInfo: any) => {
  console.log(userInfo);
  render(
    <Provider store={store}>
      <App userInfo={userInfo} />
    </Provider>,
    document.getElementById('root'),
  );
};

(global as any).fetch = require('node-fetch');

Amplify.configure(config);
// Amplify.configure({
//   aws_appsync_graphqlEndpoint: 'https://qw3mafedined7gpfq3vzvtbiv4.appsync-api.ap-northeast-1.amazonaws.com/graphql',
//   aws_appsync_region: 'ap-northeast-1',
//   aws_appsync_authenticationType: 'API_KEY',
//   aws_appsync_apiKey: 'da2-t5mrubagq5ecxnt6kiy2w3twjm',
// });

const username: string = 'test12';
const password: string = 'test1234567890';
console.log(112323);
if (isIOS) {
  document.addEventListener(
    'deviceready',
    () => Cognito.login(username, password).then(userInfo => start(userInfo)),
    false);
} else {
  Cognito.login(username, password).then((userInfo) => {

    const subscribeToEventComments = `subscription SubscribeToEventComments($eventId: String!) {
      subscribeToEventComments(eventId: $eventId) {
        eventId
        commentId
        content
      }
    }`;

    console.log(111);
    // Subscribe with eventId 123
    const subscription = (API.graphql(
      graphqlOperation(subscribeToEventComments, { eventId: '42dd9f82-a793-47cb-8a5c-33668cf7609e' }),
    ) as Observable<object>).subscribe({
      next: (eventData: any) => console.log(eventData),
      error: (error: any) => console.log(error),
    });
    // start(userInfo);
  }).catch(err => console.log(err));
}
