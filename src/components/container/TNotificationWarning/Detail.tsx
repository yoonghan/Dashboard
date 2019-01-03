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
import {EVENT_MEMORY_FAIL} from "../../../samples/event";

const styles = (theme:Theme) => createStyles({
  root: {
    marginTop: theme.spacing.unit * 2,
    ...theme.mixins.gutters()
  }
});

interface AlertDetailProps extends WithStyles<typeof styles> {
}

interface MapEntryValueModal {
  [key:string]: string|number;
}

interface MapEntryKeyModal {
  [key:string]: string;
}

interface MapEntryModal {
  MapEntryKey: MapEntryKeyModal;
  MapEntryValue: MapEntryValueModal;
}

const AlertDetail: React.SFC<AlertDetailProps> = ({classes}) => {
  const response = EVENT_MEMORY_FAIL;

  function mapEntry(entries:Array<MapEntryModal>) {
    return entries.map((entry:MapEntryModal) => {
      return (
        <TableRow>
          <TableCell>{entry.MapEntryKey["string"]}</TableCell>
          <TableCell>{entry.MapEntryValue["string"] || entry.MapEntryValue["double"]}</TableCell>
        </TableRow>
      )
    });
  }

  return (
    <Paper className={classes.root}>
      <Typography variant="subtitle1">Detail</Typography>
      <Divider/>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>System</TableCell>
            <TableCell>{response.Event.OriginatingMO.systemID}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Component</TableCell>
            <TableCell>{response.Event.ComponentType}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Condition Type</TableCell>
            <TableCell>{response.Event.ConditionType}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Condition Qualifier</TableCell>
            <TableCell>{response.Event.Array.Qualifier.map((val) => `${val}, `)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Details</TableCell>
            <TableCell>{response.Event.Message}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Event Source</TableCell>
            <TableCell>{response.Event.OriginatingMO.IPAddress}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Event Category</TableCell>
            <TableCell>Alert</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Event Sender Name</TableCell>
            <TableCell>{response.Event.OriginatingMO.agentID}</TableCell>
          </TableRow>
          {mapEntry(response.Event.UserData.Map.MapEntry)}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default withStyles(styles)(AlertDetail);
