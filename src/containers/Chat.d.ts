import { WithStyles, StyleRules } from "@material-ui/core/styles";
import { ActionCreatorsMapObject } from "redux";
import { ChatActions } from 'actions/index.d';
import { Chat } from 'models'
import { MapStateToProps } from "react-redux";

export interface Props extends WithStyles<StyleRules> {
  actions: ChatActions,
}

export interface DispatchProps {
}