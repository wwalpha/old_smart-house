import { WithStyles, StyleRules } from "@material-ui/core/styles";
import { Chat } from 'models';

export interface Props extends WithStyles<StyleRules> {
  saveRecordFile: (media: Chat.MediaProps) => void,
}

export interface State {
  media?: Chat.MediaProps,
  value?: string,
  isRecording: boolean,
}