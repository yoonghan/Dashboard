`use strict`

import * as React from 'react';
import produce from "immer";
import Tree from 'react-ui-tree';
import Typography from '@material-ui/core/Typography';
import {TreeModal, TreeChildBranchModal, TreeChildLeafModal} from 'react-ui-tree';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

/**
 * Draggable and collapsable.
 **/

const styles = (theme:Theme) => createStyles({
  root: {
    overflow: "auto",
    "user-select": "none",
    "& .inner": {
      display: "inline"
    },
    "& .collapse.caret-down::before": {
      content: '"\\25BE"',
      cursor: "pointer"
    },
    "& .collapse.caret-right::before": {
      content: '"\\25B8"',
      cursor: "pointer"
    },
    "& .inner>span:first-child": {
      cursor: "pointer",
      color: theme.palette.primary.main
    },
    "& .m-draggable .inner>span": {
      fontStyle: "italic",
      color: `${theme.palette.secondary.main} !important`
    },
    "& .m-node.placeholder .inner>span": {
      color: `${theme.palette.secondary.dark} !important`
    }
  },
  label: {
    display: "inline",
    whiteSpace: "nowrap"
  },
  active: {
    fontWeight: "bold",
    cursor: "default",
    color: `${theme.palette.primary.dark} !important`
  },
  inactive: {
  }
});

interface TreeStructureState {
  isActive: object|TreeModal;
  currentTreeStructure: TreeModal;
}

interface TreeStructureProps extends WithStyles<typeof styles>{
  activeNode?: TreeModal|TreeChildBranchModal|TreeChildLeafModal;
  treeObject: TreeModal;
  isNodeCollapsed: boolean;
  callbackOnNodeClick: (key:string) => void;
}

class TreeStructure extends React.Component<TreeStructureProps, TreeStructureState> {
  constructor(props:TreeStructureProps) {
    super(props);
    this.state = {
      isActive: props.activeNode || {},
      currentTreeStructure: props.treeObject
    }
  }

  handleChange = (updatedTree:TreeModal) => {
    this.setState(
      produce<TreeStructureState>(draft => {
        draft.currentTreeStructure = updatedTree;
      })
    );
  }

  onClickNode = (treeNode:TreeModal|TreeChildBranchModal|TreeChildLeafModal) => () =>{
    this.setState({
      isActive: treeNode
    });

    if((treeNode as TreeChildLeafModal).leaf) {
      const {callbackOnNodeClick} = this.props;
      const leafEvent = (treeNode as TreeChildLeafModal);
      callbackOnNodeClick(leafEvent.key);
    }
  }

  renderNode = (treeNode:TreeModal|TreeChildBranchModal|TreeChildLeafModal) => {
    const {classes} = this.props;
    let clickEvent = this.onClickNode(treeNode);

    return(
      <Typography
        component={"span"}
        className={
          classes.label + " " +
          (treeNode === this.state.isActive? classes.active : classes.inactive)
        }
        onClick={clickEvent}
        onMouseDown={(event:React.MouseEvent<any>)=>{event.stopPropagation()}}
        >
        {treeNode.module}
      </Typography>
    )
  }

  render() {
    const {treeObject, classes, isNodeCollapsed} = this.props;
    const {currentTreeStructure} = this.state;

    return (
      <div className={classes.root}>
        <Tree
          paddingLeft={20}
          tree={currentTreeStructure}
          onChange={this.handleChange}
          isNodeCollapsed={isNodeCollapsed}
          renderNode={this.renderNode}
        />
      </div>
    );
  }
}


export default withStyles(styles)(TreeStructure);
