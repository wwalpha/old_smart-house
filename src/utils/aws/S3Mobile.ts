import { S3, AWSError } from 'aws-sdk';
import Config from './config';
import { resolveLocalFileURL } from 'utils/FileSystem';
export * from './S3Node';

export const putObject = async (localpath: string, bucketPath: string): Promise<S3.PutObjectOutput> => {
  const s3 = new S3();

  const params: S3.PutObjectRequest = {
    Bucket: Config.Bucket,
    Key: bucketPath,
  };

  const file: Entry = resolveLocalFileURL(localpath);
  const reader: FileEntry = new FileReader();
  params.Body = fs.readFileSync(localpath);

  s3.putObject(params, (error: AWSError, data: S3.PutObjectOutput) => {
    if (error) {
      reject(error);
      return;
    }

    resolve(data);
  });
};
