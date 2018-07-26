import { WithStyles, StyleRules } from "@material-ui/core/styles";
import { Chat, App } from 'models';

export interface Props extends WithStyles<StyleRules> {
  saveRecordFile: (media: Chat.MediaProps) => void,
  addMessage: (type: Chat.MsgType, message: Chat.MediaProps | string) => void
}

export interface State {
  media?: Chat.MediaProps,
  chat?: string,
  value?: string,
  isRecording: boolean,
}