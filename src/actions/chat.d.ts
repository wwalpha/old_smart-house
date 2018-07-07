import { ActionFunction0, ActionFunction1, createAction, BaseAction, Action } from "redux-actions";
import { ActionCreatorsMapObject, ActionCreator } from "redux";
import { Chat } from 'models';

export interface Actions extends ActionCreatorsMapObject {
  saveRecordFile: ActionFunction1<Chat.MediaProps, Action<Chat.Payload.SaveRecordFile>>,
}
