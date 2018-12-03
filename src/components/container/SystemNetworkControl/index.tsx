`use strict`

import * as React from 'react';
import produce from "immer";
import Button from '@material-ui/core/Button';
import {AutoSizer} from 'react-virtualized';
import SystemNetwork from '../../SystemNetwork';
import {NodeInfoModal, NodeType, NodeDataModal} from '../../SystemNetwork';
import SystemNetworkInfo from './SystemNetworkInfo';
import {SystemNetworkInfoInputModal} from './SystemNetworkInfo';
import SystemNetworkControlInput from './SystemNetworkControlInput';
import {SystemNetworkControlInputModal} from './SystemNetworkControlInput';

interface SystemNetworkControlState {
  data: NodeDataModal;
  counter: number;
  isInputDialogOpen: boolean;
  isInfoOpen: boolean;
  infoDetail: SystemNetworkInfoInputModal;
}

class SystemNetworkControl extends React.PureComponent<{}, SystemNetworkControlState> {
  private systemNetworkRef = React.createRef<SystemNetwork>();
  private counter = 0;

  constructor(props: any) {
    super(props);
    this.state = {
      data: {
        nodes: [],
        links: []
      },
      counter: 0,
      isInputDialogOpen: false,
      isInfoOpen: false,
      infoDetail: {
        storeName: '',
        ipAddress: '',
        hostname: ''
      }
    }
  }

  _handleInputDialogClose = () => {
    this.setState(
      produce<SystemNetworkControlState>(draft => {
        draft.isInputDialogOpen = false;
      })
    );
  }

  _onSubmitAddNetwork = (output:SystemNetworkControlInputModal) => {

    const component = this.systemNetworkRef.current.addNodes([
      {
        name: output.storeName,
        ipAddress: output.ipAddress,
        hostname: output.hostname,
        nodeType: NodeType.MASTER,
        group: output.storeName
      },
      {
        name: `Child ${output.storeName}`,
        ipAddress: output.ipAddress,
        hostname: output.hostname,
        nodeType: NodeType.GENERAL,
        group: output.storeName
      },
      {
        name: `Child ${output.storeName}`,
        ipAddress: output.ipAddress,
        hostname: output.hostname,
        nodeType: NodeType.GENERAL,
        group: output.storeName
      }
    ]);
  }

  _onClickAddNetwork = () => {
    this.setState(
      produce<SystemNetworkControlState>(draft => {
        draft.isInputDialogOpen = true;
      })
    );
  }

  _onClickNode = (data: NodeInfoModal) => {
    this.setState(
      produce<SystemNetworkControlState>(draft => {
        draft.isInfoOpen = true;
        draft.infoDetail = {
          storeName: data.name,
          ipAddress: data.ipAddress,
          hostname: data.hostname
        }
      })
    );
  }

  _handleInfoClose = () => {
    this.setState(
      produce<SystemNetworkControlState>(draft => {
        draft.isInfoOpen = false;
      })
    );
  }

  render() {
    const {data, isInputDialogOpen, isInfoOpen, infoDetail} = this.state;

    return (
      <div style={{width: "100%", height: "100%"}}>
      <AutoSizer>
        {(({width, height}) => width === 0 || height === 0 ? null : (
          <SystemNetwork
            width={(width-4)} height={(height-4)}
            language={"EN"}
            initData={data}
            ref={this.systemNetworkRef}
            nodeClickCallback={this._onClickNode}
            />
          ))}
        </AutoSizer>
        <Button variant="fab" color="primary" aria-label="Add" onClick={this._onClickAddNetwork}>
          Add
        </Button>
        <SystemNetworkControlInput
          openDialog={isInputDialogOpen}
          onSubmit={this._onSubmitAddNetwork}
          handleClose={this._handleInputDialogClose}
          />
        <SystemNetworkInfo
          openSideBar={isInfoOpen}
          handleClose={this._handleInfoClose}
          {...infoDetail}
          />
      </div>
    );
  }
}

export default SystemNetworkControl;
