import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles, StyleRules, Theme } from '@material-ui/core/styles';
import Bottom from 'components/chat/Bottom';
import Main from 'components/chat/Main';
import * as ChatActions from 'actions/chat';
import { Props, DispatchToProps, StateToProps, Actions, Store } from './Chat.d';
import Browser from '../components/filebrowser/Browser';

class Chat extends React.Component<Props, {}> {

  render() {
    const { actions, media, credentials } = this.props;

    return (
      <React.Fragment>
        {/* <Browser /> */}
        <Main media={media} />
        <Bottom
          credentials={credentials}
          saveRecordFile={actions.saveRecordFile}
        />
      </React.Fragment>
    );
  }
}

const styles = (theme: Theme): StyleRules => ({
  button: {
    margin: '0px 8px',
    backgroundColor: theme.palette.primary.main,
  },
  clicked: {
    margin: '0px 8px',
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
});

const mapStateToProps = (state: Store) => ({
  media: state.get('chat').media.toJS(),
  credentials: state.get('app').userInfo.credentials,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  actions: bindActionCreators<Actions>(ChatActions, dispatch),
});

export default connect<StateToProps, DispatchToProps, void>(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Chat));
