`use strict`

import * as React from 'react';
import { DashboardConsumer } from "../shared/Context";
import MaterialUITableRow from '@material-ui/core/TableRow';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

const styles = (theme:Theme) => createStyles({
  nopadding: {
    height: "unset"
  }
});

interface TableRowProps extends WithStyles<typeof styles>{
  selected?: boolean,
  hover?:boolean,
  tabIndex?: number,
  onClick?: any,
  materialUiTableRowClass?: object
}

const TableRow: React.SFC<TableRowProps> = ({classes, children, selected, hover, tabIndex, onClick, materialUiTableRowClass}) => {
  function tableRowDisplay(isCompact:boolean) {
    return (
      <MaterialUITableRow
        classes={materialUiTableRowClass}
        className={isCompact?classes.nopadding:""}
        selected={selected}
        hover={hover}
        tabIndex={tabIndex}
        onClick={onClick}
        >
        {children}
      </MaterialUITableRow>);
  }


  return (
    <DashboardConsumer>
    { consumerData => (
      tableRowDisplay(consumerData.isCompact)
    )}
    </DashboardConsumer>
  );
}


export default withStyles(styles)(TableRow);
