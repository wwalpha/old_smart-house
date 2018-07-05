import Amplify, { Auth } from 'aws-amplify';
import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserSession } from 'amazon-cognito-identity-js';
import Config from './config';

Amplify.configure({
  Auth: {
    region: Config.region,
    ...Config.pool,
  },
});

const auth = () => new Promise((resolve, reject) => {
  const authenticationDetails = new AuthenticationDetails({
    Username: device.uuid,
    Password: device.uuid,
  });

  const userPool = new CognitoUserPool({
    ClientId: Config.pool.userPoolWebClientId,
    UserPoolId: Config.pool.userPoolId,
  });

  const cognitoUser = new CognitoUser({
    Username: device.uuid,
    Pool: userPool,
  });

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (session: CognitoUserSession) => {
      const accessToken = session.getAccessToken().getJwtToken();
      const idToken = session.getIdToken().getJwtToken();

      resolve({
        accessToken,
        idToken,
      });
    },
    onFailure: (err: any) => reject(err),
  });
});

/**
 * ユーザー存在する場合、ユーザー情報を取得する
 * ユーザー存在しない場合、ユーザーを登録してからユーザー情報を取得する
 */
export const login = async () => {
  const username: string = device.uuid;
  const password: string = device.uuid;

  try {
    console.log('start signin');
    await Auth.signIn(username, password);
    console.log('start finish');
  } catch (error) {
    console.log(error);
    try {
      await Auth.signUp({
        username,
        password,
      });

    } catch (errorSignUp) {
      console.log(errorSignUp);
    }
  }

  try {
    console.log('start auth');
    return await auth();
  } catch (errorSignUp) {
    console.log(errorSignUp);
  }

  return null;
};
