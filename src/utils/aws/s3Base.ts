import { S3, AWSError } from 'aws-sdk';
import Config from './aws-exports';

export const getObject = (filepath: string): Promise<S3.PutObjectOutput> => new Promise((resolve, reject) => {
  const s3 = new S3();

  const params: S3.GetObjectRequest = {
    Bucket: Config.aws_user_files_s3_bucket,
    Key: filepath,
  };

  s3.getObject(params, (error: AWSError, data: S3.GetObjectOutput) => {
    if (error) {
      reject(error);
      return;
    }

    resolve(data);
  });
});

// max 1000
export const dirList = (): Promise<S3.ListObjectsOutput> => new Promise((resolve, reject) => {
  const s3 = new S3();

  const params: S3.ListObjectsRequest = {
    Bucket: Config.aws_user_files_s3_bucket,
  };

  s3.listObjects(params, (error: AWSError, data: S3.ListObjectsOutput) => {
    if (error) {
      reject(error);
      return;
    }

    resolve(data);
  });
});

const getSignedUrl = (type: string, params: any) => new Promise<any>((resolve, reject) => {
  const s3 = new S3();

  s3.getSignedUrl(type, params, (err, url) => {
    if (err) {
      reject(err);
      return;
    }

    resolve(url);

    console.log('The URL is', url);
  });
});
