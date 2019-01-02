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

interface ProcessorState {
  detailIdx: number;
}

interface ProcessorProps extends WithStyles<typeof styles> {
  inventoryData: any;
}

class Processor extends React.Component<ProcessorProps, ProcessorState> {
  constructor(props:ProcessorProps) {
    super(props);
    this.state = {
      detailIdx: -1
    }
  }

  _getData = () => {
    const {inventoryData} = this.props;
    const mbeans = getInventoryMBeansByMBeanKey(inventoryData, "Processor");

    if(mbeans.length > 0) {
      return mbeans.map((mbean:any, idx: number) => {
        return {
          id: idx,
          description: getMBeanAttributeValueByAttributeKey(mbean, "Description"),
          family: getMBeanAttributeValueByAttributeKey(mbean, "Family"),
          manufacturer: getMBeanAttributeValueByAttributeKey(mbean, "Manufacturer"),
          name: getMBeanAttributeValueByAttributeKey(mbean, "Name"),
          currentClockSpeed: getMBeanAttributeValueByAttributeKey(mbean, "CurrentClockSpeed")
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
      produce<ProcessorState>(draft => {
        draft.detailIdx = idxAsNumber;
      })
    );
  }

  render() {
    const {classes} = this.props;

    const data = this._getData();
    const header = [
      { uniqueDataKey: 'description', numeric: false, label: 'Description' },
      { uniqueDataKey: 'family', numeric: false, label: 'Family' },
      { uniqueDataKey: 'manufacturer', numeric: false, label: 'Manufacturer' },
      { uniqueDataKey: 'name', numeric: false, label: 'Name' },
      { uniqueDataKey: 'currentClockSpeed', numeric: true, label: 'Current Clock Speed' }
    ]
    const rowsPerPage = 5;

    return (
      <Paper>
        <PanelTitleBar>
          Processor
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
            <InventoryDetail mbeanKey={"Processor"} index={this.state.detailIdx} inventoryData={this.props.inventoryData}/>
          }
        </div>
      </Paper>
    )
  }
}

export default withStyles(styles)(Processor);
