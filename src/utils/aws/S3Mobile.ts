import { S3, AWSError } from 'aws-sdk';
import { readFile } from '../fileSystem';
import Config from './config';

export * from './s3Base';

const put = (params: S3.PutObjectRequest): Promise<S3.PutObjectOutput> => new Promise((resolve, reject) => {
  const s3 = new S3();

  s3.putObject(params, (error: AWSError, data: S3.PutObjectOutput) => {
    if (error) {
      reject(error);
      return;
    }

    resolve(data);
  });
});

export const putObject = async (localpath: string, bucketPath: string): Promise<S3.PutObjectOutput | null> => {
  try {
    const data: any = await readFile(localpath);

    console.log('data', data);
    const params: S3.PutObjectRequest = {
      Bucket: Config.bucket,
      Key: bucketPath,
      Body: data,
    };

    return await put(params);
  } catch (error) {
    console.log(error);
  }

  return null;
};
