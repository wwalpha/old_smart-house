import { ActionFunction0, Action } from "redux-actions";
import { ActionCreatorsMapObject } from "redux";

export type ChatActions = {
  saveRecordFile: (media: Media) => ActionFunction0<Action<{}>>
}