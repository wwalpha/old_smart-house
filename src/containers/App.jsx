import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

class App extends Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string),
  }

  handleStart = () => {
    console.log('start');
    navigator.device.capture.captureAudio((mediaFiles) => {
      console.log(mediaFiles);
    }, err => console.error(err), {
      limit: 5,
    });
  }

  handleStop = () => {
    console.error('error');
  }

  render() {
    const { classes } = this.props;

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
          onClick={this.handleStop}
        >
          停止
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
const styles = {
  button: {
    margin: '0px 8px',
  },
};

export default hot(module)(withStyles(styles)(App));
