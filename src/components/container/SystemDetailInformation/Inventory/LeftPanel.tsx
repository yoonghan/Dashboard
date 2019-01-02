`use strict`

import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import TreeStructure from '../../../TreeStructure';
import PanelTitleBar from "../../../PanelTitleBar";
import {EnumInventoryScreen} from './const';

const styles = (theme:Theme) => createStyles({
  root: {
    padding: theme.spacing.unit * 2
  }
});

interface LeftPanelProps extends WithStyles<typeof styles> {
  callbackInventorySelection: (key:string) => void;
}

const LeftPanel: React.SFC<LeftPanelProps> = ({classes, callbackInventorySelection}) => {
  const inventoryTree = {
    module: "Collected Item",
    children: [
      {
        module: "Summary",
        leaf: true,
        key: EnumInventoryScreen[EnumInventoryScreen.SUMMARY]
      },
      {
        module: 'Hardware Devices',
        children: [
          {
            module: 'Cache Memory',
            leaf: true,
            key: EnumInventoryScreen[EnumInventoryScreen.HD_CM]
          },
          {
            module: 'Disk Drive',
            leaf: true,
            key: EnumInventoryScreen[EnumInventoryScreen.HD_DD]
          },
          {
            module: 'Disk Partition',
            leaf: true,
            key: EnumInventoryScreen[EnumInventoryScreen.HD_DP]
          },
          {
            module: 'Memory',
            leaf: true,
            key: EnumInventoryScreen[EnumInventoryScreen.HD_M]
          },
          {
            module: 'Processor',
            leaf: true,
            key: EnumInventoryScreen[EnumInventoryScreen.HD_P]
          }
        ]
      },
      {
        module: 'Network Configuration',
        children: [
          {
            module: 'DNS Interface',
            leaf: true,
            key: EnumInventoryScreen[EnumInventoryScreen.NC_DNS]
          },
          {
            module: 'IP Interface',
            leaf: true,
            key: EnumInventoryScreen[EnumInventoryScreen.NC_IP]
          },
          {
            module: 'LAN Connection',
            leaf: true,
            key: EnumInventoryScreen[EnumInventoryScreen.NC_LC]
          }
        ]
      },
      {
        module: 'Physical Hardware',
        children: [
          {
            module: 'Physical Memory',
            leaf: true,
            key: EnumInventoryScreen[EnumInventoryScreen.PH_PM]
          }
        ]
      },
      {
        module: 'Related System',
        children: [
          {
            module: 'Generic System',
            leaf: true,
            key: EnumInventoryScreen[EnumInventoryScreen.RS_GS]
          },
          {
            module: 'Operating System',
            leaf: true,
            key: EnumInventoryScreen[EnumInventoryScreen.RS_OS]
          }
        ]
      },
      {
        module: 'System Software',
        children: [
          {
            module: 'Installed Application',
            leaf: true,
            key: EnumInventoryScreen[EnumInventoryScreen.SS_IA]
          },
          {
            module: 'Installed Driver',
            leaf: true,
            key: EnumInventoryScreen[EnumInventoryScreen.SS_ID]
          },
          {
            module: 'Installed Firmware',
            leaf: true,
            key: EnumInventoryScreen[EnumInventoryScreen.SS_IF]
          }
        ]
      }
    ]
  };

  return (
    <Paper>
      <div className={classes.root}>
        <TreeStructure
          activeNode={inventoryTree.children[0]}
          treeObject={inventoryTree}
          isNodeCollapsed={false}
          callbackOnNodeClick={
              (key:string)=>{
                callbackInventorySelection(key);
              }
          }
          />
      </div>
    </Paper>
  )
}

export default withStyles(styles)(LeftPanel);
