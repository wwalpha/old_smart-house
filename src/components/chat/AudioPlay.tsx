import * as React from 'react';
import { withStyles, Theme, StyleRules } from '@material-ui/core/styles';
import MicIcon from '@material-ui/icons/Mic';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import { Props } from './AudioPlay.d';

class AudioPlay extends React.Component<Props, any> {

  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<any>) {
    return this.props.media !== nextProps.media;
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Button
          variant="contained"
          classes={{ root: classes.button, contained: classes.contained }}
          disableRipple
          disableFocusRipple
        >
          <MicIcon />
        </Button>
      </div>
    );
  }
}

const styles = (theme: Theme): StyleRules => {
  console.log(theme);
  return {
    root: {
      textAlign: 'right',
      margin: theme.spacing.unit,
    },
    button: {
      maxWidth: '200px',
      minWidth: '200px',
      color: theme.palette.common.white,
      backgroundColor: green['200'],
    },
    contained: {
      '&:hover': {
        backgroundColor: green['200'],
      },
    },
  };
};

export default withStyles(styles)(AudioPlay);
