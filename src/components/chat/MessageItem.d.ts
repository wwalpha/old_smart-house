import { WithStyles, StyleRules } from "@material-ui/core/styles";
import { Component } from "react";
import { Chat } from '@models';

export interface Props extends WithStyles<StyleRules> {
  item: Chat.Message,
}

export interface State {
  isPlaying: boolean,
  isSended: boolean,
}