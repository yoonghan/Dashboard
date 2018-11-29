`use strict`

import * as React from 'react';
import produce from "immer";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import SortedTableHeader from './SortedTableHeader';
import {DataModal, HeaderModal} from './modal';
import defaultSort from './sortAlgorithm';
import {SortDirection} from '@material-ui/core/TableCell';

type SelectableRowsPerPage = 5|10|20|50;
const AVAILABLE_PAGE_ROW_SELECTION = [5, 10, 20, 50];

interface TableWithSortProp {
  data: Array<DataModal>;
  header: Array<HeaderModal>;
  defaultRowsPerPage?: SelectableRowsPerPage;
  withPagination: boolean;
}

interface TableWithSortState {
  order: SortDirection;
  orderBy: string;
  page: number;
  rowsPerPage: number;
}

class TableWithSort extends React.PureComponent<TableWithSortProp, TableWithSortState> {
  constructor(props:TableWithSortProp) {
    super(props);
    this.state = {
      order: false,
      orderBy: "",
      page: 0,
      rowsPerPage: this.props.defaultRowsPerPage || 5
    }
  }

  handleRequestSort = (event:React.FormEvent<HTMLElement>, headerId:string) => {
    const orderBy = headerId;
    let order:SortDirection = "desc";

    if (this.state.orderBy === headerId && this.state.order === 'desc') {
      order = "asc";
    }

    this.setState(
      produce<TableWithSortState>(draft => {
        draft.order = order;
        draft.orderBy = orderBy;
      })
    );
  };

  handleChangePage = (event:React.FormEvent<HTMLElement>, page:number) => {
    this.setState(
      produce<TableWithSortState>(draft => {
        draft.page = page;
      })
    );
  };

  handleChangeRowsPerPage = (event:React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    this.setState(
      produce<TableWithSortState>(draft => {
        draft.rowsPerPage = value;
      })
    );
  };

  _sliceData = (data: Array<DataModal>):Array<DataModal> => {
    const {withPagination} = this.props;
    const {rowsPerPage, page} = this.state;
    if(withPagination) {
      return data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }
    else {
      return data;
    }
  }

  _renderPagination = () => {
    const {data, withPagination} = this.props;
    const {rowsPerPage, page} = this.state;

    if(withPagination) {
      return (<TablePagination
        rowsPerPageOptions={AVAILABLE_PAGE_ROW_SELECTION}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={this.handleChangePage}
        onChangeRowsPerPage={this.handleChangeRowsPerPage}
      />);
    }
    return null;
  }

  render() {
    const {data, header, withPagination} = this.props;
    const {order, orderBy, rowsPerPage, page} = this.state;

    return (
      <div>
        <div>
          <Table aria-labelledby="tableTitle">
            <SortedTableHeader
              rows={header}
              onRequestSort={this.handleRequestSort}
              order={order}
              orderBy={orderBy}
            />
            <TableBody>
              {
                this._sliceData(defaultSort(data, order, orderBy))
                .map((dm:DataModal) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={dm.id}
                    >
                      {
                        header.map((hm:HeaderModal, idx:number) => {
                          return (<TableCell
                            key={`${hm.uniqueDataKey}_${dm.id}`}
                            numeric={hm.numeric}
                            >
                            {dm[hm.uniqueDataKey]}
                          </TableCell>)
                        })
                      }
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
        {this._renderPagination()}
      </div>
    )
  }
}

export default TableWithSort;
