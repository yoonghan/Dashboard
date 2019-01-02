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

interface DiskDriveState {
  detailIdx: number;
}

interface DiskDriveProps extends WithStyles<typeof styles> {
  inventoryData: any;
}

class DiskDrive extends React.Component<DiskDriveProps, DiskDriveState> {
  constructor(props:DiskDriveProps) {
    super(props);
    this.state = {
      detailIdx: -1
    }
  }

  _getData = () => {
    const {inventoryData} = this.props;
    const mbeans = getInventoryMBeansByMBeanKey(inventoryData, "DiskDrive");

    if(mbeans.length > 0) {
      return mbeans.map((mbean:any, idx: number) => {
        return {
          id: idx,
          deviceId: getMBeanAttributeValueByAttributeKey(mbean, "DeviceID"),
          size: getMBeanAttributeValueByAttributeKey(mbean, "Size"),
          serialNumber: getMBeanAttributeValueByAttributeKey(mbean, "SerialNumber"),
          interfaceType: getMBeanAttributeValueByAttributeKey(mbean, "InterfaceType")
        }
      });
    }
    else {
      return [];
    }
  }

  displayDiskInfo = (idx:string) => {
    const idxAsNumber = Number(idx);
    this.setState(
      produce<DiskDriveState>(draft => {
        draft.detailIdx = idxAsNumber;
      })
    );
  }

  render() {
    const {classes} = this.props;

    const data = this._getData();
    const header = [
      { uniqueDataKey: 'deviceId', numeric: false, label: 'Id' },
      { uniqueDataKey: 'size', numeric: true, label: 'Size' },
      { uniqueDataKey: 'serialNumber', numeric: false, label: 'Serial Number' },
      { uniqueDataKey: 'interfaceType', numeric: false, label: 'Interface Type' }
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
            callbackForClickableRow={this.displayDiskInfo}
          />
          {
            this.state.detailIdx !== -1 &&
            <InventoryDetail mbeanKey={"DiskDrive"} index={this.state.detailIdx} inventoryData={this.props.inventoryData}/>
          }
        </div>
      </Paper>
    )
  }
}

export default withStyles(styles)(DiskDrive);
