import * as React from 'react';
import { withStyles, Theme, StyleRules } from '@material-ui/core/styles';
import { Props } from './Bottom.d';

class Main extends React.Component<Props, {}> {

  render() {

    return (
      <div style={{ height: '100vh' }}>

      </div>
    );
  }
}

const styles = (theme: Theme): StyleRules => ({
});

export default withStyles(styles)(Main);
