import * as React from 'react';
import { withStyles, Theme, StyleRules } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MicIcon from '@material-ui/icons/Mic';
import { Storage } from 'aws-amplify';
import { getTimeStamp } from 'utils/system';
import { Props, State } from './Bottom.d';
import { Config } from 'utils/aws';
import { firebaseDb } from 'utils/firebase/firebase';
import { readFile } from 'utils/fileSystem';

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

    this.setState({ isRecording: !isRecording });

    if (isRecording) {
      if (media) {
        media.file.stopRecord();

        const fullpath = `${cordova.file.tempDirectory}${media.filename}`;

        readFile(fullpath).then((value: any) => {
          console.log('file', value);

          Storage.put('test.wav', value);

          const awsPath = `${Config.S3_URL}/${Config.bucket}/public/${media.filename}`;

          //  console.log('awsPath', awsPath);
          const params = {
            timestamp: getTimeStamp(),
            wav: awsPath,
          };

          firebaseDb.ref('messages').push(params, (error: Error) => {
            saveRecordFile(media);
          });
        }).catch((err: any) => console.log(err));
      }
    } else {
      const filename = `${getTimeStamp()}.wav`;
      const media = new Media(filename, () => { });

      // start recording
      media.startRecord();

      this.setState({
        media: {
          filename,
          file: media,
        },
      });
    }
  }

  handlePlay = () => {
    const { media } = this.state;

    if (media) media.file.play();
  }

  render() {
    const { classes } = this.props;
    const { isRecording } = this.state;

    return (
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
    );
  }
}

const styles = (theme: Theme): StyleRules => ({
  root: {
    transition: 'unset',
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
