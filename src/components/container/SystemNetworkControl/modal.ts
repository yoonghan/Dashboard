export interface NetworkDataModal {
  id: number;
  countries: Array<CountryDataModal>;
}

export interface CountryDataModal {
  id: number;
  name: string;
  regions: Array<RegionDataModal>;
}

export interface RegionDataModal {
  id: number;
  name: string;
  stores: Array<StoreDataModal>;
}

export interface StoreDataModal {
  id: number;
  ipAddress: string;
  hostName: string;
  agents: Array<AgentDataModal>;
}

export interface AgentDataModal {
  id: number;
  agentMOId: string;
  agentVersion: string;
  agentType: string;
  deviceId: string;
  systemId: string;
  ipAddress: string;
  is64bitOS: boolean;
  mgmtPort: string;
  connectionStatus: string;
  agentAuthState: string;
  modelNumber: string;
  MACAddress: string;
  osValue: number;
  storeId: number;
}
