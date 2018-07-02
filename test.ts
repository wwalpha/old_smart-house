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

import * as S3 from 'aws-sdk/clients/s3';
import { AWSError } from 'aws-sdk/lib/error';

const s3 = new S3();
const params: S3.PutObjectRequest = {
  Bucket: 'iot-home-chat',
  Key: 'server.js',
};

import * as fs from 'fs';
params.Body = fs.readFileSync('./server.js');

s3.putObject(params, (err: AWSError, data: S3.PutObjectOutput) => {
  console.log(err);

  console.log(data);
});
