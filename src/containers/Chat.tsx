import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles, StyleRules, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Bottom from 'components/chat/Bottom';
import Main from 'components/chat/Main';
import * as ChatActions from 'actions/chat';
import { Props, DispatchToProps, StateToProps, Actions, Store } from './Chat.d';
import Browser from '../components/filebrowser/Browser';

class Chat extends React.Component<Props, {}> {

  render() {
    const { actions, messages, classes } = this.props;

    return (
      <Grid
        container
        direction="column"
        justify="flex-end"
        classes={{ container: classes.container }}
      >
        {/* <Browser /> */}
        <Main messages={messages} />
        <Bottom
          addMessage={actions.addMessage}
        />
      </Grid>
    );
  }
}

const styles = (theme: Theme): StyleRules => ({
  container: {
    height: 'calc(100vh - 50px)',
  },
});

const mapStateToProps = (state: Store) => ({
  messages: state.get('chat').messages.toJS(),
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  actions: bindActionCreators<Actions>(ChatActions, dispatch),
});

export default connect<StateToProps, DispatchToProps, void>(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Chat));
