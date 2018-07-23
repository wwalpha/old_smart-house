import { WithStyles, StyleRules } from "@material-ui/core/styles";

export interface Props extends WithStyles<StyleRules> {
  selectedValue?: string
  onChange?: (value: string) => void
}
