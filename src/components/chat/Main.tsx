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
          return messages.map((item: Chat.Message, index: number) => (
            <MessageItem item={item} key={index} />
          ));
        })()}
      </Grid>
    );
  }
}

const styles = (theme: Theme): StyleRules => ({
  root: {
    overflowY: 'hidden',
    flexWrap: 'nowrap',
    maxHeight: 'calc(100vh - 40px)',
  },
});

export default withStyles(styles)(Main);
