import * as React from 'react';
import { withStyles, Theme, StyleRules } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MicIcon from '@material-ui/icons/Mic';
import { isMobile, isBrowser } from 'react-device-detect';
import { getTimeStamp } from 'utils/system';
import { Props, State } from './Bottom.d';

class Bottom extends React.Component<Props, {}> {
  state: State = {
    media: undefined,
    value: undefined,
    isRecording: false,
  };

  handleChange = (event: React.ChangeEvent<{}>, value: any) => this.setState({ value });

  handleRecord = () => {
    const { saveRecordFile } = this.props;
    const { isRecording, media } = this.state;
    if (isMobile) {
      this.setState({ isRecording: !isRecording });
      return;
    }
    if (isRecording) {
      if (media && saveRecordFile) {
        media.stopRecord();

        console.log(media);
        saveRecordFile(media);
      }
    } else {
      const filename = `${getTimeStamp()}.wav`;
      const media = new Media(filename, () => { });

      console.log(media);
      // start recording
      media.startRecord();

      this.setState({
        isRecording: !isRecording,
        media,
      });
    }
  }

  handlePlay = () => {
    const { media } = this.state;

    if (media) media.play();
  }

  render() {
    const { classes } = this.props;
    const { isRecording } = this.state;

    return (
      <div style={{ height: '100vh' }}>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={this.handlePlay}
          disableRipple
          disableFocusRipple
          fullWidth
          classes={{ root: classes.play }}
        >
          再生
        </Button>
        <Button
          variant="contained"
          size="large"
          color="primary"
          classes={{
            root: classes.root,
            contained: !isRecording ? classes.mic : classes.recording,
          }}
          onClick={this.handleRecord}
          disableRipple
          disableFocusRipple
          fullWidth
        >
          <MicIcon />
        </Button>
      </div>
    );
  }
}

const styles = (theme: Theme): StyleRules => ({
  root: {
    bottom: 0,
    position: 'absolute',
  },
  play: {
    top: 0,
    position: 'fixed',
  },
  mic: {
    color: theme.palette.grey['100'],
  },
  recording: {
    color: `${theme.palette.grey['100']} !important`,
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
});

export default withStyles(styles)(Bottom);
