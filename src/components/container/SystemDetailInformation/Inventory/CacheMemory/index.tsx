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

interface CacheMemoryState {
  detailIdx: number;
}

interface CacheMemoryProps extends WithStyles<typeof styles> {
  inventoryData: any;
}

class CacheMemory extends React.Component<CacheMemoryProps, CacheMemoryState> {
  constructor(props:CacheMemoryProps) {
    super(props);
    this.state = {
      detailIdx: -1
    }
  }

  _getData = () => {
    const {inventoryData} = this.props;
    const mbeans = getInventoryMBeansByMBeanKey(inventoryData, "CacheMemory");

    if(mbeans.length > 0) {
      return mbeans.map((mbean:any, idx: number) => {
        return {
          id: idx,
          name: "Cache Memory",
          sysName: inventoryData.system.attr["@_name"],
          capacity: getMBeanAttributeValueByAttributeKey(mbean, "InstalledSize"),
          health: OR(getMBeanAttributeValueByAttributeKey(mbean, "Status"), "OK"),
          block: getMBeanAttributeValueByAttributeKey(mbean, "BlockSize"),
          volatile: getMBeanAttributeValueByAttributeKey(mbean, "Volatile"),
          level: INVENTORY_LEVEL[getMBeanAttributeValueByAttributeKey(mbean, "Level")],
          writePolicy: INVENTORY_WRITE_POLICY[getMBeanAttributeValueByAttributeKey(mbean, "WritePolicy")]
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
      produce<CacheMemoryState>(draft => {
        draft.detailIdx = idxAsNumber;
      })
    );
  }

  render() {
    const {classes} = this.props;

    const data = this._getData();
    const header = [
      { uniqueDataKey: 'name', numeric: false, label: 'Name' },
      { uniqueDataKey: 'sysName', numeric: false, label: 'System Name' },
      { uniqueDataKey: 'capacity', numeric: true, label: 'Capacity' },
      { uniqueDataKey: 'health', numeric: false, label: 'Health State' },
      { uniqueDataKey: 'block', numeric: false, label: 'Block Size' },
      { uniqueDataKey: 'volatile', numeric: false, label: 'Volatile' },
      { uniqueDataKey: 'level', numeric: false, label: 'Level' },
      { uniqueDataKey: 'writePolicy', numeric: false, label: 'Write Policy' }
    ]
    const rowsPerPage = 5;

    return (
      <Paper>
        <PanelTitleBar>
          Cache Memory
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
            <InventoryDetail mbeanKey={"CacheMemory"} index={this.state.detailIdx} inventoryData={this.props.inventoryData}/>
          }
        </div>
      </Paper>
    )
  }
}

export default withStyles(styles)(CacheMemory);
