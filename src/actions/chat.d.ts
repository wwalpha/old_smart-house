import { ActionFunction0, ActionFunction1, createAction, BaseAction } from "redux-actions";
import { ActionCreatorsMapObject, ActionCreator } from "redux";
import { Payload } from 'models/Chat.d';
import { Action } from 'typings/global';

export interface Actions extends ActionCreatorsMapObject {
  saveRecordFile: ActionFunction1<Media, Action<Payload.SaveRecordFile>>,
}
