`use strict`

import * as React from 'react';
import produce from "immer";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import SortableTable from '../../../../SortableTable';
import {SelectableTableType} from '../../../../SortableTable';
import PanelTitleBar from "../../../../PanelTitleBar";
import {INVENTORY_WRITE_POLICY, INVENTORY_LEVEL} from '../../../../../const/inventory';
import InventoryDetail from "../InventoryDetail";
import {getInventoryMBeansByMBeanKey, getMBeanAttributeValueByAttributeKey, OR } from "../sharedAlgorithm";

const styles = (theme:Theme) => createStyles({
  root: {
    ...theme.mixins.gutters()
  }
});

interface InstalledFirmwareState {
  detailIdx: number;
  type: string;
}

interface InstalledFirmwareProps extends WithStyles<typeof styles> {
  inventoryData: any;
}

class InstalledFirmware extends React.Component<InstalledFirmwareProps, InstalledFirmwareState> {
  constructor(props:InstalledFirmwareProps) {
    super(props);
    this.state = {
      detailIdx: -1,
      type: ""
    }
  }

  _getData = () => {
    const {inventoryData} = this.props;
    const displayMBean = getInventoryMBeansByMBeanKey(inventoryData, this._getType("D"));
    const scannerMBean = getInventoryMBeansByMBeanKey(inventoryData, this._getType("S"));

    if((displayMBean.length + scannerMBean.length) > 0) {
      const mapDisplay = displayMBean.map((mbean:any, idx: number) => {
        return {
          id: "D" + idx,
          description: getMBeanAttributeValueByAttributeKey(mbean, "Description"),
          identifyingNumber: getMBeanAttributeValueByAttributeKey(mbean, "IdentifyingNumber")
        }
      });
      const mapScanner = scannerMBean.map((mbean:any, idx: number) => {
        return {
          id: "S" + idx,
          description: getMBeanAttributeValueByAttributeKey(mbean, "Description"),
          identifyingNumber: getMBeanAttributeValueByAttributeKey(mbean, "IdentifyingNumber")
        }
      });
      return mapScanner.concat(mapDisplay);
    }
    else {
      return [];
    }
  }

  _getType = (type:string) => {
    switch(type) {
      case "D":
        return "Display";
      case "S":
        return "Scanner";
    }
  }

  _displayInfo = (idx:string) => {
    const idxAsNumber = Number(idx.substring(1));
    const type = idx.charAt(0);

    this.setState(
      produce<InstalledFirmwareState>(draft => {
        draft.detailIdx = idxAsNumber;
        draft.type = this._getType(type);
      })
    );
  }

  render() {
    const {classes} = this.props;

    const data = this._getData();
    const header = [
      { uniqueDataKey: 'description', numeric: false, label: 'Description' },
      { uniqueDataKey: 'identifyingNumber', numeric: false, label: 'Identifying Number' }
    ]
    const rowsPerPage = 5;

    return (
      <Paper>
        <PanelTitleBar>
          Disk Drive
        </PanelTitleBar>
        <div className={classes.root}>
          <SortableTable
            data={data}
            header={header}
            defaultRowsPerPage={rowsPerPage}
            withPagination={true}
            withSelection={SelectableTableType.NONE}
            callbackForClickableRow={this._displayInfo}
          />
          {
            this.state.detailIdx !== -1 &&
            <InventoryDetail mbeanKey={this.state.type} index={this.state.detailIdx} inventoryData={this.props.inventoryData}/>
          }
        </div>
      </Paper>
    )
  }
}

export default withStyles(styles)(InstalledFirmware);
