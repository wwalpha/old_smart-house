import { CognitoIdentityCredentials } from 'aws-sdk';
import { Record } from 'immutable';
import { App } from '@models';

export class AppClass extends Record<App.Props>({
  userInfo: undefined,
}) {

  setUserInfo(props: App.Props) {
    return this
      .set('userInfo', props.userInfo);
  }
}
