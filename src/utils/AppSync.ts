import { Storage, API, graphqlOperation } from 'aws-amplify';
import { Config } from 'utils/aws';
import { readFile } from 'utils/fileSystem';

/** 音声アップロードおよび通知 */
export const sendMedia = async (fileName: string) => {
  // ファイルパス
  const fullpath = `${cordova.file.tempDirectory}${fileName}`;

  // Read File
  const file: any = await readFile(fullpath);

  // Upload to S3
  await Storage.put(fileName, file, { contentType: 'audio/wav' });

  // Mutataion
  const addMessage = `mutation AddMessage($bucket: String!, $key: String!, $region: String!, $mimeType: String!) {
      addMessage(bucket: $bucket, key: $key, region: $region, mimeType: $mimeType) {
        signedURL
      }
    }`;

  // Mutation
  const values = {
    bucket: Config.aws_user_files_s3_bucket,
    key: `public/${fileName}`,
    region: Config.aws_project_region,
    mimeType: 'audio/wav',
  };

  return await (API.graphql(graphqlOperation(addMessage, values)) as Promise<any>);
};

export const sendText = async (message: string) => {
  // Mutataion
  const addMessage = `mutation AddMessage($bucket: String!, $key: String!, $region: String!, $mimeType: String!) {
    addMessage(bucket: $bucket, key: $key, region: $region, mimeType: $mimeType) {
      signedURL
    }
  }`;

  // Mutation
  const values = {
    message,
  };

  return await (API.graphql(graphqlOperation(addMessage, values)) as Promise<any>);
};
