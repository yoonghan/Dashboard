`use strict`

import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'; 
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import TableRow from '../../TableRow';
import SortableTable from '../../SortableTable';
import {SelectableTableType} from '../../SortableTable';

const styles = (theme:Theme) => createStyles({
  root: {
    marginTop: theme.spacing.unit * 2,
    ...theme.mixins.gutters()
  }
});

interface DetailProps extends WithStyles<typeof styles> {
}

const Detail: React.SFC<DetailProps> = ({classes}) => {

  return (
    <Paper className={classes.root}>
      <Typography variant="subtitle1">Detail - HardCoded</Typography>
      <Divider/>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Set Description</TableCell>
            <TableCell>BOSS Replication Capture control critical Status set</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>System</TableCell>
            <TableCell>BOSS</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Component</TableCell>
            <TableCell>BOSS</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Instance Id</TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell>Hardware Status</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Category Description</TableCell>
            <TableCell>Hardware Status</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Details</TableCell>
            <TableCell>Unable to get DB Connection</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Time timeReceived</TableCell>
            <TableCell>Dec 10, 2018 12:13:51 PM</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Auto-Clear</TableCell>
            <TableCell>False</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Persistence</TableCell>
            <TableCell>True</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Event Date and Time</TableCell>
            <TableCell>Dec 10, 2018 12:13:51 PM</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Event Component Type</TableCell>
            <TableCell>BOSS Replication</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Event Component Category</TableCell>
            <TableCell>Retail\SelfCheckout\BOSS</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Event Component Instance</TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Event Condition</TableCell>
            <TableCell>Capture Control</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Event Condition Value</TableCell>
            <TableCell>Failed</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Event Text</TableCell>
            <TableCell>Unable to get DB Connection</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Event Source</TableCell>
            <TableCell>BOSS</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Event Category</TableCell>
            <TableCell>Alert</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Event Sender Name</TableCell>
            <TableCell>Store01-BOSS</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Event Detail</TableCell>
            <TableCell>Unable to get connection to database initializing replication</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  )
}

export default withStyles(styles)(Detail);
