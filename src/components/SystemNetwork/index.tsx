`use strict`

import * as React from 'react';
import * as d3 from 'd3';
import {Simulation} from 'd3';
import {SimulationNodeDatum, SimulationLinkDatum} from 'd3-force';
import {getTranslator, Language, LocaleDefinition} from "../../const/i18n";
import SystemNetworkLegend from './SystemNetworkLegend';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import red from '@material-ui/core/colors/red';

/**
* Fully envision with pure d3 js
**/

export enum NodeType {
  MASTER,
  GENERAL
}

export enum StatusType {
  CONNECTED_UNAUTHENTICATED,
  CONNECTED_AUTHENTICATED,
  DISCONNECTED
}

export interface NodeInfoModal {
  name: string;
  ipAddress: string;
  hostname: string;
  nodeType: NodeType;
  connectionStatus: StatusType;
  group: string;
}

export interface NodeDataModal {
  nodes: Array<NodeInfoModal>;
  links: Array<SimulationLinkDatum<SimulationNodeDatum>>;
}

export interface SystemNetworkProps {
  width: number;
  height: number;
  initData: NodeDataModal;
  language: string;
  nodeClickCallback: (nodeInfo: NodeInfoModal) => () => void;
}

class SystemNetwork extends React.Component<SystemNetworkProps, {}> {
  private networkRef = React.createRef<SVGSVGElement>();
  private PARENT_SIZE = 10;
  private CHILD_SIZE = this.PARENT_SIZE / 2;
  private translate:LocaleDefinition;
  private data:NodeDataModal;
  private force:Simulation<any, any> = null;
  private LINE_DISTANCE = this.PARENT_SIZE * 2;
  private ALPHA_MIN = 0.01;
  private zoomWidth:number = 100;
  private zoomHeight:number = 100;

  constructor(props: SystemNetworkProps) {
    super(props);
    this.data = this._remapObject(props.initData);
    this.translate = getTranslator(props.language);
    this.zoomWidth = props.width;
    this.zoomHeight = props.height;
  }

  componentDidMount() {
    this._initForce();
    this._drawNodes();
  }

  //Cannot be update!!
  shouldComponentUpdate() {
    return false;
  }

  _zoomIn = () => {
    const svg = d3.select(this.networkRef.current);
    this.zoomWidth -= 10;
    this.zoomHeight -= 10;
    svg.attr("viewBox", `0 0 ${this.zoomWidth} ${this.zoomHeight}`);
  }

  _zoomOut = () => {
    const svg = d3.select(this.networkRef.current);
    this.zoomWidth += 10;
    this.zoomHeight += 10;
    svg.attr("viewBox", `0 0 ${this.zoomWidth} ${this.zoomHeight}`);
  }

  addNodes(newConnections: Array<NodeInfoModal>) {
    const {links, nodes} = this.data;
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

    this._drawNodes();
  }

  _toggleShowMaster = (show: boolean) => {
    const svg = d3.select(this.networkRef.current);
    if(show) {
      const selectAll = svg.selectAll("circle.master");
      const state = selectAll.attr('class');
      const newState = state.replace(" hide","");
      selectAll.attr('class', `${newState}`);
    }
    else {
      const selectAll = svg.selectAll("circle.master");
      const state = selectAll.attr('class');
      selectAll.attr('class', `${state} hide`);
    }
  }

  _toggleShowAgent = (show: boolean) => {
    const svg = d3.select(this.networkRef.current);
    if(show) {
      const selectAll = svg.selectAll("circle.agent");
      const state = selectAll.attr('class');
      const newState = state.replace(" hide","");
      selectAll.attr('class', `${newState}`);
    }
    else {
      const selectAll = svg.selectAll("circle.agent");
      const state = selectAll.attr('class');
      selectAll.attr('class', `${state} hide`);
    }
  }

  _remapObject = (data: NodeDataModal) => {
    const links = data.links;
    const nodes = data.nodes;

    const newNodes = nodes.map((obj:NodeInfoModal, idx: number) => {
      return {
        name: obj.name,
        ipAddress: obj.ipAddress,
        hostname: obj.hostname,
        connectionStatus: obj.connectionStatus,
        nodeType: obj.nodeType,
        group: obj.group
      }
    });

    const newLinks = links.map((obj:any, idx: number) => {
      return {
        source: obj.source,
        target: obj.target
      }
    });

    return {
      links: newLinks,
      nodes: newNodes
    }
  }

  _initForce = () => {
    const {width, height} = this.props;
    const {PARENT_SIZE, CHILD_SIZE, ALPHA_MIN} = this;
    const svg = d3.select(this.networkRef.current);
    const expWidth = (width - PARENT_SIZE);
    const expHeight = (height - PARENT_SIZE);

    this.force = d3
      .forceSimulation()
      .alphaMin(ALPHA_MIN)
      .force('charge', d3.forceManyBody().strength(-20))
      .force('center', d3.forceCenter(width / 2, height / 2));

    this.force.on('tick', () => {
      svg
        .selectAll('line')
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);
      svg
        .selectAll('circle')
        .attr('cx', (d: any) => {
          if(d.x > expWidth) {
            return expWidth;
          }
          if(d.x < 0) {
            return 0;
          }

          return d.x;
        })
        .attr('cy', (d: any) => {
          if(d.y > expHeight) {
            return expHeight;
          }
          if(d.y < 0) {
            return 0;
          }

          return d.y;
        });
      svg
        .selectAll('g>text')
        .attr('dx', (d: any) => {
          return d.x;
        })
        .attr('dy', (d: any) => {
          return d.y;
        });
    });
  }

  _drawNodes = () => {
    const {width, height} = this.props;
    const {PARENT_SIZE, CHILD_SIZE} = this;
    const {nodes, links}= this._remapObject(this.data);

    this.force
      .nodes(nodes)
      .force('link', d3.forceLink(links).distance(this.LINE_DISTANCE));

    const svg = d3.select(this.networkRef.current);
//    svg.select("*").remove();

    svg
      .selectAll('line')
      .data(links)
      .enter()
      .append('line');

    //Append Node
    const circleNode = svg
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append<SVGCircleElement>('circle')
      .attr('r', this._displayRadius)
      .attr('class', this._displayClass)
      .call(
        d3
          .drag()
          .on('start', this._nodeDragStarted(this.force))
          .on('drag', this._nodeDragged)
          .on('end', this._nodeDragEnded(this.force)),
      )
      .on("click", this.props.nodeClickCallback(
          {
            name: "Store 01",
            ipAddress: "201.200.200.200",
            hostname: "",
            nodeType: NodeType.MASTER,
            connectionStatus: StatusType.CONNECTED_AUTHENTICATED,
            group: `1`,
          }
      ));
    //Append title
    circleNode.append<SVGTitleElement>('title').append<SVGTSpanElement>('tspan').text(this._renderTitle);
    //
    // //Append Node
    svg
      .selectAll('g>text')
      .data(nodes)
      .enter()
      .append('g')
      .append<SVGTextElement>('text')
      .attr("x", PARENT_SIZE)
      .text(this._displayLabel)
      .call(
        d3
          .drag()
          .on('start', this._nodeDragStarted(this.force))
          .on('drag', this._nodeDragged)
          .on('end', this._nodeDragEnded(this.force)),
      )

    this.force.alpha(1).restart();
  }

  _displayNodeColor = (data:NodeInfoModal) => {
    const connStatus = data.connectionStatus;
    switch(connStatus) {
      case StatusType.CONNECTED_AUTHENTICATED:
      return "connSuccess";
      case StatusType.CONNECTED_UNAUTHENTICATED:
      return "connWarning";
      case StatusType.DISCONNECTED:
      return "connError";
      default:
      return "";
    }
  }

  _displayClass = (data:NodeInfoModal) => {


    switch(data.nodeType) {
      case NodeType.MASTER:
        return "master newNode " + this._displayNodeColor(data);
      default:
        return "agent " + this._displayNodeColor(data);
    }
  }

  _renderTitle = (data:NodeInfoModal) => {
    const {translate} = this;
    return (`${translate.storeName}: ${data.name}\n${translate.hostname}: ${data.hostname}\n${translate.ipAddress}: ${data.ipAddress}`);
  }

  _displayLabel = (data:NodeInfoModal) => {
    switch(data.nodeType) {
      case NodeType.MASTER:
        return data.name;
      default:
        return "";
    }
  }

  _displayRadius = (data:NodeInfoModal) => {
    switch(data.nodeType) {
      case NodeType.MASTER:
        return this.PARENT_SIZE;
      default:
        return this.CHILD_SIZE;
    }
  }

  _nodeDragStarted = (force:any) => (d:SimulationNodeDatum) => {
    !d3.event.active && force.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  _nodeDragged = (d:SimulationNodeDatum) => {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  _nodeDragEnded = (force:any) => (d:SimulationNodeDatum) => {
    !d3.event.active && force.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  render() {
    const {width, height} = this.props;
    return (
      <React.Fragment>
        <svg width={width} height={height} ref={this.networkRef} viewBox={`0 0 ${this.zoomWidth} ${this.zoomHeight}`} className={"wc-system-network"}>
          <style jsx>
          {`
            .wc-system-network :global(circle.connSuccess) {
              fill: ${green[700]};
            },
            .wc-system-network :global(circle.connWarning) {
              fill: ${amber[700]};
            },
            .wc-system-network :global(circle.connError) {
              fill: ${red[700]};
            }

            .wc-system-network {
              color: green;
            }

            .wc-system-network :global(line) {
              stroke: #999999;
              stroke-opacity: 0.6;
              stroke-width: 1;
            }

            .wc-system-network :global(line.hide) {
              display: none;
            }

            .wc-system-network :global(circle) {
              //fill: rgb(31, 119, 180);
            }

            .wc-system-network :global(circle:hover) {
              cursor: pointer;
            }

            .wc-system-network :global(circle.master) {
              stroke: #FFFFFF;
              stroke-width: 1.5;
            }

            .wc-system-network :global(circle.master.newNode) {
              animation: a-blinker 5s linear;
            }

            .wc-system-network :global(circle.agent) {
              stroke: #FFFFFF;
              stroke-width: 1.5;
            }

            .wc-system-network :global(circle.master.hide) {
              animation: a-hider 0.3s linear;
              opacity: 0;
            }

            .wc-system-network :global(circle.agent.hide) {
              animation: a-hider 0.3s linear;
              opacity: 0;
            }

            @keyframes a-blinker {
              10% {
                fill: #333333;
              }
            }

            @keyframes a-hider {
              0% {
                opacity: 1
              }
            }
          `}
          </style>
        </svg>
        <SystemNetworkLegend
          initShowStore = {true}
          initShowAgent = {true}
          toggleStore = {this._toggleShowMaster}
          toggleAgent = {this._toggleShowAgent}
          zoomIn = {this._zoomIn}
          zoomOut = {this._zoomOut}
        />
      </React.Fragment>
    );
  }
}

export default SystemNetwork;
