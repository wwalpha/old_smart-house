import { WithStyles, StyleRules } from "@material-ui/core/styles";
import { ActionCreatorsMapObject } from "redux";
import { ChatActions } from 'actions/index.d';

export interface Props extends WithStyles<StyleRules> {
  actions: ChatActions,
}

export interface StateProps {
}

export interface DispatchProps {
}