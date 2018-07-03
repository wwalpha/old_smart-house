import * as React from 'react';
import { withStyles, Theme, StyleRules } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Item from './Item';
import { Props } from './Browser.d';

class Browser extends React.Component<Props, {}> {

  render() {
    return (
      <List component="nav">
        <Item label="Application" path={cordova.file.applicationDirectory} directory />
        <Item label="ApplicationStorage" path={cordova.file.applicationStorageDirectory} directory />
        <Item label="Cache" path={cordova.file.cacheDirectory} directory />
        <Item label="Data" path={cordova.file.dataDirectory} directory />
        <Item label="Document" path={cordova.file.documentsDirectory} directory />
        <Item label="Shared" path={cordova.file.syncedDataDirectory} directory />
        <Item label="Temp" path={cordova.file.tempDirectory} directory />
      </List>
    );
  }
}

const styles = (theme: Theme): StyleRules => ({
});

export default withStyles(styles)(Browser);
