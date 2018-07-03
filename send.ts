import { firebaseDb } from './src/utils/firebase/firebase';
import * as moment from 'moment';

// firebaseDb.ref('messages').child('-LGUtZMCTDeerfCUjZ3P').remove();

firebaseDb.ref('messages').push({
  body: '444444',
  timestamp: moment().utc().format(),
});
