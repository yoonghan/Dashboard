`use strict`

import * as React from 'react';
import produce from "immer";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

interface SystemDetailInformationProps {

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


  render() {
    const {tabSelectedIndex} = this.state;

    return (
      <div>
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
        {tabSelectedIndex === 0 && <div>Item One</div>}
        {tabSelectedIndex === 1 && <div>Item Two</div>}
        {tabSelectedIndex === 2 && <div>Item Three</div>}
        {tabSelectedIndex === 3 && <div>Item Four</div>}
        {tabSelectedIndex === 4 && <div>Item Five</div>}
        {tabSelectedIndex === 5 && <div>Item Six</div>}
      </div>
    );
  }
}

export default SystemDetailInformation;
