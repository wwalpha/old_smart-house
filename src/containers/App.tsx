import * as React from 'react';
import { hot } from 'react-hot-loader';
import Chat from 'src/containers/Chat';
import { StyleRules, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Props } from './App.d';

class App extends React.Component<Props, {}> {

  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        direction="column"
        justify="flex-end"
        classes={{ container: classes.container }}
      >
        <Chat />
      </Grid>
    );
  }
}

const styles = (): StyleRules => ({
  container: {
    height: '100vh',
  },
});

export default hot(module)(withStyles(styles)(App));
