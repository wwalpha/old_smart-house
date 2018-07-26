import * as React from 'react';
import { withStyles, Theme, StyleRules } from '@material-ui/core/styles';
import MicIcon from '@material-ui/icons/Mic';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import { sendText, sendMedia } from 'utils/AppSync';
import { Props, State } from './MessageItem.d';
import { Chat } from '@models';

class MessageItem extends React.PureComponent<Props, any> {
  state: State = {
    isSended: false,
    isPlaying: false,
  };

  /** 初期化 */
  sendMessage = () => {
    // テキスト送信
    if (this.props.item.type === 'Text') {
      sendText(this.props.item.message as string)
        .then(() => this.setState({ isSended: true }))
        .catch(console.error);
    }
    // Media送信
    if (this.props.item.type === 'Media') {
      sendMedia((this.props.item.message as Chat.MediaProps).filename)
        .then(() => this.setState({ isSended: true }))
        .catch(console.error);
    }
  }

  handlePlay = () => {
    console.log('play start');

    this.setState({ playing: true });

    // Mediaファイルの場合、再生する
    if (this.props.item.type === 'Media') {
      (this.props.item.message as Chat.MediaProps).file.play();

      this.setState({ playing: false });
    }

    console.log('disabled');
  }

  render() {
    const { classes } = this.props;

    if (!this.state.isSended) {
      this.sendMessage();

      return (
        <div className={classes.root}>
          <span>送信中...</span>
        </div>
      );
    }

    return (
      <div className={classes.root}>
        <Button
          variant="contained"
          classes={{ root: classes.button, contained: classes.contained }}
          disabled={this.state.isPlaying}
          disableRipple
          disableFocusRipple
          onClick={this.handlePlay}
        >
          <MicIcon />
        </Button>
      </div>
    );
  }
}

const styles = (theme: Theme): StyleRules => {
  console.log(theme);
  return {
    root: {
      textAlign: 'right',
      margin: theme.spacing.unit,
    },
    button: {
      maxWidth: '200px',
      minWidth: '150px',
      color: theme.palette.common.white,
      backgroundColor: green['200'],
    },
    contained: {
      '&:hover': {
        backgroundColor: green['200'],
      },
    },
  };
};

export default withStyles(styles)(MessageItem);
