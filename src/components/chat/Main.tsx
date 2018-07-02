import * as React from 'react';
import { withStyles, Theme, StyleRules } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AudioPlay from 'components/chat/AudioPlay';
import { Props } from './Main.d';

class Main extends React.Component<Props, {}> {

  render() {
    const { media = [] } = this.props;

    return (
      <Grid container direction="column" >
        {(() => {
          return media.map((item, index) => (
            <AudioPlay media={item} key={index} />
          ));
        })()}
      </Grid>
    );
  }
}

const styles = (theme: Theme): StyleRules => ({
});

export default withStyles(styles)(Main);
