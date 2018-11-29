import *as React from 'react';
import { storiesOf } from '@storybook/react';
import TextField from '@material-ui/core/TextField';
import SystemNetwork from '../src/components/SystemNetwork';
import SystemNetworkControl from '../src/components/container/SystemNetworkControl';
import SystemNetworkInfo from '../src/components/container/SystemNetworkControl/SystemNetworkInfo';
import SystemNetworkControlInput from '../src/components/container/SystemNetworkControl/SystemNetworkControlInput';
import {SystemNetworkControlInputModal} from '../src/components/container/SystemNetworkControl/SystemNetworkControlInput';
import {NodeType, NodeInfoModal} from '../src/components/SystemNetwork';
import {MuiThemeProvider} from '@material-ui/core/styles';
import withTheme from '../src/hoc/withTheme';

const listOfNodes:Array<NodeInfoModal> = [];
const listOfLinks:Array<any> = [];
for(let i = 0; i < 1000; i+=3) {
  listOfNodes.push(
    { name: `Node ${i}`, ipAddress: `192.168.${i}`, hostname: `Host${i}`, nodeType: NodeType.MASTER, group: `${i}` }
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
}

const networkData = {
  width: 400,
  height: 400,
  language: "EN",
  initData: {
    nodes: listOfNodes,
    links: listOfLinks
  }
};

const SystemNetworkInfoWithTheme = withTheme(SystemNetworkInfo);
const SystemNetworkControlInputWithTheme = withTheme(SystemNetworkControlInput);
const SystemNetworkControlWithTheme = withTheme(SystemNetworkControl);
const SystemNetworkWithTheme = withTheme(SystemNetwork);

storiesOf('Chart', module)
  .add('Chained Network', () => (
    <SystemNetworkWithTheme {...networkData} nodeClickCallback={(data:NodeInfoModal)=>{console.log(data)}}/>
  ))
  .add('Controlled Chained Network', () => (
    <SystemNetworkControlWithTheme/>
  ))
  .add('Network Input', () => (
    <SystemNetworkControlInputWithTheme
      openDialog={true}
      onSubmit={(output:SystemNetworkControlInputModal) => {console.log(`${output.storeName} ${output.ipAddress} ${output.hostname}`)}}
      handleClose={()=>{alert("Consider close")}}
      />
  ))
  .add('Network Info', () => (
    <SystemNetworkInfoWithTheme
      storeName={"Store Info"}
      ipAddress={"192.168.  1.  2"}
      hostname={"Hostname"}
      openSideBar={true}
      handleClose={()=>{alert("Consider Close")}}
      />
  ))
  ;
