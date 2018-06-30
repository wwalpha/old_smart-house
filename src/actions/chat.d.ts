import { ActionFunction0, Action } from "redux-actions";
import { ActionCreatorsMapObject } from "redux";

export interface ChatActions extends ActionCreatorsMapObject {
  save: (media: Media) => ActionFunction0<Action<{}>>
}
