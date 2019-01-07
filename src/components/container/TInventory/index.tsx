`use strict`

import * as React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import PanelTitleBar from "../../PanelTitleBar";
import {EnumTitleType} from "../../PanelTitleBar";
import TitleBar from "../../TitleBar";

const styles = (theme:Theme) => createStyles({
  root: {
    ...theme.mixins.gutters()
  },
  expansionPanelSummary: {
    padding: 0
  },
  expansionPanelSummaryTitle: {
    margin: "0 !important"
  }
});

interface TInventoryProps extends WithStyles<typeof styles> {
}

interface TInventoryState {
}

class TInventory extends React.PureComponent<TInventoryProps, TInventoryState> {
  constructor(props:TInventoryProps) {
    super(props);
  }

  render() {
    const {classes} = this.props;

    return (
      <React.Fragment>
        <TitleBar title="Inventory" canClose={false}/>
        <div className={classes.root}>
          <ExpansionPanel expanded >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} className={classes.expansionPanelSummary} classes={{
              content: classes.expansionPanelSummaryTitle
            }}>
              <PanelTitleBar titleType={EnumTitleType.EXPANSION}>Operating System</PanelTitleBar>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>List all available OS on all machines</div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} className={classes.expansionPanelSummary} classes={{
              content: classes.expansionPanelSummaryTitle
            }}>
              <PanelTitleBar titleType={EnumTitleType.EXPANSION}>Devices</PanelTitleBar>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>List all available Devices on all machines</div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} className={classes.expansionPanelSummary} classes={{
              content: classes.expansionPanelSummaryTitle
            }}>
              <PanelTitleBar titleType={EnumTitleType.EXPANSION}>Software</PanelTitleBar>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>List all available Software on all machines</div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} className={classes.expansionPanelSummary} classes={{
              content: classes.expansionPanelSummaryTitle
            }}>
              <PanelTitleBar titleType={EnumTitleType.EXPANSION}>Drivers</PanelTitleBar>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>List all available Drivers on all machines</div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(TInventory);
