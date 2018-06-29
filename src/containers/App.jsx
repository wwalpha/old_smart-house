import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { storage } from 'fb';

class App extends Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string),
  }

  state = {
    audioPath: undefined,
  }

  handleStart = () => {
    navigator.device.capture.captureAudio((mediaFiles) => {
      console.log(mediaFiles);

      // max one
      mediaFiles.forEach((fullPath) => {
        this.setState({ audioPath: fullPath });
      });
    }, err => console.error(err));
  }

  handlePlay = () => {
    console.log('start play');
    this.audio.play();
  }

  render() {
    const { classes } = this.props;
    const { audioPath } = this.state;
    return (
      <React.Fragment>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.handleStart}
        >
          開始
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.handlePlay}
        >
          再生
        </Button>
        <audio ref={(audio) => { this.audio = audio; }} controls={false}>
          <source src={audioPath} />
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
