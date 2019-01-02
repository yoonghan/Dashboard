`use strict`

import * as React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '../TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import {HeaderModal} from './modal';
import {SortDirection} from '@material-ui/core/TableCell';
import {EnumSelectType} from './shared';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

const styles = (theme:Theme) => createStyles({
  root: {
  },
  chkStyle: {
    paddingBottom: 0
  }
});

export interface SortedTableHeaderProps extends WithStyles<typeof styles> {
  rows: Array<HeaderModal>;
  onRequestSort: (event:React.FormEvent<HTMLElement>, headerId:string) => void;
  order: SortDirection;
  orderBy: string;
  selectType: EnumSelectType;
  onSelectAllClick: (event:React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  numSelected: number;
}

const SortedTableHeader: React.SFC<SortedTableHeaderProps> =
      ({rows, onRequestSort, selectType, numSelected, rowCount, onSelectAllClick, order, orderBy, classes}) => {

  function createSortHandler(headerId:string) {
    return function(event:React.FormEvent<HTMLElement>) {
      onRequestSort(event, headerId);
    }
  }

  function renderSelectionRow() {
    switch(selectType) {
      case EnumSelectType.CHECKBOX:
        return (
          <TableCell padding="none">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
              className={classes.chkStyle}
            />
            <Typography variant="caption" align="center">
              ({numSelected})
            </Typography>
          </TableCell>
        )
      case EnumSelectType.RADIO:
        return <TableCell padding="none"/>;
      default:
      break;
    }
  }

  const directionSort:("asc"|"desc") = order ? order: "desc";

  return (
    <TableHead>
      <TableRow>
        {renderSelectionRow()}
        {rows.map(row => {
          return (
            <TableCell
              key={row.uniqueDataKey}
              numeric={row.numeric}
              sortDirection={orderBy === row.uniqueDataKey ? order:false}
            >
              <TableSortLabel
                active={orderBy === row.uniqueDataKey}
                direction={directionSort}
                onClick={createSortHandler(row.uniqueDataKey)}
              >
                {row.label}
              </TableSortLabel>
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default withStyles(styles)(SortedTableHeader);
