`use strict`

import {Connector} from '../util/Connector';

interface FetchConfigModal {
  path?: string;
  method?: string;
  body?: any;
  headers?: object;
  success: (json:any) => any;
}

export interface FetchMiddlewareModal {
  types: Array<string>,
  fetchConfig: FetchConfigModal
}

const handleErrors = (data:any) => {
  if (!data) {
    throw Error("THERE ARE NO VALID DATA");
  }
  return data;
}

const createSuccessDispatcherMessage = (successType:any, data:any) => {
  return {
    type: successType,
    payload: {data}
  }
}

const createFailedDispatcherMessage = (errorType:any, error:any) => {
  return {
    type: errorType,
    payload: {error}
  }
}

const fetchMiddleware = (store:any) => (next:any) => (action:FetchMiddlewareModal) => {
  if (!action || !action.fetchConfig) {
      return next(action)
  }

  let dispatch = store.dispatch
  let config = action.fetchConfig

  const path = config.path || "/"
  const method = config.method || "GET"
  const headers = config.headers
  const body = config.body
  const successHandler = config.success
  const [pendingType, successType, errorType] = action.types;
  dispatch({ type: pendingType });
  Connector({
    method: method,
    url: path,
    data: body,
    headers: headers
  })
  .then(res => res.data)
  .then(handleErrors)
  .then(json => successHandler(json) )
  .then(formattedData => {
    dispatch(createSuccessDispatcherMessage(successType, formattedData));
    //return Promise.resolve(store.getState());
  })
  .catch( error => {
    dispatch(createFailedDispatcherMessage(errorType, error));
    //return Promise.reject(error);
  });
}

export default fetchMiddleware
