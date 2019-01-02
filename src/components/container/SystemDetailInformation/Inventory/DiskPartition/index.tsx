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

interface DiskPartitionState {
  detailIdx: number;
}

interface DiskPartitionProps extends WithStyles<typeof styles> {
  inventoryData: any;
}

class DiskPartition extends React.Component<DiskPartitionProps, DiskPartitionState> {
  constructor(props:DiskPartitionProps) {
    super(props);
    this.state = {
      detailIdx: -1
    }
  }

  _getData = () => {
    const {inventoryData} = this.props;
    const mbeans = getInventoryMBeansByMBeanKey(inventoryData, "DiskPartition");

    if(mbeans.length > 0) {
      return mbeans.map((mbean:any, idx: number) => {
        return {
          id: idx,
          deviceId: getMBeanAttributeValueByAttributeKey(mbean, "DeviceID"),
          description: getMBeanAttributeValueByAttributeKey(mbean, "Description"),
          name: getMBeanAttributeValueByAttributeKey(mbean, "Name"),
          size: getMBeanAttributeValueByAttributeKey(mbean, "Size")
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
      produce<DiskPartitionState>(draft => {
        draft.detailIdx = idxAsNumber;
      })
    );
  }

  render() {
    const {classes} = this.props;

    const data = this._getData();
    const header = [
      { uniqueDataKey: 'deviceId', numeric: false, label: 'Device ID' },
      { uniqueDataKey: 'description', numeric: false, label: 'Description' },
      { uniqueDataKey: 'name', numeric: false, label: 'Name' },
      { uniqueDataKey: 'size', numeric: true, label: 'Size' }
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
            <InventoryDetail mbeanKey={"DiskPartition"} index={this.state.detailIdx} inventoryData={this.props.inventoryData}/>
          }
        </div>
      </Paper>
    )
  }
}

export default withStyles(styles)(DiskPartition);
