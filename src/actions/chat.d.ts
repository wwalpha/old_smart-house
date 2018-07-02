import { ActionFunction0, Action, ActionFunction1, createAction } from "redux-actions";
import { ActionCreatorsMapObject, ActionCreator } from "redux";

export interface Actions extends ActionCreatorsMapObject {
  saveRecordFile: ActionFunction1<Media, Action<Media>>,
}
