import * as FirebaseApp from 'firebase/app';

import FirebaseConfig from './config';

export const firebaseApp = FirebaseApp.initializeApp(FirebaseConfig);
export const firebaseAuth = firebaseApp.auth();
export const firebaseDb = firebaseApp.database();
// export const storage = Firebase.storage();
