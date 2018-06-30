import { WithStyles, StyleRules } from "@material-ui/core/styles";

export interface Props extends WithStyles<StyleRules> {
  saveRecordFile?: (media: Media) => void,
}

export interface State {
  media?: Media,
  value?: string,
  isRecording: boolean,
}