`use strict`

import * as React from 'react';
import produce from "immer";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import * as XMLParser from 'fast-xml-parser';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import {INVENTORY_LINUX_SAMPLE, INVENTORY_WINDOWS_SAMPLE} from '../../../../samples/inventory';
import LeftPanel from './LeftPanel';
import {EnumInventoryScreen} from './const';
import InventorySummary from './InventorySummary';
import InventoryCollect from './InventoryCollect';
import HelperPanel from "../../../HelperPanel";
import PrintIcon from '@material-ui/icons/Print';
import CacheMemory from './CacheMemory';
import Processor from './Processor';
import DiskDrive from './DiskDrive';
import DiskPartition from './DiskPartition';
import PhysicalMemory from './PhysicalMemory';
import OperatingSystem from './OperatingSystem';
import InstalledApplication from './InstalledApplication';
import InstalledDriver from './InstalledDriver';
import InstalledFirmware from './InstalledFirmware';

const styles = (theme:Theme) => createStyles({
  root: {

  },
  buttonContainer: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 3,
    display: "flex",
    alignItems: "center",
    "& > button": {
      marginRight: theme.spacing.unit
    }
  },
  instructionContainer: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  }
});

interface InventoryState {
  screenKey: string;
  inventory: Object;
}

interface InventoryProps extends WithStyles<typeof styles> {
}

class Inventory extends React.Component<InventoryProps, InventoryState> {
  constructor(props:InventoryProps) {
    super(props);
    this.state = {
      screenKey: "SUMMARY",
      inventory: this.convertXMLToJson(INVENTORY_WINDOWS_SAMPLE)
    }
  }

  convertXMLToJson = (xmlInString:string) => {
    const options = {
        attributeNamePrefix : "@_",
        attrNodeName: "attr",
        textNodeName : "#text",
        ignoreAttributes : false,
        ignoreNameSpace : false,
        allowBooleanAttributes : false,
        parseNodeValue : true,
        parseAttributeValue : false,
        trimValues: true,
        cdataTagName: "__cdata",
        cdataPositionChar: "\\c",
        localeRange: "",
        parseTrueNumberOnly: false
    };
    return XMLParser.parse(xmlInString, options);
  }

  changeScreen = (key:string) => {
    this.setState(
      produce<InventoryState>(draft => {
        draft.screenKey = key;
      })
    );
  }

  rightPanelDisplay = () => {
    const {inventory} = this.state;

    switch(this.state.screenKey) {
      case EnumInventoryScreen[EnumInventoryScreen.SUMMARY]:
        return <InventorySummary inventoryData={inventory}/>;
      case EnumInventoryScreen[EnumInventoryScreen.HD_CM]:
        return <CacheMemory inventoryData={inventory}/>;
      case EnumInventoryScreen[EnumInventoryScreen.HD_DD]:
        return <DiskDrive inventoryData={inventory}/>;
      case EnumInventoryScreen[EnumInventoryScreen.HD_DP]:
        return <DiskPartition inventoryData={inventory}/>;
      case EnumInventoryScreen[EnumInventoryScreen.HD_P]:
        return <Processor inventoryData={inventory}/>;
      case EnumInventoryScreen[EnumInventoryScreen.PH_PM]:
        return <PhysicalMemory inventoryData={inventory}/>;
      case EnumInventoryScreen[EnumInventoryScreen.RS_OS]:
        return <OperatingSystem inventoryData={inventory}/>;
      case EnumInventoryScreen[EnumInventoryScreen.SS_IA]:
        return <InstalledApplication inventoryData={inventory}/>;
      case EnumInventoryScreen[EnumInventoryScreen.SS_ID]:
        return <InstalledDriver inventoryData={inventory}/>;
      case EnumInventoryScreen[EnumInventoryScreen.SS_IF]:
        return <InstalledFirmware inventoryData={inventory}/>;
      default:
        return <div>404 - NOT AVAILABLE</div>
    }
  }

  render() {
    const {classes} = this.props;

    return (
      <Paper>
        <div className={classes.instructionContainer}>
          <HelperPanel instructionTitle={"Inventory Status:"}>
            <Typography variant="body2">
              Last Collected: December 26, 2018 5:47 AM
            </Typography>
          </HelperPanel>
          <div className={classes.buttonContainer}>
            <Button variant="contained" color="primary" onClick={() => alert("Print")}>
              <PrintIcon fontSize="small" />
            </Button>
            <InventoryCollect/>
          </div>
        </div>
        <Grid container spacing={8}>
          <Grid item xs={2}>
            <LeftPanel callbackInventorySelection={this.changeScreen}/>
          </Grid>
          <Grid item xs={10}>
            {this.rightPanelDisplay()}
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default withStyles(styles)(Inventory);
