import * as React from 'react';
import { withStyles, Theme, StyleRules } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MicIcon from '@material-ui/icons/Mic';
import { Storage } from 'aws-amplify';
import { Config } from 'utils/aws';
import { firebaseDb } from 'utils/firebase';
import { readFile } from 'utils/fileSystem';
import { getTimeStamp } from 'utils/system';
import * as AWS from 'aws-sdk';
import { Chat } from 'models';
import { Props, State } from './Bottom.d';

const getSignedUrl = (config: any, filename: string): Promise<string> => new Promise((resolve, reject) => {
  // AWS.config.update({
  //   region: Config.Region,
  //   accessKeyId: Config.AccessKeyId,
  //   secretAccessKey: Config.SecretAccessKey,
  // });
  AWS.config.update(config);

  const s3 = new AWS.S3();
  const awsParams = { Bucket: Config.Bucket, Key: `public/${filename}` };
  s3.getSignedUrl('getObject', awsParams, (err: Error, url: string) => {
    console.log(url);
    err ? reject(err) : resolve(url);
  });
});

class Bottom extends React.Component<Props, {}> {
  state: State = {
    media: undefined,
    value: undefined,
    isRecording: false,
  };

  handleChange = (event: React.ChangeEvent<{}>, value: any) => this.setState({ value });

  upload = async (media: Chat.MediaProps) => {
    const fullpath = `${cordova.file.tempDirectory}${media.filename}`;

    console.log('fullpath', fullpath);
    const file: any = await readFile(fullpath);
    console.log('file', file);

    const ret: Object = await Storage.put(media.filename, file, {
      contentType: 'audio/wav',
    });

    const params = {
      timestamp: getTimeStamp(),
      wav: await getSignedUrl({
        region: Config.Region,
        // accessKeyId: Config.AccessKeyId,
        // secretAccessKey: Config.SecretAccessKey,
        // tslint:disable-next-line:align
      }, media.filename),
    };
    console.log('awsPath', params);

    return params;
  }

  handleRecord = () => {
    const { saveRecordFile } = this.props;
    const { isRecording, media } = this.state;

    this.setState({ isRecording: !isRecording });

    if (isRecording) {
      if (media) {
        media.file.stopRecord();

        this.upload(media).then((params) => {
          console.log(params);
          firebaseDb.ref('messages').push(params, (error: Error) => {
            if (error) console.error(error);
            saveRecordFile(media);
          });
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
