`use strict`

import * as React from 'react';
import { compose } from "redux";
import { MapStateToProps } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import SystemNetworkControl from "../SystemNetworkControl";
import withLoadConnection from "../../../hoc/withLoadConnection";
import {BasicLoaderModal} from "../../../hoc/withLoadConnection";
import { fetchStores, fetchFullStores, StoreFetchModal } from "../../../ducks/StoreFetch";

interface ResponseModal {
  store: StoreFetchModal
}

interface THomeProps extends RouteComponentProps<any>, BasicLoaderModal<ResponseModal> {}

const THome: React.SFC<THomeProps> = ({history, store, error}) => {
  const {items} = store;
  return <
    SystemNetworkControl
    handleMoreInfoOnClick={()=>{history.push("/serverinfo")}}
    networkData={items.data}
    />
}

const mapStateToProps = (state:any) => ({
  isLoading: (response: ResponseModal) => response.store.isLoading,
  isEmpty: (response: ResponseModal) => false,
  isError: (response: ResponseModal) => (response.store.error !== null),
  errorMessage: (response: ResponseModal) => `${response.store.error}`,
  emptyMessage: "RECORD NOT FOUND",
  store: state.store
});

const composeComponent = compose (
  withLoadConnection(fetchFullStores, mapStateToProps),
  withRouter
)

export default composeComponent(THome);
