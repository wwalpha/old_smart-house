import gql from 'graphql-tag';

export default gql`
mutation AddMessage($bucket: String!, $key: String!, $region: String!, $localUri: String!, $mimeType: String!) {
  addMessage(
    bucket: $bucket
    key: $key
    region: $region
    localUri: $localUri
    mimeType: $mimeType
  )
}`;
