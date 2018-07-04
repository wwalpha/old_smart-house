import * as React from 'react';
import { withStyles, Theme, StyleRules } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ExpandMore, ExpandLess, StarBorder, Folder, Star } from '@material-ui/icons';
import Collapse from '@material-ui/core/Collapse';
import { Props } from './Item.d';
import ItemChild from './Item';
import * as FileUtils from './FileUtils';

class Item extends React.Component<Props, {}> {
  state = {
    open: false,
    childList: [],
  };

  handleClick = async () => {
    const { path } = this.props;
    const { open, childList } = this.state;

    const dirList = await FileUtils.dirList(path);

    console.log('dirList', dirList);
    this.setState({
      open: !open,
      childList: dirList,
    });
  }

  render() {
    const { directory = false, label } = this.props;
    const { open, childList } = this.state;

    const children: any = childList.map((child: Entry) => (
      <ItemChild path={child.nativeURL} directory={child.isDirectory} label={child.name} />
    ));

    return (
      <React.Fragment>
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon>
            {directory ? <Folder /> : <Star />}
          </ListItemIcon>
          <ListItemText inset primary={label} />
          {(() => {
            if (!directory) return null;

            return open ? <ExpandLess /> : <ExpandMore />;
          })()}
        </ListItem>
        {directory && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {children}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  }
}

const styles = (theme: Theme): StyleRules => ({
});

export default withStyles(styles)(Item);
