import { List } from "immutable";
import { WithStyles, StyleRules } from "@material-ui/core/styles";
import { ActionCreatorsMapObject, ActionCreator } from "redux";
import * as ChatActions from 'actions/chat.d';
import { Chat, App } from "@models";
export * from 'src/store/index.d';

export interface StateToProps {
}

export interface DispatchToProps {
}

export type Actions = ChatActions.Actions;

export interface Props extends StateToProps, DispatchToProps, WithStyles<StyleRules> {
}
