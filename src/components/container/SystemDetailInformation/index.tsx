`use strict`

import * as React from 'react';
import produce from "immer";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TitleBar from "../../TitleBar";
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

import EventLog from './EventLog';
import ActiveStatus from "./ActiveStatus";
import AppliedActivity from "./AppliedActivity";
import GeneralInfo from './GeneralInfo';

const styles = (theme:Theme) => createStyles({
  root: {
    padding: "15px"
  }
});

interface SystemDetailInformationProps extends WithStyles<typeof styles> {

}

interface SystemDetailInformationState {
  tabSelectedIndex: number;
}

class SystemDetailInformation extends React.Component<SystemDetailInformationProps, SystemDetailInformationState> {
  constructor(props:SystemDetailInformationProps) {
    super(props);
    this.state = {
      tabSelectedIndex: 0
    }
  }

  handleTabChange = (event:React.ChangeEvent<HTMLElement>, tabIdx:number) => {
    this.setState(
      produce<SystemDetailInformationState>(draft => {
        draft.tabSelectedIndex = tabIdx;
      })
    );
  };

  renderTabByIndex(tabIndex:number) {
    switch(tabIndex) {
      case 0:
        return <GeneralInfo/>
      case 1:
        return <ActiveStatus/>
      case 2:
        return  <AppliedActivity/>
      case 3:
        return <EventLog/>
      default:
        return <div>Others</div>
    }
  }

  render() {
    const {tabSelectedIndex} = this.state;
    const {classes} = this.props;

    return (
      <div>
        <TitleBar title={"Server Information"} canClose={true}/>
        <div className={classes.root}>
          <Typography>
            System name: Name<br/>
            System access: OK<br/>
            System status: OK

            <br/><br/>
            ACTIONS
          </Typography>
          <Tabs value={tabSelectedIndex} onChange={this.handleTabChange}>
            <Tab label="General" />
            <Tab label="Active Status" />
            <Tab label="Applied Activities" />
            <Tab label="Event Log" />
            <Tab label="Inventory" />
            <Tab label="Service And Support" />
          </Tabs>
          {this.renderTabByIndex(tabSelectedIndex)}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SystemDetailInformation);
