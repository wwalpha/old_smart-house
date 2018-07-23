import { Record } from 'immutable';
import { CognitoUser } from 'amazon-cognito-identity-js';

export type CUser = CognitoUser;

export type UserInfo = {
  user: CUser,
};

export interface Props extends Object {
  userInfo: UserInfo,
}

export module Payload {
  interface User {
    userInfo: UserInfo,
  }
}

export interface State extends Record<Props> {
  setUserInfo: (payload: Props) => State;
}

export interface Store extends Props, State {
  get<K extends keyof Props>(key: K): Props[K];
}
