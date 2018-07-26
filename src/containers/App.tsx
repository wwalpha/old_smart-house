import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { StyleRules, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HomeIcon from '@material-ui/icons/Home';
import MessageIcon from '@material-ui/icons/Message';
import Home from 'src/containers/Home';
import Chat from 'src/containers/Chat';
import * as AppActions from 'actions/app';
import { Props, Actions, DispatchToProps } from './App.d';

class App extends React.Component<Props, {}> {
  state = {
    tabValue: 0,
  };
  // tslint:disable-next-line:function-name
  UNSAFE_componentWillMount() {
    this.props.actions.setUserInfo(this.props.userInfo);
  }

  handleTabChange = (e: any, value: any) => this.setState({ tabValue: value });

  render() {
    const { classes } = this.props;
    const { tabValue } = this.state;

    console.log(tabValue === 1);
    return (
      <Grid
        container
        direction="column"
        classes={{ container: classes.container }}
      >
        <AppBar position="static">
          <Tabs value={tabValue} onChange={this.handleTabChange}>
            <Tab icon={<HomeIcon />} />
            <Tab icon={<MessageIcon />} />
          </Tabs>
        </AppBar>
        {tabValue === 0 && <Home />}
        {tabValue === 1 && <Chat />}
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
