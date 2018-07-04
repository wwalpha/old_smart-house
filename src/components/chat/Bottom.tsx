import * as React from 'react';
import { withStyles, Theme, StyleRules } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MicIcon from '@material-ui/icons/Mic';
import { getTimeStamp } from 'utils/system';
import { Props, State } from './Bottom.d';
import { getDir } from 'utils/FileSystem';
import { S3Utils, Config } from 'utils/aws';
import { firebaseDb } from 'utils/firebase/firebase';
import { S3 } from 'aws-sdk';

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

        S3Utils.putObject(media.fullpath, media.filename)
          .then((value: S3.PutObjectOutput) => {
            console.log('s3', value);
            const awsPath = `${Config.S3_URL}/messages/${media.filename}`;

            console.log(awsPath);
            const params = {
              timestamp: getTimeStamp(),
              wav: awsPath,
            };

            firebaseDb.ref('messages').push(params, (error: Error) => {
              saveRecordFile(media);
            });
          });
      }
    } else {
      // フォルダ存在チェック
      getDir(cordova.file.documentsDirectory, 'alpha.iot.homechat')
        .then(() => {
          const filename = `${getTimeStamp()}.wav`;
          const fullpath = `${cordova.file.documentsDirectory}alpha.iot.homechat/${filename}`;
          const media = new Media(filename, () => { });

          // start recording
          media.startRecord();

          this.setState({
            media: {
              filename,
              fullpath,
              file: media,
            },
          });
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
