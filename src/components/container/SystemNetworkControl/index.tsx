`use strict`

import * as React from 'react';
import produce from "immer";
import AddIcon from '@material-ui/icons/Add';
import TableChartIcon from '@material-ui/icons/TableChart';
import ScatterPlotIcon from '@material-ui/icons/ScatterPlot';
import Button from '@material-ui/core/Button';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import {AutoSizer} from 'react-virtualized';
import SystemInTableView from './SystemInTableView';
import SystemNetwork from '../../SystemNetwork';
import {NodeInfoModal, NodeType, StatusType, NodeDataModal} from '../../SystemNetwork';
import SystemNetworkInfo from './SystemNetworkInfo';
import {SystemNetworkInfoInputModal} from './SystemNetworkInfo';
import SystemNetworkControlInput from './SystemNetworkControlInput';
//import {sampleLinkedNodes, sampleNodes} from '../../../samples/network';
import {convertNetworkDataIntoSystemNetwork} from "./networkLinkConverter";
import {NetworkDataModal} from "./modal";

const buttonPosition= 20;
const styles = (theme:Theme) => createStyles({
  root: {
    width: "100%",
    height: "calc(100vh - 64px)"
  },
  addButton: {
    right: buttonPosition + "px",
    bottom: buttonPosition + "px",
    position: 'fixed'
  },
  viewButton: {
    right: (buttonPosition * 4) + "px",
    bottom: buttonPosition + "px",
    position: 'fixed'
  }
});

export interface SystemNetworkControlModal {
  storeName: string;
  ipAddress: string;
  hostname: string;
  checkHostIp: boolean;
  eventFilter: number;
}

interface SystemNetworkControlProps extends WithStyles<typeof styles> {
  handleMoreInfoOnClick: () => void;
  networkData: NetworkDataModal;
}

interface SystemNetworkControlState {
  isTableView: boolean;
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
    this.state = {
      isTableView: true,
      counter: 0,
      isInputDialogOpen: false,
      isInfoOpen: false,
      infoDetail: {
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

  _onSubmitAddNetwork = (output:SystemNetworkControlModal) => {
    const storeName = "Store 01";
    if(this.systemNetworkRef.current === null || !this.systemNetworkRef.current) {
      return;
    }

    const component = this.systemNetworkRef.current.addNodes([
      {
        name: storeName,
        ipAddress: output.ipAddress,
        hostname: output.hostname,
        connectionStatus: StatusType.CONNECTED_AUTHENTICATED,
        nodeType: NodeType.MASTER,
        group: output.storeName
      },
      {
        name: `Child ${storeName}`,
        ipAddress: output.ipAddress,
        hostname: output.hostname,
        connectionStatus: StatusType.CONNECTED_AUTHENTICATED,
        nodeType: NodeType.GENERAL,
        group: output.storeName
      },
      {
        name: `Child ${storeName}`,
        ipAddress: output.ipAddress,
        hostname: output.hostname,
        connectionStatus: StatusType.CONNECTED_AUTHENTICATED,
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

  _onClickViewNetwork = () => {
    this.setState(
      produce<SystemNetworkControlState>(draft => {
        draft.isTableView = !draft.isTableView;
      })
    );
  }

  _onClickNode = (data: NodeInfoModal) => () => {
    this.setState(
      produce<SystemNetworkControlState>(draft => {
        draft.isInfoOpen = true;
        draft.infoDetail = {
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

  _renderTableView = () => {
    const {classes, networkData} = this.props;

    return (
      <React.Fragment>
        <SystemInTableView
          networkData={networkData}
          nodeClickCallback={this._onClickNode}/>
        <Button
          variant="fab"
          color="primary"
          aria-label="View"
          className={classes.viewButton}
          onClick={this._onClickViewNetwork}
          >
          <ScatterPlotIcon/>
        </Button>
      </React.Fragment>
    )
  }

  _renderGraphView = () => {
    const {classes, networkData} = this.props;
    const data = convertNetworkDataIntoSystemNetwork(networkData);

    return (
      <React.Fragment>
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
          color="primary"
          aria-label="View"
          className={classes.viewButton}
          onClick={this._onClickViewNetwork}
          >
          <TableChartIcon/>
        </Button>
      </React.Fragment>
    )
  }

  _renderDisplay = () => {
    const {classes} = this.props;
    const {isTableView} = this.state;

    if(isTableView) {
      return this._renderTableView();
    }
    else {
      return this._renderGraphView();
    }
  }

  render() {
    const {classes, handleMoreInfoOnClick} = this.props;
    const {isInputDialogOpen, isInfoOpen, infoDetail, isTableView} = this.state;

    return (
      <div className={classes.root}>
        { this._renderDisplay() }
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
