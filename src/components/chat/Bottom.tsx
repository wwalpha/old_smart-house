import * as React from 'react';
import { withStyles, Theme, StyleRules } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
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

  /** 録音開始 */
  handleTouchStart = (e: any) => {
    if (1 === 1) {
      this.setState({ isRecording: true });
      return;
    }
    const filename = `${getTimeStamp()}.wav`;
    const media = new Media(filename, () => { });

    // start recording
    media.startRecord();

    this.setState({
      media: {
        filename,
        file: media,
      },
      isRecording: true,
    });
  }

  /** 録音終了 */
  handleTouchEnd = (e: any) => {
    if (1 === 1) {
      this.setState({ isRecording: false });
      return;
    }

    const { media } = this.state;

    if (media) {
      media.file.stopRecord();

      this.upload(media)
        .then((value) => {
          this.setState({ isRecording: false });
          console.log(value);
        })
        .catch(console.log);
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
      <Paper classes={{ root: classes.paper }}>
        <Grid container>
          <Button
            variant="contained"
            color="primary"
            classes={{
              root: classes.button,
              contained: classes.mic,
            }}
            onTouchStart={this.handleTouchStart}
            onTouchEnd={this.handleTouchEnd}
            disableRipple
            disableFocusRipple
          >
            <MicIcon />
          </Button>
          <Input
            defaultValue="Hello world"
            classes={{ root: classes.input }}
            style={{ width: isRecording ? '0px' : 'inherit' }}
          />
        </Grid>
      </Paper>
    );
  }
}

const styles = (theme: Theme): StyleRules => ({
  paper: {
    backgroundColor: theme.palette.grey['200'],
  },
  button: {
    transition: 'unset',
    margin: theme.spacing.unit,
    minWidth: '80px',
  },
  mic: {
    color: theme.palette.grey['100'],
    backgroundColor: theme.palette.primary.main,
    height: '40px',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
    '&:active': {
      width: '100%',
      backgroundColor: theme.palette.secondary.main,
    },
  },
  recording: {
    height: '40px',
    color: `${theme.palette.grey['100']} !important`,
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
    '&:active': {
      backgroundColor: theme.palette.secondary.main,
    },
    width: '100%',
  },
  input: {
    margin: theme.spacing.unit,
    flexGrow: 1,
  },
});

export default withStyles(styles)(Bottom);
