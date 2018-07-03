import { List } from "immutable";
import { WithStyles, StyleRules } from "@material-ui/core/styles";
import { ActionCreatorsMapObject, ActionCreator } from "redux";
import * as Chat from 'actions/chat.d';
export * from 'src/store/index.d';

export interface StateToProps {
  media: Media[],
}

export interface DispatchToProps {
  actions: Chat.Actions,
}

export type Actions = Chat.Actions;

export interface Props extends StateToProps, DispatchToProps, WithStyles<StyleRules> {
}
