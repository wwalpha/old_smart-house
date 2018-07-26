import { ActionFunction0, ActionFunction1, createAction, BaseAction, Action } from "redux-actions";
import { ActionCreatorsMapObject, ActionCreator } from "redux";
import { App } from '@models';

export interface Actions extends ActionCreatorsMapObject {
  setUserInfo: ActionFunction1<App.UserInfo, Action<App.Payload.User>>,
}
