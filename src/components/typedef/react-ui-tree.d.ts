declare module "react-ui-tree" {

  export interface TreeChildLeafModal {
    module: string;
    leaf: boolean;
    key: string;
  }

  export interface TreeChildBranchModal {
    module: string;
    collapsed?: boolean;
    children: Array<TreeChildBranchModal|TreeChildLeafModal>;
  }

  export interface TreeModal {
    module: string;
    children: Array<TreeChildBranchModal|TreeChildLeafModal>;
  }

  export interface TreeProps {
    paddingLeft: number;
    tree: TreeModal;
    onChange: (updatedTree:TreeModal) => void;
    isNodeCollapsed: boolean;
    renderNode: (treeNode:TreeModal|TreeChildBranchModal|TreeChildLeafModal) => JSX.Element;
  }

  class Tree extends React.Component<TreeProps, {}> {
  }

  export default Tree;
}
