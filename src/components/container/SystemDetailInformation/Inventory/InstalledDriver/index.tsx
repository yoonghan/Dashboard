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

interface InstalledDriverState {
  detailIdx: number;
}

interface InstalledDriverProps extends WithStyles<typeof styles> {
  inventoryData: any;
}

class InstalledDriver extends React.Component<InstalledDriverProps, InstalledDriverState> {
  constructor(props:InstalledDriverProps) {
    super(props);
    this.state = {
      detailIdx: -1
    }
  }

  _getData = () => {
    const {inventoryData} = this.props;
    const mbeans = getInventoryMBeansByMBeanKey(inventoryData, "Product", "Driver");

    if(mbeans.length > 0) {
      return mbeans.map((mbean:any, idx: number) => {
        return {
          id: idx,
          description: getMBeanAttributeValueByAttributeKey(mbean, "Description"),
          identifyingNumber: getMBeanAttributeValueByAttributeKey(mbean, "IdentifyingNumber")
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
      produce<InstalledDriverState>(draft => {
        draft.detailIdx = idxAsNumber;
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
          Installed Driver
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
            <InventoryDetail mbeanKey={"Product"} fineSearch={"Driver"} index={this.state.detailIdx} inventoryData={this.props.inventoryData}/>
          }
        </div>
      </Paper>
    )
  }
}

export default withStyles(styles)(InstalledDriver);
