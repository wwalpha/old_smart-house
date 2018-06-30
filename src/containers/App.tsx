import * as React from 'react';
import { hot } from 'react-hot-loader';
import { withStyles, StyleRules, StyleRulesCallback, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MicIcon from '@material-ui/icons/Mic';
import { Props } from './App.d';

class App extends React.Component<Props, {}> {

  state = {
    micClicked: false,
    media: new Media('record.wav', () => { }),
  };

  handleStart = () => {
    const { micClicked, media } = this.state;

    if (!micClicked) {
      media.startRecord();
    } else {
      media.stopRecord();
    }

    this.setState({ micClicked: !micClicked });
  }

  handlePlay = () => {
    const { media } = this.state;

    media.play();
  }

  render() {
    const { classes } = this.props;
    const { micClicked } = this.state;

    return (
      <React.Fragment>
        <Button
          variant="fab"
          color="primary"
          className={micClicked ? classes.clicked : classes.button}
          onClick={this.handleStart}
        >
          <MicIcon />
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.handlePlay}
        >
          再生
        </Button>
      </React.Fragment>
    );
  }
}

// const mapStateToProps = state => ({
//   word: state.word,
//   visible: selector(state, 'visible'),
// });

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(AppActions, dispatch),
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(hot(module)(App));
const styles = (theme: Theme): StyleRules => ({
  button: {
    margin: '0px 8px',
    backgroundColor: theme.palette.primary.main,
  },
  clicked: {
    margin: '0px 8px',
    backgroundColor: theme.palette.secondary.main,
  },
});

export default hot(module)(withStyles(styles)(App));
