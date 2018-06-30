import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles, StyleRules, Theme } from '@material-ui/core/styles';
import { Props, DispatchProps, StateProps } from './Chat.d';
import Bottom from 'components/chat/Bottom';
import Main from 'components/chat/Main';
import { ChatActions } from 'actions/index';

class Chat extends React.Component<Props, {}> {

  render() {
    const { actions } = this.props;

    return (
      <React.Fragment>
        <Main />
        <Bottom
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

const mapStateToProps = (state: StateProps) => ({
});

const mapDispatchToProps = (dispatch: Dispatch<DispatchProps>) => ({
  actions: bindActionCreators(ChatActions, dispatch),
});

export default connect<StateProps, DispatchProps, void>(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Chat));
