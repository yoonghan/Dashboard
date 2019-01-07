`use strict`

import * as React from 'react';
import produce from "immer";
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import TitleBar from "../../TitleBar";
import DashboardSetting from "./DashboardSetting";
import NotificationSetting from "./NotificationSetting";

const styles = (theme:Theme) => createStyles({
  root: {
    width: "100%",
    margin: 0
  },
  appBar: {
    marginBottom: theme.spacing.unit
  },
  decoContainer: {
    ...theme.mixins.gutters(),
    width: "100%"
  }
});

interface TSettingProps extends WithStyles<typeof styles> {}

interface TSettingState {
  tabSelectedIndex: number;
}

class TSetting extends React.Component<TSettingProps, TSettingState> {
  constructor(props:TSettingProps) {
    super(props);
    this.state = {
      tabSelectedIndex: 0
    }
  }

  _handleTabChange = (event:React.ChangeEvent<HTMLElement>, tabIdx:number) => {
    this.setState(
      produce<TSettingState>(draft => {
        draft.tabSelectedIndex = tabIdx;
      })
    );
  };

  _renderTabByIndex = (tabIndex:number) => {
    switch(tabIndex) {
      case 1:
        return <NotificationSetting/>
      default:
        return <DashboardSetting/>
    }
  }

  render() {
    const {classes} = this.props;
    const {tabSelectedIndex} = this.state;

    return (
      <Grid container spacing={24} className={classes.root}>
        <TitleBar title="Settings" canClose={true}/>
          <AppBar position="static" color="default" className={classes.appBar}>
            <Tabs value={tabSelectedIndex} onChange={this._handleTabChange} >
              <Tab label="Dashboard" />
              <Tab label="Notification" />
            </Tabs>
          </AppBar>
          {this._renderTabByIndex(tabSelectedIndex)}

      </Grid>
    );
  }
}

export default withStyles(styles)(TSetting);
