import { S3, AWSError } from 'aws-sdk';
import * as fs from 'fs';
import Config from './config';
export * from './s3Base';

export const putObject = (localpath: string, bucketPath: string): Promise<S3.PutObjectOutput> => new Promise((resolve, reject) => {
  const s3 = new S3();

  const params: S3.PutObjectRequest = {
    Bucket: Config.Bucket,
    Key: bucketPath,
  };

  params.Body = fs.readFileSync(localpath);

  s3.putObject(params, (error: AWSError, data: S3.PutObjectOutput) => {
    if (error) {
      reject(error);
      return;
    }

    resolve(data);
  });
});
