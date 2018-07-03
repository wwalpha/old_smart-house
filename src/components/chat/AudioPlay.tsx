import * as React from 'react';
import { withStyles, Theme, StyleRules } from '@material-ui/core/styles';
import MicIcon from '@material-ui/icons/Mic';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import { Props } from './AudioPlay.d';

class AudioPlay extends React.PureComponent<Props, any> {
  state = {
    playing: false,
  };

  playsound = (media: Media) => new Promise((resolve) => {
    media.play();
  })

  handlePlay = () => {
    this.setState({ playing: true });

    this.playsound(this.props.media).then(() => this.setState({ playing: false }));
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Button
          variant="contained"
          classes={{ root: classes.button, contained: classes.contained }}
          disabled={this.state.playing}
          disableRipple
          disableFocusRipple
          onClick={this.handlePlay}
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
      minWidth: '150px',
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
