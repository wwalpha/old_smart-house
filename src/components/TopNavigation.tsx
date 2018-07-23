import * as React from 'react';
import { withStyles, StyleRules, Theme } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import MessageIcon from '@material-ui/icons/Message';
import MBottomNavigation from '@material-ui/core/BottomNavigation';
import MBottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Props } from './TopNavigation.d';

class TopNavigation extends React.Component<Props, any> {
  state = {
    value: 0,
  };
  // handleChange = (event: any, value: string) => this.props.onChange && this.props.onChange(value);

  handleChange = (e: any, value: number) => this.setState({ value });

  render() {
    const { classes } = this.props;

    return (
      <MBottomNavigation
        value={this.state.value}
        onChange={this.handleChange}
        className={classes.root}
      >
        <MBottomNavigationAction
          classes={{
            root: classes.button,
          }}
          icon={<HomeIcon classes={{ root: classes.icon }} />}
          disableRipple
          disableTouchRipple
        />
        <MBottomNavigationAction
          classes={{
            root: classes.button,
          }}
          icon={<MessageIcon classes={{ root: classes.icon }} />}
          disableRipple
          disableTouchRipple
        />
      </MBottomNavigation>
    );
  }
}

const styles = (theme: Theme): StyleRules => ({
  root: {
    height: '50px',
    width: '100%',
    backgroundColor: theme.palette.grey['200'],
  },
  button: {
    maxWidth: '50%',
    paddingTop: '8px !important',
  },
  icon: {
    fontSize: '36px',
  },
});

export default withStyles(styles)(TopNavigation);
