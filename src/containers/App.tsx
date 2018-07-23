import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { StyleRules, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TopNavigation from 'src/components/TopNavigation';
import Chat from 'src/containers/Chat';
import * as AppActions from 'actions/app';
import { Props, Actions, DispatchToProps } from './App.d';

class App extends React.Component<Props, {}> {
  // tslint:disable-next-line:function-name
  UNSAFE_componentWillMount() {
    this.props.actions.setUserInfo(this.props.userInfo);
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        direction="column"
        classes={{ container: classes.container }}
      >
        <TopNavigation />
        <Chat />
      </Grid>
    );
  }
}

const styles = (): StyleRules => ({
  container: {
    height: '100%',
    minHeight: '100vh',
  },
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  actions: bindActionCreators<Actions>(AppActions, dispatch),
});

export default connect<any, DispatchToProps, void>(
  undefined,
  mapDispatchToProps,
)(hot(module)(withStyles(styles)(App)));
