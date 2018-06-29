import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MicIcon from '@material-ui/icons/Mic';

class App extends Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string),
  }

  state = {
    media: undefined,
    micDisabled: false,
  }

  handleStart = () => {
    const media = new Media('test.wav');

    // Record audio
    media.startRecord();
    // Record 10s
    setTimeout(() => media.stopRecord(), 10000);

    this.setState({
      media,
      micDisabled: true,
    });
  }

  handlePlay = () => {
    const { media } = this.state;

    media.stopRecord();
    media.play();

    this.setState({ media: undefined, micDisabled: false });
  }

  render() {
    const { classes } = this.props;
    const { audioPath, micDisabled } = this.state;

    console.log(audioPath);
    return (
      <React.Fragment>
        <Button
          variant="fab"
          color="primary"
          className={classes.button}
          onClick={this.handleStart}
          disabled={micDisabled}
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
        <audio src={audioPath} ref={(audio) => { this.audio = audio; }} controls>
          <track kind="captions" label="English captions" default />
        </audio>
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
const styles = {
  button: {
    margin: '0px 8px',
  },
};

export default hot(module)(withStyles(styles)(App));
