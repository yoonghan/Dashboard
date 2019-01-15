import {NetworkDataModal, AgentDataModal} from "./modal";
import {SimulationNodeDatum, SimulationLinkDatum} from 'd3-force';
import {NodeInfoModal, NodeType, StatusType, NodeDataModal} from '../../SystemNetwork';

const AGENT_SEPERATOR_KEY = "-";
const MASTER_AGENT_IDENTIFIER = "Master Agent";

export const getStoreName = (agents:Array<AgentDataModal>) => {
  if(agents && agents.length > 0) {
    return agents[0].agentMOId.split(AGENT_SEPERATOR_KEY)[0];
  }

  return "";
}

export const getConnectionStatus = (status:string, state:string) => {
  if(status === "connected") {
    if(state === "authenticated") {
      return StatusType.CONNECTED_AUTHENTICATED;
    }
    else {
      return StatusType.CONNECTED_UNAUTHENTICATED;
    }
  }
  else {
    return StatusType.DISCONNECTED;
  }
}

export const convertNetworkDataIntoSystemNetwork = (networkData: NetworkDataModal) => {
  let nodes:Array<NodeInfoModal> = [];
  networkData.countries.map((country) => {
    country.regions.map((region) => {
      region.stores.map((store) => {
        let storeName = getStoreName(store.agents);
        let storeId = store.id;
        store.agents.map((agent) => {
          nodes.push ({
            name: storeName,
            ipAddress: agent.ipAddress,
            hostname: "",
            connectionStatus: getConnectionStatus(agent.connectionStatus, agent.agentAuthState),
            nodeType: agent.agentType === MASTER_AGENT_IDENTIFIER? NodeType.MASTER: NodeType.GENERAL,
            group: `${storeId}`
          });
        });
      })
    });
  });
  return convertNodeInfoIntoSystemNetwork(nodes);
}

export const convertNodeInfoIntoSystemNetwork = (newConnections: Array<NodeInfoModal>) => {
  const links:Array<SimulationLinkDatum<SimulationNodeDatum>> = [];
  const nodes:Array<NodeInfoModal> = [];
  let currMasterIdx = -1;
  let currMasterGroup = "";
  let offset = nodes.length;

  newConnections.map((newNode:NodeInfoModal, idx:number) => {
    nodes.push({
      name: newNode.name,
      ipAddress: newNode.ipAddress,
      hostname: newNode.hostname,
      nodeType: newNode.nodeType,
      connectionStatus: newNode.connectionStatus,
      group: newNode.group
    });

    if(newNode.nodeType === NodeType.MASTER) {
      currMasterIdx = offset + idx;
      currMasterGroup = newNode.group;
    }
    else if(newNode.nodeType === NodeType.GENERAL) {
      if(newNode.group === currMasterGroup) {
        links.push({
          source: offset + idx,
          target: currMasterIdx
        });
      }
      else { //search for idx
        for(let nodeIdx = 0; nodeIdx < nodes.length; nodeIdx++) {
          const currNode = nodes[nodeIdx];
          if(currNode.group === newNode.group && currNode.nodeType === NodeType.MASTER) {
            links.push({
              source: offset + idx,
              target: nodeIdx
            });
            break;
          }
        }
      }
    }
  });

  return {links: links, nodes: nodes};
}
