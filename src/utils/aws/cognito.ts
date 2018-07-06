import * as AWS from 'aws-sdk';
import { Auth } from 'aws-amplify';
import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserSession } from 'amazon-cognito-identity-js';
import Config from './config';

/** 認証情報を取得する */
const auth = (username: string, password: string): Promise<void> => new Promise((resolve, reject) => {
  const { UserPoolId, IdentityPoolId, UserPoolWebClientId } = Config.Cognito;

  const authenticationDetails = new AuthenticationDetails({
    Username: username,
    Password: password,
  });

  const userPool = new CognitoUserPool({
    ClientId: UserPoolWebClientId,
    UserPoolId,
  });

  const cognitoUser = new CognitoUser({
    Username: username,
    Pool: userPool,
  });

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (session: CognitoUserSession) => {
      const accessToken = session.getAccessToken().getJwtToken();
      const idToken = session.getIdToken().getJwtToken();

      const pool: string = `cognito-idp.${Config.Region}.amazonaws.com/${UserPoolId}`;
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId,
        Logins: {
          // Change the key below according to the specific region your user pool is in.
          [pool]: idToken,
        },
      });

      (AWS.config.credentials as AWS.Credentials).refresh((err: AWS.AWSError) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    },
    onFailure: (err: any) => reject(err),
  });
});

/**
 * ユーザー存在する場合、ユーザー情報を取得する
 * ユーザー存在しない場合、ユーザーを登録してからユーザー情報を取得する
 */
export const login = async (username: string, password: string) => {
  try {
    await Auth.signIn(username, password);
  } catch (error) {
    console.log(error);
    await Auth.signUp({
      username,
      password,
    });

    await Auth.signIn(username, password);
  }

  return await auth(username, password);
};
