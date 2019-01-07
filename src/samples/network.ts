import {NodeInfoModal, NodeType} from "../components/SystemNetwork";

export const sampleNodes:Array<NodeInfoModal> = [];
export const sampleLinkedNodes:Array<any> = [];

for(let i = 0; i < 40; i+=10) {
  sampleNodes.push(
    { name: `Node ${i}`, ipAddress: `192.168.${i}`, hostname: `Host${i}`, nodeType: NodeType.MASTER, group: `${i}` }
  );
  sampleNodes.push(
    { name: `ChildNode ${i}`, ipAddress: `192.168.${i}`, hostname: `Host${i}`, nodeType: NodeType.GENERAL, group: `${i}` }
  );
  sampleNodes.push(
    { name: `ChildNode ${i}`, ipAddress: `192.168.${i}`, hostname: `Host${i}`, nodeType: NodeType.GENERAL, group: `${i}` }
  );
  sampleNodes.push(
    { name: `ChildNode ${i}`, ipAddress: `192.168.${i}`, hostname: `Host${i}`, nodeType: NodeType.GENERAL, group: `${i}` }
  );
  sampleNodes.push(
    { name: `ChildNode ${i}`, ipAddress: `192.168.${i}`, hostname: `Host${i}`, nodeType: NodeType.GENERAL, group: `${i}` }
  );
  sampleNodes.push(
    { name: `ChildNode ${i}`, ipAddress: `192.168.${i}`, hostname: `Host${i}`, nodeType: NodeType.GENERAL, group: `${i}` }
  );
  sampleNodes.push(
    { name: `ChildNode ${i}`, ipAddress: `192.168.${i}`, hostname: `Host${i}`, nodeType: NodeType.GENERAL, group: `${i}` }
  );
  sampleNodes.push(
    { name: `ChildNode ${i}`, ipAddress: `192.168.${i}`, hostname: `Host${i}`, nodeType: NodeType.GENERAL, group: `${i}` }
  );
  sampleNodes.push(
    { name: `ChildNode ${i}`, ipAddress: `192.168.${i}`, hostname: `Host${i}`, nodeType: NodeType.GENERAL, group: `${i}` }
  );
  sampleNodes.push(
    { name: `ChildNode ${i}`, ipAddress: `192.168.${i}`, hostname: `Host${i}`, nodeType: NodeType.GENERAL, group: `${i}` }
  );
  sampleLinkedNodes.push(
    { source: i+1, target: i }
  );
  sampleLinkedNodes.push(
    { source: i+2, target: i }
  );
  sampleLinkedNodes.push(
    { source: i+3, target: i }
  );
  sampleLinkedNodes.push(
    { source: i+4, target: i }
  );
  sampleLinkedNodes.push(
    { source: i+5, target: i }
  );
  sampleLinkedNodes.push(
    { source: i+6, target: i }
  );
  sampleLinkedNodes.push(
    { source: i+7, target: i }
  );
  sampleLinkedNodes.push(
    { source: i+8, target: i }
  );
  sampleLinkedNodes.push(
    { source: i+9, target: i }
  );
}
