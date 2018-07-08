import { WithStyles, StyleRules } from "@material-ui/core/styles";
import * as AppActions from 'actions/app.d';
import { App } from "models";

export interface DispatchToProps {
  actions: AppActions.Actions,
}

export type Actions = AppActions.Actions;

export interface Props extends DispatchToProps, WithStyles<StyleRules> {
  userInfo: App.UserInfo,
}
