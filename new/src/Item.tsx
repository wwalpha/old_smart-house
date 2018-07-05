import * as React from 'react';
import { withStyles, Theme, StyleRules, WithStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Add, Remove, Folder, Star } from '@material-ui/icons';
import Collapse from '@material-ui/core/Collapse';
import ItemChild from './Item';
import * as FileUtils from './FileUtils';

interface Props extends WithStyles<StyleRules> {
  path: string,
  directory?: boolean,
  label: string,
  deep: number,
}

class Item extends React.Component<Props, {}> {
  state = {
    opened: false,
    childList: [],
  };

  handleClick = async () => {
    const { path } = this.props;
    const { opened } = this.state;

    const dirList = await FileUtils.dirList(path);

    this.setState({
      opened: !opened,
      childList: dirList,
    });
  }

  render() {
    const { directory = false, label, deep, theme } = this.props;
    const { opened, childList } = this.state;

    const children: any = childList.map((child: Entry, index: number) => (
      <ItemChild
        key={index}
        deep={deep + 1}
        path={child.nativeURL}
        directory={child.isDirectory}
        label={child.name}
      />
    ));

    const unit = theme ? theme.spacing.unit : 4;

    return (
      <React.Fragment>
        <ListItem button onClick={this.handleClick} style={{ marginLeft: `${deep * unit}px` }}>
          {(() => {
            if (!directory) return null;

            const icon = opened ? <Add /> : <Remove />;
            return (
              <ListItemIcon>
                {icon}
              </ListItemIcon>
            );
          })()}
          <ListItemIcon>
            {directory ? <Folder /> : <Star />}
          </ListItemIcon>
          <ListItemText inset primary={label} />
        </ListItem>
        {directory && (
          <Collapse in={opened} timeout="auto" unmountOnExit>
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
