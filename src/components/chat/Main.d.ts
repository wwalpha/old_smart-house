import { WithStyles, StyleRules } from "@material-ui/core/styles";
import { List } from "immutable";

export interface Props extends WithStyles<StyleRules> {
  media?: List<Media>,
}

