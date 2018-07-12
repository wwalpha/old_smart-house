import * as React from 'react';
import { withStyles, Theme, StyleRules } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MicIcon from '@material-ui/icons/Mic';
import { Storage } from 'aws-amplify';
import { Config, S3Utils } from 'utils/aws';
import { readFile } from 'utils/fileSystem';
import { getTimeStamp } from 'utils/system';
import { Chat, App } from 'models';
import { Props, State } from './Bottom.d';

class Bottom extends React.Component<Props, {}> {
  state: State = {
    media: undefined,
    value: undefined,
    isRecording: false,
  };

  handleChange = (event: React.ChangeEvent<{}>, value: any) => this.setState({ value });

  upload = async (credentials: App.Credentials, media: Chat.MediaProps) => {
    const fullpath = `${cordova.file.tempDirectory}${media.filename}`;

    console.log('fullpath', fullpath);
    const file: any = await readFile(fullpath);
    console.log('file', file);

    const ret = await Storage.put(media.filename, file, {
      contentType: 'audio/wav',
    });

    console.log('ret', ret);

    const config = {
      region: Config.Region,
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
    };

    console.log(config);

    const signedURL = await S3Utils.getSignedUrl(config, `public/${media.filename}`);

    console.log('signedURL', signedURL);

    const params = {
      timestamp: getTimeStamp(),
      wav: signedURL,
    };
    console.log('awsPath', params);

    return params;
  }

  handleRecord = () => {
    const { saveRecordFile, credentials } = this.props;
    const { isRecording, media } = this.state;

    this.setState({ isRecording: !isRecording });

    if (isRecording) {
      if (media) {
        media.file.stopRecord();

        this.upload(credentials, media).then((params) => {
          console.log(params);
          // firebaseDb.ref('messages').push(params, (error: Error) => {
          //   if (error) console.error(error);
          //   saveRecordFile(media);
          // });
        }).catch(error => console.log(error));
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
