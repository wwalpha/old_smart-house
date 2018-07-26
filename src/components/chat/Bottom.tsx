import * as React from 'react';
import { withStyles, Theme, StyleRules } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MicIcon from '@material-ui/icons/Mic';
import { getTimeStamp } from 'utils/system';
import { Props, State } from './Bottom.d';

class Bottom extends React.Component<Props, {}> {
  state: State = {
    media: undefined,
    chat: '',
    isRecording: false,
  };

  /** 入力変更 */
  handleChange = (e: any) => this.setState({ chat: e.target.value });

  /** 録音開始 */
  handleTouchStart = (e: any) => {
    // if (1 === 1) {
    //   this.setState({ isRecording: true });
    //   return;
    // }
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
    // if (1 === 1) {
    //   this.setState({ isRecording: false });
    //   return;
    // }

    const { media } = this.state;

    if (media) {
      media.file.stopRecord();

      this.setState({ isRecording: false });

      // メッセージ送信
      this.props.addMessage('Media', media);
    }
  }

  /** フォームサブミット */
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (this.state.chat) {
      this.props.addMessage('Text', this.state.chat);
    }

    // 入力値をクリアする
    this.setState({ chat: '' });
  }

  render() {
    const { classes } = this.props;
    const { isRecording } = this.state;

    return (
      <Paper classes={{ root: classes.paper }}>
        <form onSubmit={this.handleSubmit}>
          <Grid container wrap="nowrap">
            <Button
              variant="contained"
              color="primary"
              classes={{
                root: classes.button,
                contained: isRecording ? classes.recording : classes.recorded,
              }}
              onTouchStart={this.handleTouchStart}
              onTouchEnd={this.handleTouchEnd}
              disableRipple
              disableFocusRipple
            >
              <MicIcon />
            </Button>
            <Input
              value={this.state.chat}
              classes={{ root: classes.input }}
              style={{ display: isRecording ? 'none' : 'inherit' }}
              onChange={this.handleChange}
            />
          </Grid>
        </form>
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
  recording: {
    color: theme.palette.grey['100'],
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
    height: '40px',
    width: '100%',
  },
  recorded: {
    color: theme.palette.grey['100'],
    backgroundColor: theme.palette.primary.main,
    height: '40px',
  },
  input: {
    margin: theme.spacing.unit,
    flexGrow: 1,
  },
});

export default withStyles(styles)(Bottom);
