`use strict`

import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import TableRow from '../../TableRow';

const styles = (theme:Theme) => createStyles({
  root: {
    overflow: "auto"
  }
});

interface SystemInTableViewProps extends WithStyles<typeof styles> {
}

const SystemInTableView: React.SFC<SystemInTableViewProps> = ({classes}) => {
  return (
    <div className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Organization</TableCell>
            <TableCell>Store</TableCell>
            <TableCell>Agent Id</TableCell>
            <TableCell>Agent Type</TableCell>
            <TableCell>IpAddress</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>RMA Version</TableCell>
            <TableCell>OS Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell rowSpan={6}>Toshiba Center 1</TableCell>
            <TableCell rowSpan={3}>Store 1</TableCell>
            <TableCell>Sample Store #1-BOSS</TableCell>
            <TableCell>Master</TableCell>
            <TableCell>192.168.169.1</TableCell>
            <TableCell>Ok</TableCell>
            <TableCell>V3R2.2</TableCell>
            <TableCell>Windows</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Sample Store #1-LANE</TableCell>
            <TableCell>General</TableCell>
            <TableCell>192.168.169.11</TableCell>
            <TableCell>Ok</TableCell>
            <TableCell>V3R2.2</TableCell>
            <TableCell>Windows</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Sample Store #1-LANE1</TableCell>
            <TableCell>General</TableCell>
            <TableCell>192.168.169.12</TableCell>
            <TableCell>Ok</TableCell>
            <TableCell>V3R2.2</TableCell>
            <TableCell>Linux</TableCell>
          </TableRow>
          <TableRow>
            <TableCell rowSpan={3}>Store 2</TableCell>
            <TableCell>Sample Store #2-BOSS</TableCell>
            <TableCell>Master</TableCell>
            <TableCell>192.168.170.1</TableCell>
            <TableCell>Ok</TableCell>
            <TableCell>V3R2.2</TableCell>
            <TableCell>Windows</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Sample Store #2-LANE</TableCell>
            <TableCell>General</TableCell>
            <TableCell>192.168.170.11</TableCell>
            <TableCell>Ok</TableCell>
            <TableCell>V3R2.2</TableCell>
            <TableCell>Windows</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Sample Store #2-LANE1</TableCell>
            <TableCell>General</TableCell>
            <TableCell>192.168.170.12</TableCell>
            <TableCell>Ok</TableCell>
            <TableCell>V3R2.2</TableCell>
            <TableCell>Windows</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default withStyles(styles)(SystemInTableView);
