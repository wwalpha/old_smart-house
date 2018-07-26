import { WithStyles, StyleRules } from "@material-ui/core/styles";
import { List } from "immutable";
import { Chat } from "@models";

export interface Props extends WithStyles<StyleRules> {
  messages: Chat.Message[],
}

