import { handleActions, Action } from 'redux-actions';
import { APP_USER_INFO } from 'ActionTypes';
import { AppClass } from 'models/App';
import { App } from 'models';

const initialState: any = new AppClass();

const app = handleActions<App.State, any>({
  [APP_USER_INFO]: (state: App.State, action: Action<App.Payload.User>) => {
    return action.payload ? state.setUserInfo(action.payload) : state;
  },

  // tslint:disable-next-line:align
}, initialState);

export default app;
