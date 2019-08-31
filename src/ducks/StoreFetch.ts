`use strict`

const PATH='/api';

export interface StoreFetchModal {
  isLoading: boolean,
  error: string,
  items: Array<any>
}

export const FETCH_BEGIN   = 'FETCH_BEGIN';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const fetchBegin = () => ({
  type: FETCH_BEGIN
});

export const fetchSuccess = (success:any) => ({
  type: FETCH_SUCCESS,
  payload: { success }
});

export const fetchFailure = (error:any) => ({
  type: FETCH_FAILURE,
  payload: { error }
});

const initialState:any = {
  isLoading: true,
  items: [],
  error: null
};

export const fetchFullStores = () => {
  return {
    types: [FETCH_BEGIN, FETCH_SUCCESS, FETCH_FAILURE],
    fetchConfig: {
      path: PATH,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      method: "POST",
      body: {
        "query":`
        {
          countries {
            name
            regionIds
            regions {
              name
              id
              storeIds
              stores {
               ipAddress
               hostName
               id
              	agents{
                  id
                  agentMOId
                  agentVersion
                  agentType
                  deviceId
                  systemId
                  ipAddress
                  is64bitOS
                  mgmtPort
                  connectionStatus
                  agentAuthState
                  modelNumber
                  MACAddress
                  osValue
                  storeId
                }
              }
            }
          }
        }`
      },
      success: function(json:any) {
        return json;
      }
    }
  }
}

export const fetchStores = () => {
  return {
    types: [FETCH_BEGIN, FETCH_SUCCESS, FETCH_FAILURE],
    fetchConfig: {
      path: PATH,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      method: "POST",
      body: {
        "query":`
        {
          stores {
            hostName
            ipAddress
          }
        }`
      },
      success: function(json:any) {
        return json;
      }
    }
  }
}

export const reducer = (state = initialState, action:any) => {
  switch(action.type) {
    case FETCH_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
        items: []
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        items: action.payload.data
      };
    case FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        items: []
      };
    default:
      return state;
  }
}
