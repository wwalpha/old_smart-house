import * as Firebase from 'firebase';
import FirebaseConfig from './config';

import * as App from 'firebase/app';
// import 'firebase/app';
import 'firebase/storage';
import 'firebase/database';

export const firebaseApp = undefined;
// export const firebaseApp = App.initializeApp(FirebaseConfig);
export const firebaseAuth = Firebase.auth();
export const firebaseDb = Firebase.database();
export const storage = Firebase.storage();
