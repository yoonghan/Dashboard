`use strict`

import * as React from 'react';
import produce from "immer";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import SortableTable from '../../../../SortableTable';
import {SelectableTableType} from '../../../../SortableTable';
import PanelTitleBar from "../../../../PanelTitleBar";
import {INVENTORY_MEMORY_TYPE} from '../../../../../const/inventory';
import InventoryDetail from "../InventoryDetail";
import {getInventoryMBeansByMBeanKey, getMBeanAttributeValueByAttributeKey, OR } from "../sharedAlgorithm";

const styles = (theme:Theme) => createStyles({
  root: {
    ...theme.mixins.gutters()
  }
});

interface PhysicalMemoryState {
  detailIdx: number;
}

interface PhysicalMemoryProps extends WithStyles<typeof styles> {
  inventoryData: any;
}

class PhysicalMemory extends React.Component<PhysicalMemoryProps, PhysicalMemoryState> {
  constructor(props:PhysicalMemoryProps) {
    super(props);
    this.state = {
      detailIdx: -1
    }
  }

  _getData = () => {
    const {inventoryData} = this.props;
    const mbeans = getInventoryMBeansByMBeanKey(inventoryData, "PhysicalMemory");

    if(mbeans.length > 0) {
      return mbeans.map((mbean:any, idx: number) => {
        return {
          id: idx,
          name: getMBeanAttributeValueByAttributeKey(mbean, "Name"),
          manufacturer: getMBeanAttributeValueByAttributeKey(mbean, "Manufacturer"),
          totalWidth: getMBeanAttributeValueByAttributeKey(mbean, "TotalWidth"),
          dataWidth: getMBeanAttributeValueByAttributeKey(mbean, "DataWidth"),
          memoryType: INVENTORY_MEMORY_TYPE[getMBeanAttributeValueByAttributeKey(mbean, "MemoryType")]
        }
      });
    }
    else {
      return [];
    }
  }

  displayMemoryInfo = (idx:string) => {
    const idxAsNumber = Number(idx);
    this.setState(
      produce<PhysicalMemoryState>(draft => {
        draft.detailIdx = idxAsNumber;
      })
    );
  }

  render() {
    const {classes} = this.props;

    const data = this._getData();
    const header = [
      { uniqueDataKey: 'name', numeric: false, label: 'Name' },
      { uniqueDataKey: 'manufacturer', numeric: false, label: 'Manufacturer' },
      { uniqueDataKey: 'totalWidth', numeric: true, label: 'Total Width' },
      { uniqueDataKey: 'dataWidth', numeric: true, label: 'Data Width' },
      { uniqueDataKey: 'memoryType', numeric: false, label: 'Memory Type' }
    ]
    const rowsPerPage = 5;

    return (
      <Paper>
        <PanelTitleBar>
          Physical Memory
        </PanelTitleBar>
        <div className={classes.root}>
          <SortableTable
            data={data}
            header={header}
            defaultRowsPerPage={rowsPerPage}
            withPagination={true}
            withSelection={SelectableTableType.NONE}
            callbackForClickableRow={this.displayMemoryInfo}
          />
          {
            this.state.detailIdx !== -1 &&
            <InventoryDetail mbeanKey={"PhysicalMemory"} index={this.state.detailIdx} inventoryData={this.props.inventoryData}/>
          }
        </div>
      </Paper>
    )
  }
}

export default withStyles(styles)(PhysicalMemory);
