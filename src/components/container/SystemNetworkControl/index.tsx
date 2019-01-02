`use strict`

import * as React from 'react';
import produce from "immer";
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import {AutoSizer} from 'react-virtualized';
import SystemNetwork from '../../SystemNetwork';
import {NodeInfoModal, NodeType, NodeDataModal} from '../../SystemNetwork';
import SystemNetworkInfo from './SystemNetworkInfo';
import {SystemNetworkInfoInputModal} from './SystemNetworkInfo';
import SystemNetworkControlInput from './SystemNetworkControlInput';
import {SystemNetworkControlInputModal} from './SystemNetworkControlInput';

const buttonPosition= "20px";
const styles = (theme:Theme) => createStyles({
  root: {
    width: "100%",
    height: "calc(100vh - 64px)"
  },
  addButton: {
    right: buttonPosition,
    bottom: buttonPosition,
    position: 'absolute'
  }
});

interface SystemNetworkControlProps extends WithStyles<typeof styles> {
  handleMoreInfoOnClick: ()=>void;
}

interface SystemNetworkControlState {
  data: NodeDataModal;
  counter: number;
  isInputDialogOpen: boolean;
  isInfoOpen: boolean;
  infoDetail: SystemNetworkInfoInputModal;
}

class SystemNetworkControl extends React.PureComponent<SystemNetworkControlProps, SystemNetworkControlState> {
  private systemNetworkRef = React.createRef<SystemNetwork>();
  private counter = 0;

  constructor(props: any) {
    super(props);
    const listOfNodes:Array<NodeInfoModal> = [];
    const listOfLinks:Array<any> = [];
    for(let i = 0; i < 40; i+=10) {
      listOfNodes.push(
        { name: `Node ${i}`, ipAddress: `192.168.${i}`, hostname: `Host${i}`, nodeType: NodeType.MASTER, group: `${i}` }
      );
      listOfNodes.push(
        { name: `ChildNode ${i}`, ipAddress: `192.168.${i}`, hostname: `Host${i}`, nodeType: NodeType.GENERAL, group: `${i}` }
      );
      listOfNodes.push(
        { name: `ChildNode ${i}`, ipAddress: `192.168.${i}`, hostname: `Host${i}`, nodeType: NodeType.GENERAL, group: `${i}` }
      );
      listOfNodes.push(
        { name: `ChildNode ${i}`, ipAddress: `192.168.${i}`, hostname: `Host${i}`, nodeType: NodeType.GENERAL, group: `${i}` }
      );
      listOfNodes.push(
        { name: `ChildNode ${i}`, ipAddress: `192.168.${i}`, hostname: `Host${i}`, nodeType: NodeType.GENERAL, group: `${i}` }
      );
      listOfNodes.push(
        { name: `ChildNode ${i}`, ipAddress: `192.168.${i}`, hostname: `Host${i}`, nodeType: NodeType.GENERAL, group: `${i}` }
      );
      listOfNodes.push(
        { name: `ChildNode ${i}`, ipAddress: `192.168.${i}`, hostname: `Host${i}`, nodeType: NodeType.GENERAL, group: `${i}` }
      );
      listOfNodes.push(
        { name: `ChildNode ${i}`, ipAddress: `192.168.${i}`, hostname: `Host${i}`, nodeType: NodeType.GENERAL, group: `${i}` }
      );
      listOfNodes.push(
        { name: `ChildNode ${i}`, ipAddress: `192.168.${i}`, hostname: `Host${i}`, nodeType: NodeType.GENERAL, group: `${i}` }
      );
      listOfNodes.push(
        { name: `ChildNode ${i}`, ipAddress: `192.168.${i}`, hostname: `Host${i}`, nodeType: NodeType.GENERAL, group: `${i}` }
      );
      listOfLinks.push(
        { source: i+1, target: i }
      );
      listOfLinks.push(
        { source: i+2, target: i }
      );
      listOfLinks.push(
        { source: i+3, target: i }
      );
      listOfLinks.push(
        { source: i+4, target: i }
      );
      listOfLinks.push(
        { source: i+5, target: i }
      );
      listOfLinks.push(
        { source: i+6, target: i }
      );
      listOfLinks.push(
        { source: i+7, target: i }
      );
      listOfLinks.push(
        { source: i+8, target: i }
      );
      listOfLinks.push(
        { source: i+9, target: i }
      );
    }

    this.state = {
      data: {
        nodes: listOfNodes,
        links: listOfLinks
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
    const {classes, handleMoreInfoOnClick} = this.props;
    const {data, isInputDialogOpen, isInfoOpen, infoDetail} = this.state;

    return (
      <div className={classes.root}>
        <AutoSizer>
        {(({width, height}) => width === 0 || height === 0 ? null : (
          <SystemNetwork
            width={(width-5)} height={(height-5)}
            language={"EN"}
            initData={data}
            ref={this.systemNetworkRef}
            nodeClickCallback={this._onClickNode}
            />
          ))}
        </AutoSizer>
        <Button
          variant="fab"
          color="secondary"
          aria-label="Add"
          className={classes.addButton}
          onClick={this._onClickAddNetwork}
          >
          <AddIcon/>
        </Button>
        <SystemNetworkControlInput
          openDialog={isInputDialogOpen}
          onSubmit={this._onSubmitAddNetwork}
          handleClose={this._handleInputDialogClose}
          />
        <SystemNetworkInfo
          openSideBar={isInfoOpen}
          handleClose={this._handleInfoClose}
          handleMoreInfoOnClick={handleMoreInfoOnClick}
          {...infoDetail}
          />
      </div>
    );
  }
}

export default withStyles(styles)(SystemNetworkControl);
