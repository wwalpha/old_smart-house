
// export {
//   Storage,
// };
// import * as fs from 'fs';

// console.log(1111);
// // console.log(storage);
// // const r = new FileReader();

// function toArrayBuffer(buffer: Buffer): Uint8Array {
//   const ab = new ArrayBuffer(buffer.length);
//   const view = new Uint8Array(ab);
//   for (let i = 0; i < buffer.length; i += 1) {
//     view[i] = buffer[i];
//   }
//   return view;
// }

// fs.readFile('./server.js', (err, data) => {
//   console.log(data);
//   console.log(toArrayBuffer(data));
//   Storage.put('server.js', toArrayBuffer(data)).catch(error => console.log(error));
// });

// import * as S3 from 'aws-sdk/clients/s3';
// import { AWSError } from 'aws-sdk/lib/error';

// const ref = firebaseDb.ref('messages');

// ref.
//   ref.on('child_added', (snapshot: firebase.database.DataSnapshot) => {
//     console.log('child_added', snapshot.val());
//   });

// ref.on('child_changed', (snapshot: firebase.database.DataSnapshot) => {
//   console.log('child_changed', snapshot);
// });

// ref.on('child_moved', (snapshot: firebase.database.DataSnapshot) => {
//   console.log('child_moved', snapshot);
// });

// ref.on('child_removed', (snapshot: firebase.database.DataSnapshot) => {
//   console.log('child_removed', snapshot);
// });

// ref.on('value', (snapshot: firebase.database.DataSnapshot) => {
//   console.log(snapshot.val());
// });
// import * as moment from 'moment';
// ref.orderByChild('timestamp').startAt(moment().utc().format()).on('child_added', (snapshot: firebase.database.DataSnapshot) => {
//   console.log(snapshot.val());
// });

// console.log('start');

// Amplify.configure({
//   Auth: {
//     region: 'ap-northeast-1',
//     userPoolId: 'ap-northeast-1_DlXJc0xUN',
//     userPoolWebClientId: '1vmq0hpdu9j9khkiq6l6adpvl2',
//   },
// });
// console.log('222');
// Auth.signUp({
//   username: 'abc12345678901',
//   password: 'mysecurerandompassword#123',
// })
//   .then((value) => {
//     console.log(1111);
//     console.log(value);
//   })
//   .catch(error => console.log(error));
// import * as AWS from 'aws-sdk';
// import Config from './src/utils/aws/config';

// AWS.config.region = Config.Region;
// AWS.config.update({
//   region: Config.Region,
//   accessKeyId: Config.AccessKeyId,
//   secretAccessKey: Config.SecretAccessKey,
// });

// const s3 = new AWS.S3();
// const params = { Bucket: Config.bucket, Key: 'public/20180706233116194.wav' };
// s3.getSignedUrl('getObject', params, (err, url) => {
//   console.log('The URL is', url);
// });
import Amplify, { Auth, API, graphqlOperation, PubSub } from 'aws-amplify';
import * as Observable from 'zen-observable';
// import config from './aws-exports';
import { parse } from 'graphql/language/parser';
import { LocalStorage } from 'node-localstorage';

const storage: any = new LocalStorage('./scratch');
(global as any).localStorage = storage;

console.log('localStorage' in global);
console.log((global as any).localStorage !== null);

// console.log((global as any).localStorage);
Amplify.configure({
  aws_appsync_graphqlEndpoint: 'https://qw3mafedined7gpfq3vzvtbiv4.appsync-api.ap-northeast-1.amazonaws.com/graphql',
  aws_appsync_region: 'ap-northeast-1',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'da2-t5mrubagq5ecxnt6kiy2w3twjm',
});

const username: string = 'test12';
const password: string = 'test1234567890';

// Auth.signIn(username, password).then(() => {
const subscribeToEventComments = `subscription SubscribeToEventComments($eventId: String!) {
    subscribeToEventComments(eventId: $eventId) {
      eventId
      commentId
      content
    }
  }`;

const testQL = `mutation Event {
  createEvent(
    name: "1111"
    when: "222"
    where: "3333"
    description: "4444"
  ) {
    id
  }
}`;

console.log(111);
//   // Subscribe with eventId 123
const subscription = (API.graphql(
  graphqlOperation(subscribeToEventComments, { eventId: '42dd9f82-a793-47cb-8a5c-33668cf7609e' }),
) as Observable<object>).subscribe({
  next: (eventData: any) => console.log(eventData),
  error: (error: any) => console.log(error),
});
// }).catch(err => console.log(err));

// const test = API.graphql(
//   graphqlOperation(subscribeToEventComments, { eventId: '123' }),
// );
// const queryX = graphqlOperation(testQL);

console.log(parse(testQL));
// const query = API.graphql(queryX);

// console.log(query);

// if (typeof query ==)
// console.log(test);
// const subscription = (API.graphql(
//   graphqlOperation(subscribeToEventComments, { eventId: 'e88a6941-4b8c-45fd-8a96-e3b723cdd10e' }),
// ) as Observable<object>).subscribe({
//   next: (eventData: any) => console.log(eventData),
//   error: (error: any) => console.log(error),
// });

// const newEvent = async () => {
//   console.log(123);
//   const ret = await API.graphql(graphqlOperation(testQL));
//   console.log(456);
//   console.log(ret);
// };

// newEvent();
// console.log(123123);
