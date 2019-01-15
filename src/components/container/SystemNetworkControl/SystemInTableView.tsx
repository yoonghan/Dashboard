`use strict`

import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import TableRow from '../../TableRow';
import {NetworkDataModal, CountryDataModal, RegionDataModal, StoreDataModal, AgentDataModal} from "./modal";
import {NodeInfoModal, StatusType, NodeType} from "../../SystemNetwork";
import {getStoreName, getConnectionStatus} from "./networkLinkConverter";


const styles = (theme:Theme) => createStyles({
  root: {
    overflow: "auto"
  },
  connSuccess: {
    cursor: "pointer",
    backgroundColor: (theme.palette as any).success.main
  },
  connWarning: {
    cursor: "pointer",
    backgroundColor: (theme.palette as any).warn.main
  },
  connError: {
    cursor: "pointer",
    backgroundColor: theme.palette.error.main
  }
});

interface SystemInTableViewProps extends WithStyles<typeof styles> {
  networkData: NetworkDataModal;
  nodeClickCallback: (nodeInfo: NodeInfoModal) => void;
}

const SystemInTableView: React.SFC<SystemInTableViewProps> = ({classes, networkData, nodeClickCallback}) => {

  function getColor(status:string, state: string) {
    const connStatus = getConnectionStatus(status, state);
    switch(connStatus) {
      case StatusType.CONNECTED_AUTHENTICATED:
      return classes.connSuccess;
      case StatusType.CONNECTED_UNAUTHENTICATED:
      return classes.connWarning;
      default:
      return classes.connError;
    }
  }

  function _renderAgentRow(ctryId:number, regionId:number, storeId: number, agents:Array<AgentDataModal>) {
    return agents.map((agent) => {
      const colorClass = getColor(agent.connectionStatus, agent.agentAuthState);
      const info = {
        name: agent.agentMOId,
        ipAddress: agent.ipAddress,
        hostname: "",
        nodeType: (agent.agentType === "Master Agent"?NodeType.MASTER: NodeType.GENERAL),
        connectionStatus: getConnectionStatus(agent.connectionStatus, agent.agentAuthState),
        group: `${storeId}`,
      }
      return (
        <TableRow
          key={`a_${ctryId}_${regionId}_${storeId}_${agent.id}`}
          hover
          onClick={nodeClickCallback(info)}
          materialUiTableRowClass={{
            root: colorClass
          }}
          >
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell>{agent.agentMOId}</TableCell>
          <TableCell>{agent.agentType}</TableCell>
          <TableCell>{agent.agentVersion}</TableCell>
          <TableCell>{agent.ipAddress}</TableCell>
        </TableRow>
      )
    });
  }

  function _renderStoreRow(ctryId:number, regionId:number, stores:Array<StoreDataModal>) {
    return stores.map((store) => {
      return (
        <React.Fragment key={`s_${ctryId}_${regionId}_${store.id}`}>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>{getStoreName(store.agents)}</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
          {_renderAgentRow(ctryId, regionId, store.id, store.agents)}
        </React.Fragment>
      )
    });
  }

  function _renderRegionRow(ctryId:number, regions:Array<RegionDataModal>) {
    return regions.map((region) => {
      return (
        <React.Fragment key={`r_${ctryId}_${region.id}`}>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>{region.name}</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
          {_renderStoreRow(ctryId, region.id, region.stores)}
        </React.Fragment>
      )
    });
  }

  function _renderCountryRow(countries:Array<CountryDataModal>) {
    return countries.map((country, idx:number) => {
      return (
        <React.Fragment key={`c_${country.id}`}>
          <TableRow>
            <TableCell>{country.name}</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
          {_renderRegionRow(country.id, country.regions)}
        </React.Fragment>
      )
    });
  }

  function _renderData() {
    return _renderCountryRow(networkData.countries);
  }

  return (
    <div className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell>Zone</TableCell>
            <TableCell>Store</TableCell>
            <TableCell>Agent Id</TableCell>
            <TableCell>Agent Type</TableCell>
            <TableCell>Agent Version</TableCell>
            <TableCell>Ip Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_renderData()}
        </TableBody>
      </Table>
    </div>
  );
}

export default withStyles(styles)(SystemInTableView);
