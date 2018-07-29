import * as React from 'react';
import { withStyles, Theme, StyleRules } from '@material-ui/core/styles';
import MicIcon from '@material-ui/icons/Mic';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/lightGreen';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { sendText, sendMedia } from 'utils/AppSync';
import { Props, State } from './MessageItem.d';
import { Chat } from '@models';

class MessageItem extends React.Component<Props, State> {
  state: State = {
    isSended: false,
    isPlaying: false,
  };

  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any) {
    if (this.state.isSended !== nextState.isSended) return true;
    if (this.state.isPlaying !== nextState.isPlaying) return true;
    return false;
  }

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

    this.setState({ isPlaying: true });

    // Mediaファイルの場合、再生する
    if (this.props.item.type === 'Media') {
      (this.props.item.message as Chat.MediaProps).file.play();

      this.setState({ isPlaying: false });
    }

    console.log('disabled');
  }

  render() {
    const { classes, item } = this.props;
    const { isSended } = this.state;

    const message = () => {
      if (item.type === 'Text') {
        return <Typography variant="title" classes={{ root: classes.text }}>{item.message}</Typography>;
      }

      return <Button />;
    };

    if (!isSended) {
      this.sendMessage();
    }

    return (
      <Grid
        container
        classes={{
          container: classes.root,
        }}
      >
        {!isSended && <CircularProgress size={16} classes={{ root: classes.loading }} />}
        {message()}
      </Grid>
    );
  }
}

const styles = (theme: Theme): StyleRules => {
  console.log(theme);
  const unit = theme.spacing.unit;
  return {
    root: {
      justifyContent: 'flex-end',
      padding: `${unit}px ${unit * 2}px`,
      alignItems: 'center',
    },
    loading: {
      color: green['500'],
      marginRight: theme.spacing.unit * 2,
    },
    text: {
      backgroundColor: green.A400,
      padding: `${unit / 2}px ${unit * 2}px`,
      borderRadius: unit,
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
