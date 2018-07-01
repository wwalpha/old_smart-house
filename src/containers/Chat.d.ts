import { WithStyles, StyleRules } from "@material-ui/core/styles";
import { ActionCreatorsMapObject } from "redux";
import { ChatActions } from 'actions/index.d';
import { Chat } from 'models/index.d';
import { MapStateToProps } from "react-redux";


export interface Props extends WithStyles<StyleRules> {
  actions: ChatActions,
}

export interface StateFromProps extends Chat.Props {
}

export interface DispatchProps {
}