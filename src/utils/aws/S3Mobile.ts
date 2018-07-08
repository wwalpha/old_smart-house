import * as AWS from 'aws-sdk';
import { readFile } from '../fileSystem';
import Config from './config';

export * from './s3Base';

export const getSignedUrl = (config: any, bucketPath: string): Promise<string> => new Promise((resolve, reject) => {
  AWS.config.update(config);

  const s3 = new AWS.S3();
  const awsParams = { Bucket: Config.Bucket, Key: bucketPath };
  s3.getSignedUrl('getObject', awsParams, (err: Error, url: string) => {
    err ? reject(err) : resolve(url);
  });
});

const put = (params: AWS.S3.PutObjectRequest): Promise<AWS.S3.PutObjectOutput> => new Promise((resolve, reject) => {
  const s3 = new AWS.S3();

  s3.putObject(params, (error: AWS.AWSError, data: AWS.S3.PutObjectOutput) => {
    if (error) {
      reject(error);
      return;
    }

    resolve(data);
  });
});

export const putObject = async (localpath: string, bucketPath: string): Promise<AWS.S3.PutObjectOutput | null> => {
  try {
    const data: any = await readFile(localpath);

    const params: AWS.S3.PutObjectRequest = {
      Bucket: Config.Bucket,
      Key: bucketPath,
      Body: data,
    };

    return await put(params);
  } catch (error) {
    console.log(error);
  }

  return null;
};
