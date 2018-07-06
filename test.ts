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

import Amplify, { Auth, Storage } from 'aws-amplify';
import Config from './src/utils/aws/config';
import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserSession } from 'amazon-cognito-identity-js';
import * as fs from 'fs';

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

// console.log(Amplify);
// Storage.put('server.js', fs.readFileSync('./server.js'))
//   .then((value: Object) => console.log(value))
//   .catch((error: any) => console.log(error));

// const test = async () => {
//   console.log(username, password);
//   await Auth.signIn(username, password);
//   console.log(2222);
//   // await Storage.put('server.js', fs.readFileSync('./server.js'));
//   console.log(3333);
// };

// test().then(() => console.log('123')).catch(x => console.log(x));
// Auth.signUp({
//   username,
//   password,
// }).then((value: any) => console.log(value));

(global as any).fetch = require('node-fetch');
// Cognito.login(username, password);

const auth = (username: string, password: string) => new Promise((resolve, reject) => {
  const authenticationDetails = new AuthenticationDetails({
    Username: username,
    Password: password,
  });

  const userPool = new CognitoUserPool({
    ClientId: Config.pool.userPoolWebClientId,
    UserPoolId: Config.pool.userPoolId,
  });

  const cognitoUser = new CognitoUser({
    Username: username,
    Pool: userPool,
  });

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (session: CognitoUserSession) => {
      const accessToken = session.getAccessToken().getJwtToken();
      const idToken = session.getIdToken().getJwtToken();

      resolve({
        accessToken,
        idToken,
      });
    },
    onFailure: (err: any) => reject(err),
  });
});

/**
 * ユーザー存在する場合、ユーザー情報を取得する
 * ユーザー存在しない場合、ユーザーを登録してからユーザー情報を取得する
 */
export const login = async (username: string, password: string) => {
  try {
    console.log('start signin');
    await Auth.signIn(username, password);
    console.log('start finish');
  } catch (error) {
    console.log(error);
    // try {
    //   await Auth.signUp({
    //     username,
    //     password,
    //   });

    // } catch (errorSignUp) {
    //   console.log(errorSignUp);
    // }
  }

  // try {
  //   console.log('start auth');
  //   return await auth(username, password);
  // } catch (errorSignUp) {
  //   console.log(errorSignUp);
  // }

  return null;
};

const username: string = 'test';
const password: string = 'test1234567890';
login(username, password);
console.log('finish');
