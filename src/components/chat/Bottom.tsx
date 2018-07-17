import * as React from 'react';
import { withStyles, Theme, StyleRules } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MicIcon from '@material-ui/icons/Mic';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { readFile } from 'utils/fileSystem';
import { getTimeStamp } from 'utils/system';
import { Chat, App } from 'models';
import { Props, State } from './Bottom.d';
import { Config } from 'utils/aws';

class Bottom extends React.Component<Props, {}> {
  state: State = {
    media: undefined,
    value: undefined,
    isRecording: false,
  };

  handleChange = (event: React.ChangeEvent<{}>, value: any) => this.setState({ value });

  upload = async (media: Chat.MediaProps) => {
    const fullpath = `${cordova.file.tempDirectory}${media.filename}`;

    const file: any = await readFile(fullpath);

    const ret = await Storage.put(media.filename, file, { contentType: 'audio/wav' });

    console.log('ret', ret);

    const addMessage = `mutation AddMessage($bucket: String!, $key: String!, $region: String!, $mimeType: String!) {
      addMessage(bucket: $bucket, key: $key, region: $region, mimeType: $mimeType) {
        signedURL
      }
    }`;

    // Mutation
    const values = {
      bucket: Config.aws_user_files_s3_bucket,
      key: `public/${media.filename}`,
      region: Config.aws_project_region,
      mimeType: 'audio/wav',
    };

    return await (API.graphql(graphqlOperation(addMessage, values)) as Promise<any>);
  }

  handleRecord = () => {
    const { saveRecordFile, credentials } = this.props;
    const { isRecording, media } = this.state;

    this.setState({ isRecording: !isRecording });

    if (isRecording) {
      if (media) {
        media.file.stopRecord();

        this.upload(media)
          .then(console.log)
          .catch(console.log);
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
