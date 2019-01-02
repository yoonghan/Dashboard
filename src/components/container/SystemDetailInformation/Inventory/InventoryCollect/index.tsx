`use strict`

import * as React from 'react';
import produce from "immer";
import Collect from "./Collect";
import Process from "./Process";
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

const styles = (theme:Theme) => createStyles({
  root: {
  }
});

interface InventoryCollectState {
  isCollecting: boolean;
  collectionDate: Date;
}

interface InventoryCollectProps extends WithStyles<typeof styles> {

}

class InventoryCollect extends React.Component<InventoryCollectProps, InventoryCollectState> {
  constructor(props:InventoryCollectProps) {
    super(props);
    this.state = {
      isCollecting: false,
      collectionDate: null
    }
  }

  _handleCollect = (date:Date) => {
    this.setState(
      produce<InventoryCollectState>(draft => {
        draft.isCollecting = true;
        draft.collectionDate = date;
      })
    );
  }

  _handleCancelProcess = () => {
    this.setState(
      produce<InventoryCollectState>(draft => {
        draft.isCollecting = false;
      })
    );
  }

  render() {
    const {isCollecting, collectionDate} = this.state;

    return (
      <React.Fragment>
        {!isCollecting &&
          <Collect callbackCollectClick={this._handleCollect}/>
        }
        {isCollecting &&
          <Process callbackProcessCancelClick={this._handleCancelProcess} collectionDate={collectionDate}/>
        }
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(InventoryCollect);
