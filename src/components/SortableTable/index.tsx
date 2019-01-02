`use strict`

import * as React from 'react';
import produce from "immer";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '../TableRow';
import {SortDirection} from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import SortedTableHeader from './SortedTableHeader';
import {DataModal, HeaderModal} from './modal';
import defaultSort from './sortAlgorithm';
import {EnumSelectType} from './shared';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

type SelectableRowsPerPage = 5|10|20|50;
const AVAILABLE_PAGE_ROW_SELECTION = [5, 10, 20, 50];
export const SelectableTableType = EnumSelectType;

const styles = (theme:Theme) => createStyles({
  root: {
    overflow: "auto"
  },
  clickableRow: {
    cursor: "pointer"
  },
  clickableCell: {
    color: theme.palette.primary.main
  }
});

interface TableWithSortProp extends WithStyles<typeof styles> {
  data: Array<DataModal>;
  header: Array<HeaderModal>;
  defaultRowsPerPage?: SelectableRowsPerPage;
  withPagination: boolean;
  withSelection?: EnumSelectType;
  name?: string;
  callbackForSelectedCheckboxValues?:(values:Array<string>)=>{}
  callbackForSelectedRadioValues?:(id:string)=>{}
  callbackForClickableRow?:(id:string)=>void
}

interface TableWithSortState {
  order: SortDirection;
  orderBy: string;
  page: number;
  rowsPerPage: number;
  selectedRadio: string;
  selectedCheckbox: Array<string>;
  singleSelectedRow: string;
}

class TableWithSort extends React.PureComponent<TableWithSortProp, TableWithSortState> {
  constructor(props:TableWithSortProp) {
    super(props);
    this.state = {
      order: false,
      orderBy: "",
      page: 0,
      rowsPerPage: this.props.defaultRowsPerPage || 5,
      selectedRadio: "",
      selectedCheckbox: [],
      singleSelectedRow: ""
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

  _updateCheckBoxValue = (checkBoxSelections:Array<string>) => {
    const {callbackForSelectedCheckboxValues} = this.props;
    this.setState(
      produce<TableWithSortState>(draft => {
        draft.selectedCheckbox = checkBoxSelections;
        if(callbackForSelectedCheckboxValues) {
          callbackForSelectedCheckboxValues(draft.selectedCheckbox);
        }
      })
    );
  }

  _handleSelectAllClick = (event:React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    if (checked) {
      this._updateCheckBoxValue(this.props.data.map((dm:DataModal) => `${dm.id}`));
    }
    else {
      this._updateCheckBoxValue([]);
    }
  };

  _handleRadioChange = (id:string) => {
    const {callbackForSelectedRadioValues} = this.props;
    this.setState(
      produce<TableWithSortState>(draft => {
        draft.selectedRadio = id;
        if(callbackForSelectedRadioValues) {
          callbackForSelectedRadioValues(id);
        }
      })
    );
  }

  _handleCheckChange = (id:string) => {
    const { selectedCheckbox } = this.state;
    const selectedIndex = selectedCheckbox.indexOf(id);

    let newSelected:Array<string> = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedCheckbox, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedCheckbox.slice(1));
    } else if (selectedIndex === selectedCheckbox.length - 1) {
      newSelected = newSelected.concat(selectedCheckbox.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedCheckbox.slice(0, selectedIndex),
        selectedCheckbox.slice(selectedIndex + 1),
      );
    }

    this._updateCheckBoxValue(newSelected);
  }

  _handleRowClick = (id:string|number) => (event:React.MouseEvent<HTMLTableRowElement>) => {
    const {withSelection, callbackForClickableRow} = this.props;
    const idAsString = `${id}`;

    switch(withSelection) {
      case EnumSelectType.CHECKBOX:
        this._handleCheckChange(idAsString);
        break;
      case EnumSelectType.RADIO:
        this._handleRadioChange(idAsString)
        break;
      default:
        break;
    }

    if(callbackForClickableRow) {
      this.setState(
        produce<TableWithSortState>(draft => {
          draft.singleSelectedRow = idAsString;
          callbackForClickableRow(idAsString);
        })
      );
    }
  }

  _renderSelectBox = (id:number|string, selectType:EnumSelectType) => {
    const {selectedRadio, selectedCheckbox} = this.state,
          idAsString = `${id}`,
          isSelected = selectedCheckbox.indexOf(idAsString) !== -1;

    switch(selectType) {
      case EnumSelectType.CHECKBOX:
        return (
          <TableCell padding="none">
            <Checkbox
              value={idAsString}
              checked={isSelected}
              name={name}
              color="primary"
              aria-label={idAsString}
            />
          </TableCell>
        );
        break;
      case EnumSelectType.RADIO:
        return (
          <TableCell padding="none">
            <Radio
              checked={selectedRadio === idAsString}
              value={idAsString}
              name={name}
              color="primary"
              aria-label={idAsString}
            />
          </TableCell>
        );
        break;
      default:
      break;
    }
  }

  _decorateCell = () => {
    const {callbackForClickableRow, classes} = this.props;
    const rowDecoration = callbackForClickableRow?{hover: classes.clickableRow}:{};
    const cellDecoration = callbackForClickableRow?{body: classes.clickableCell}:{};
    return {r:rowDecoration, c:cellDecoration};
  }

  _selectedRow = (id:number|string) => {
    const {callbackForClickableRow} = this.props;
    const {singleSelectedRow} = this.state;
    if(callbackForClickableRow) {
      if(singleSelectedRow !== "" && singleSelectedRow == id) {
        return true;
      }
    }
    return false;
  }

  render() {
    const {data, header, withPagination, withSelection, classes} = this.props;
    const {selectedCheckbox, order, orderBy, rowsPerPage, page} = this.state;

    return (
      <div>
        <div className={classes.root}>
          <Table aria-labelledby="tableTitle">
            <SortedTableHeader
              rows={header}
              onRequestSort={this.handleRequestSort}
              order={order}
              orderBy={orderBy}
              selectType={withSelection}
              onSelectAllClick={this._handleSelectAllClick}
              numSelected={selectedCheckbox.length}
              rowCount={data.length}
            />
            <TableBody>
              {
                this._sliceData(defaultSort(data, order, orderBy))
                .map((dm:DataModal) => {
                  return (
                    <TableRow
                      hover
                      selected={this._selectedRow(dm.id)}
                      tabIndex={-1}
                      key={dm.id}
                      onClick={this._handleRowClick(dm.id)}
                      materialUiTableRowClass={this._decorateCell().r}
                    >
                      {
                        this._renderSelectBox(dm.id, withSelection)
                      }
                      {
                        header.map((hm:HeaderModal, idx:number) => {
                          return (
                            <TableCell
                              key={`${hm.uniqueDataKey}_${dm.id}`}
                              numeric={hm.numeric}
                              classes={this._decorateCell().c}
                              >
                              {dm[hm.uniqueDataKey]}
                            </TableCell>
                          )
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

export default withStyles(styles)(TableWithSort);
