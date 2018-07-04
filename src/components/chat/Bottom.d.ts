import { WithStyles, StyleRules } from "@material-ui/core/styles";

export interface Props extends WithStyles<StyleRules> {
  saveRecordFile: (media: any) => void,
}

export interface MediaProps {
  filename: string,
  fullpath: string,
  file: Media,
}

export interface State {
  media?: MediaProps,
  value?: string,
  isRecording: boolean,
}