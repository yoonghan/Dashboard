`use strict`

import * as React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import {HeaderModal} from './modal';
import {SortDirection} from '@material-ui/core/TableCell';

export interface SortedTableHeaderProps {
  rows: Array<HeaderModal>;
  onRequestSort: (event:React.FormEvent<HTMLElement>, headerId:string) => void;
  order: SortDirection;
  orderBy: string;
}

const SortedTableHeader: React.SFC<SortedTableHeaderProps> = ({rows, onRequestSort, order, orderBy}) => {

  function createSortHandler(headerId:string) {
    return function(event:React.FormEvent<HTMLElement>) {
      onRequestSort(event, headerId);
    }
  }

  const directionSort:("asc"|"desc") = order ? order: "desc";

  return (
    <TableHead>
      <TableRow>
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

export default SortedTableHeader;
