import * as React from 'react';
import { withStyles, Theme, StyleRules } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Item from './Item';
import { Props } from './Browser.d';

class Browser extends React.Component<Props, {}> {
  render() {
    const { classes } = this.props;
    return (
      <List component="nav" classes={{ root: classes.root }}>
        <Item key={1} label="Application" path={cordova.file.applicationDirectory} directory />
        <Item key={2} label="ApplicationStorage" path={cordova.file.applicationStorageDirectory} directory />
        <Item key={3} label="Cache" path={cordova.file.cacheDirectory} directory />
        <Item key={4} label="Data" path={cordova.file.dataDirectory} directory />
        <Item key={5} label="Document" path={cordova.file.documentsDirectory} directory />
        <Item key={6} label="Shared" path={cordova.file.syncedDataDirectory} directory />
        <Item key={7} label="Temp" path={cordova.file.tempDirectory} directory />
      </List>
    );
  }
}

const styles = (theme: Theme): StyleRules => ({
  root: {
    minHeight: '200px',
    maxHeight: '200px',
  },
});

export default withStyles(styles)(Browser);
