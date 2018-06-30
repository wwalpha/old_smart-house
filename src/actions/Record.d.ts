import { ActionFunction0, Action } from "redux-actions";

export interface Record {
  save: (media: Media) => ActionFunction0<Action<{}>>
}
