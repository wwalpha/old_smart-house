// import * as Storage from './src/utils/firebase/storage';

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
// import { firebaseDb } from './src/utils/firebase/firebase';

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
import * as AWS from 'aws-sdk';
import Config from './src/utils/aws/config';

AWS.config.region = Config.Region;
AWS.config.update({
  region: Config.Region,
  accessKeyId: Config.AccessKeyId,
  secretAccessKey: Config.SecretAccessKey,
});

const s3 = new AWS.S3();
const params = { Bucket: Config.bucket, Key: 'public/20180706151045169.wav' };
s3.getSignedUrl('getObject', params, (err, url) => {
  console.log('The URL is', url);
});
