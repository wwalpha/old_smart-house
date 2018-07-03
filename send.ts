import { firebaseDb } from './src/utils/firebase/firebase';
import * as moment from 'moment';

// firebaseDb.ref('messages').child('-LGUtZMCTDeerfCUjZ3P').remove();

firebaseDb.ref('messages').push({
  wav: 'https://s3-ap-northeast-1.amazonaws.com/iot-home-chat/20180703223901.wav',
  timestamp: moment().utc().format(),
});
