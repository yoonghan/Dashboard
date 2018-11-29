`use strict`

import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

interface GeneralInfoProps {

}

const GeneralInfo: React.SFC<GeneralInfoProps> = ({}) => {
  return (
    <React.Fragment>
      <ExpansionPanel expanded>
        <ExpansionPanelSummary>
          <Typography>Computer information</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Operating System</TableCell>
                <TableCell>Windows 2018</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>CPU</TableCell>
                <TableCell>Intel x86 Pentium</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Should this be editable</TableCell>
                <TableCell>More Information</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary>
          <Typography>Connection View</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Tied ti</TableCell>
                <TableCell>Windows 2018</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary>
          <Typography>Location</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Property</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>IP Address</TableCell>
                <TableCell>192.168.1.1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Address</TableCell>
                <TableCell>Addr</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </React.Fragment>
  )
}

export default GeneralInfo;
