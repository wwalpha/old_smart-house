import { ActionFunction0, ActionFunction1, createAction, BaseAction, Action, ActionFunction2 } from "redux-actions";
import { ActionCreatorsMapObject, ActionCreator } from "redux";
import { Chat } from 'models';

export interface Actions extends ActionCreatorsMapObject {
  addMessage: ActionFunction2<Chat.MsgType, string, Action<Chat.Payload.AddMessage>>,
}
