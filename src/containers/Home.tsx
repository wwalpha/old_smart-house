import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles, StyleRules, Theme } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import { Props, DispatchToProps, StateToProps, Actions, Store } from './Home.d';

class Home extends React.Component<Props, {}> {

  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        direction="column"
        classes={{ container: classes.container }}
      >
        <Grid item>
          <FormLabel component="span">エアコン：</FormLabel>
          <Switch
            classes={{
              switchBase: classes.iOSSwitchBase,
              bar: classes.iOSBar,
              icon: classes.iOSIcon,
              iconChecked: classes.iOSIconChecked,
              checked: classes.iOSChecked,
            }}
            disableRipple
            // checked={this.state.checkedB}
            // onChange={this.handleChange('checkedB')}
            value="checkedB"
          />
        </Grid>
        <Grid item>
          <FormLabel component="span">リビング照明：</FormLabel>
          <Switch
            classes={{
              switchBase: classes.iOSSwitchBase,
              bar: classes.iOSBar,
              icon: classes.iOSIcon,
              iconChecked: classes.iOSIconChecked,
              checked: classes.iOSChecked,
            }}
            disableRipple
            // checked={this.state.checkedB}
            // onChange={this.handleChange('checkedB')}
            value="checkedB"
          />
        </Grid>
      </Grid>
    );
  }
}

const styles = (theme: Theme): StyleRules => ({
  container: {
    height: 'calc(100vh - 50px)',
  },
  iOSSwitchBase: {
    '&$iOSChecked': {
      color: theme.palette.common.white,
      '& + $iOSBar': {
        backgroundColor: '#52d869',
      },
    },
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.sharp,
    }),
  },
  iOSChecked: {
    transform: 'translateX(15px)',
    '& + $iOSBar': {
      opacity: 1,
      border: 'none',
    },
  },
  iOSBar: {
    borderRadius: 13,
    width: 42,
    height: 26,
    marginTop: -13,
    marginLeft: -21,
    border: 'solid 1px',
    borderColor: theme.palette.grey[400],
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  iOSIcon: {
    width: 24,
    height: 24,
  },
  iOSIconChecked: {
    boxShadow: theme.shadows[1],
  },
});

// const mapStateToProps = (state: Store) => ({
//   messages: state.get('chat').messages.toJS(),
// });

// const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
//   actions: bindActionCreators<Actions>(ChatActions, dispatch),
// });

// export default connect<StateToProps, DispatchToProps, void>(
//   mapStateToProps,
//   mapDispatchToProps,
// )(withStyles(styles)(Home));

export default withStyles(styles)(Home);
