`use strict`

import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import TableRow from '../../../TableRow';
import SortableTable from '../../../SortableTable';
import {SelectableTableType} from '../../../SortableTable';
import {INVENTORY_WRITE_POLICY, INVENTORY_LEVEL} from '../../../../const/inventory';
import {getInventoryMBeansByMBeanKey, getAttributesOfMBean, getAttributesIdOfAttribute, getAttributesValueOfAttribute, OR } from "./sharedAlgorithm";

const styles = (theme:Theme) => createStyles({
  root: {
    marginTop: theme.spacing.unit * 2
  }
});

interface InventoryDetailProps extends WithStyles<typeof styles> {
  mbeanKey: string;
  fineSearch?: string;
  inventoryData: any;
  index: number;
}

const InventoryDetail: React.SFC<InventoryDetailProps> = ({classes, inventoryData, mbeanKey, index, fineSearch}) => {
  const mbean = getInventoryMBeansByMBeanKey(inventoryData, mbeanKey, fineSearch)[index];

  function splitCamelCase(text:string) {
    return text.replace(/([a-z])([A-Z])/g, '$1 $2');
  }

  function buildTableValue() {
    return getAttributesOfMBean(mbean).map((attribute:any) => {
      const key = getAttributesIdOfAttribute(attribute);
      return (
        <TableRow key={key}>
          <TableCell>{splitCamelCase(key)}</TableCell>
          <TableCell>{decorateValue(key, getAttributesValueOfAttribute(attribute))}</TableCell>
        </TableRow>
      );
    });
  }

  function decorateValue(key:string, value:string) {
    switch(key) {
      case "Level":
        if(mbeanKey === "CacheMemory") {
          return INVENTORY_LEVEL[value];
        }
      case "WritePolicy":
        if(mbeanKey === "CacheMemory") {
          return INVENTORY_WRITE_POLICY[value];
        }
      default:
        return value;
    }
  }

  return (
    <div className={classes.root}>
      <Typography variant="subtitle1">Detail</Typography>
      <Divider/>
      <Table>
        <TableBody>
          {buildTableValue()}
        </TableBody>
      </Table>
    </div>
  )
}

export default withStyles(styles)(InventoryDetail);
