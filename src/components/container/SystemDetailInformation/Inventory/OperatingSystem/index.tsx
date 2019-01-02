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

interface OperatingSystemState {
  detailIdx: number;
}

interface OperatingSystemProps extends WithStyles<typeof styles> {
  inventoryData: any;
}

class OperatingSystem extends React.Component<OperatingSystemProps, OperatingSystemState> {
  constructor(props:OperatingSystemProps) {
    super(props);
    this.state = {
      detailIdx: -1
    }
  }

  _getData = () => {
    const {inventoryData} = this.props;
    const mbeans = getInventoryMBeansByMBeanKey(inventoryData, "OperatingSystem");

    if(mbeans.length > 0) {
      return mbeans.map((mbean:any, idx: number) => {
        return {
          id: idx,
          caption: getMBeanAttributeValueByAttributeKey(mbean, "Caption"),
          registeredUser: getMBeanAttributeValueByAttributeKey(mbean, "RegisteredUser"),
          buildNumber: getMBeanAttributeValueByAttributeKey(mbean, "BuildNumber"),
          codeSet: getMBeanAttributeValueByAttributeKey(mbean, "CodeSet")
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
      produce<OperatingSystemState>(draft => {
        draft.detailIdx = idxAsNumber;
      })
    );
  }

  render() {
    const {classes} = this.props;

    const data = this._getData();
    const header = [
      { uniqueDataKey: 'caption', numeric: false, label: 'Caption' },
      { uniqueDataKey: 'registeredUser', numeric: false, label: 'Registered User' },
      { uniqueDataKey: 'buildNumber', numeric: false, label: 'Build Number' },
      { uniqueDataKey: 'codeSet', numeric: true, label: 'Code Set' }
    ]
    const rowsPerPage = 5;

    return (
      <Paper>
        <PanelTitleBar>
          Operating System
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
            <InventoryDetail mbeanKey={"OperatingSystem"} index={this.state.detailIdx} inventoryData={this.props.inventoryData}/>
          }
        </div>
      </Paper>
    )
  }
}

export default withStyles(styles)(OperatingSystem);
