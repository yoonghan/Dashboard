`use strict`

import {DataModal} from './modal';
import {SortDirection} from '@material-ui/core/TableCell';

interface TempSortedModal {
  data: DataModal,
  index: number
}

function desc(a:DataModal, b:DataModal, orderBy:string) {
  if (b[orderBy] < a[orderBy]) {
    return 1;
  }
  if (b[orderBy] > a[orderBy]) {
    return -1;
  }
  return 0;
}

function getSorting(order:SortDirection, orderBy:string) {
  return order === "desc" ? (a:DataModal, b:DataModal) => desc(a, b, orderBy) : (a:DataModal, b:DataModal) => -desc(a, b, orderBy);
}

function stableSort(array:Array<DataModal>, order:SortDirection, orderBy:string) {
  const stabilizedThis:Array<TempSortedModal> =
        array.map((el:DataModal, idx:number) => ({data:el, index:idx}));
  const cmp = getSorting(order, orderBy);
  stabilizedThis.sort((a:TempSortedModal, b:TempSortedModal) => {
    const order = cmp(a.data, b.data);
    if (order !== 0) return order;
    return a.index - b.index;
  });
  return stabilizedThis.map((el:TempSortedModal) => el.data);
}

export default stableSort;
