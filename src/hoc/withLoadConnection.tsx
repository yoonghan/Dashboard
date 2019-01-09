import * as React from 'react';
import {compose, Dispatch} from "redux";
import {connect, MapStateToProps} from "react-redux";
import LoaderError from '../components/LoaderError';
import Loader from '../components/Loader';
import {FetchMiddlewareModal} from "../middleware/fetch";

export interface BasicLoaderModal<T> {
  isEmpty: (response: T) => boolean;
  isError: (response: T) => boolean;
  isLoading: (response: T) => boolean;
  emptyMessage: string;
  errorMessage: (response: T) => string;
  [key:string]: any;
}

export interface WithLoadConnectionProps extends BasicLoaderModal<any> {
  loading: boolean;
  dispatch: any;
}

const withLoadConnection = (dispatchFunc: ()=>FetchMiddlewareModal) => (Component: React.ComponentType) =>
  class LoaderHOC extends React.Component<WithLoadConnectionProps, {}> {
    componentDidMount(){
      this.props.dispatch(dispatchFunc());
    }

    render() {
      const {dispatch, isEmpty, isError, isLoading, errorMessage, emptyMessage, ...response} = this.props;
      if(isLoading(response)) {
        return <Loader/>;
      }
      if(isError(response)) {
        return <LoaderError>{errorMessage(response)}</LoaderError>;
      }
      if(isEmpty(response)) {
        return <LoaderError>{emptyMessage}</LoaderError>;
      }
      return <Component {...response}/>;
    }
  }

const composedHoc = (fetchFunc:()=>FetchMiddlewareModal, mapStateToProps:((state:MapStateToProps<any, any, any>) => BasicLoaderModal<any>)) => {
  return compose(
    connect(mapStateToProps),
    withLoadConnection(fetchFunc)
  )
};

export default composedHoc;
