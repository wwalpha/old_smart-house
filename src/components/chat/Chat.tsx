import * as React from 'react';
import { withStyles, StyleRules, Theme } from '@material-ui/core/styles';
import { Props } from './Chat.d';
import Bottom from 'components/chat/Bottom';

class Chat extends React.Component<Props, {}> {

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Bottom />
      </React.Fragment>
    );
  }
}

const styles = (theme: Theme): StyleRules => ({
  button: {
    margin: '0px 8px',
    backgroundColor: theme.palette.primary.main,
  },
  clicked: {
    margin: '0px 8px',
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
});

export default withStyles(styles)(Chat);
