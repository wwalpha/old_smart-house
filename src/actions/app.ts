import { createAction } from 'redux-actions';
import { APP_USER_INFO } from 'ActionTypes';
import { App } from 'models';

export const setUserInfo = createAction(APP_USER_INFO, (userInfo: App.UserInfo) => ({ userInfo }));
