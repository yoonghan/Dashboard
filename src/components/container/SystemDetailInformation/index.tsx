`use strict`

import * as React from 'react';
import produce from "immer";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import red from '@material-ui/core/colors/red';

import TitleBar from "../../TitleBar";
import ButtonPopupMenu from "../../ButtonPopupMenu";
import EventLog from './EventLog';
import ActiveStatus from "./ActiveStatus";
import AppliedActivity from "./AppliedActivity";
import GeneralInfo from './GeneralInfo';
import Inventory from './Inventory';
import Statistics from './Statistics';

const styles = (theme:Theme) => createStyles({
  root: {
    padding: "15px"
  },
  statusContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing.unit
  },
  statusOk: {
    backgroundColor: green[600],
    display: "inline-flex",
    borderRadius: theme.spacing.unit
  },
  statusWarning: {
    backgroundColor: amber[600],
    display: "inline-flex",
    borderRadius: theme.spacing.unit
  },
  statusError: {
    backgroundColor: red[600],
    display: "inline-flex",
    borderRadius: theme.spacing.unit
  },
  appBar: {
    marginBottom: theme.spacing.unit
  },
  displayLabel: {
    width: "11rem",
    borderBottom: "none"
  },
  displayValue: {
    borderBottom: "none"
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

  _handleTabChange = (event:React.ChangeEvent<HTMLElement>, tabIdx:number) => {
    this.setState(
      produce<SystemDetailInformationState>(draft => {
        draft.tabSelectedIndex = tabIdx;
      })
    );
  };

  _renderTabByIndex = (tabIndex:number) => {
    switch(tabIndex) {
      case 0:
        return <GeneralInfo/>
      case 1:
        return <ActiveStatus/>
      case 2:
        return  <AppliedActivity/>
      case 3:
        return <EventLog/>
      case 4:
        return <Inventory/>
      default:
        return <Statistics/>
    }
  }

  render() {
    const {tabSelectedIndex} = this.state;
    const {classes} = this.props;

    return (
      <div>
        <TitleBar title={"Server Information"} canClose={true}/>
        <div className={classes.root}>
          <div className={classes.statusContainer}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.displayLabel}>System name:</TableCell>
                  <TableCell className={classes.displayValue}>192.168.169.143 (BOSS)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.displayLabel}>System access:</TableCell>
                  <TableCell className={classes.displayValue}>
                    <SnackbarContent message="Ok" className={classes.statusOk}/>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.displayLabel}>System status:</TableCell>
                  <TableCell className={classes.displayValue}>
                    <SnackbarContent message="With some issues" className={classes.statusWarning}/>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.displayLabel}>Actions:</TableCell>
                  <TableCell className={classes.displayValue}>
                    <ButtonPopupMenu
                      id = "actions"
                      btnLabel = "Actions..."
                      options = {
                        [
                          { label: "Shutdown", handleClick: () => {} },
                          { label: "Restart", handleClick: () => {} },
                          { label: "Suspend", handleClick: () => {} },
                          { label: "Wakeup on Lan", handleClick: () => {} }
                        ]
                      }
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <AppBar position="static" color="default" className={classes.appBar}>
            <Tabs value={tabSelectedIndex} onChange={this._handleTabChange} >
              <Tab label="General" />
              <Tab label="Active Status" />
              <Tab label="Applied Activities" />
              <Tab label="Event Log" />
              <Tab label="Inventory" />
              <Tab label="Statistics" />
            </Tabs>
          </AppBar>
          {this._renderTabByIndex(tabSelectedIndex)}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SystemDetailInformation);
