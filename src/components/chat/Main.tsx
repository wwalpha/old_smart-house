import * as React from 'react';
import { withStyles, Theme, StyleRules } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MessageItem from 'components/chat/MessageItem';
import { Props } from './Main.d';
import { Chat } from '@models';

class Main extends React.Component<Props, {}> {
  render() {
    const { messages = [], classes } = this.props;

    return (
      <Grid
        id="chat_main"
        container
        direction="column"
        classes={{ container: classes.root }}
      >
        {(() => {
          return messages.map((item: Chat.MediaProps, index: number) => (
            <MessageItem media={item} key={index} />
          ));
        })()}
      </Grid>
    );
  }
}

const styles = (theme: Theme): StyleRules => ({
  root: {
    overflowY: 'scroll',
    flexWrap: 'nowrap',
    maxHeight: 'calc(100vh - 40px)',
  },
});

export default withStyles(styles)(Main);
