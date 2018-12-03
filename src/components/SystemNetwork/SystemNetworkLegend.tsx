`use strict`

import * as React from 'react';
import produce from "immer";
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

enum ShowType {
  STORES = "stores",
  AGENTS = "agents"
}

const styles = (theme:Theme) => createStyles({
  root: {
    position: 'absolute',
    bottom: 0,
    left: '20px'
  }
});

interface SystemNetworkLegendProps extends WithStyles<typeof styles> {
  initShowStore: boolean;
  initShowAgent: boolean;
  toggleStore: (state: boolean) => void;
  toggleAgent: (state:boolean) => void;
  zoomIn: () => void;
  zoomOut: () => void;
}

interface SystemNetworkLegendState {
  showStore: boolean;
  showAgent: boolean;
}

class SystemNetworkLegend extends React.PureComponent<SystemNetworkLegendProps, SystemNetworkLegendState> {
  constructor(props:SystemNetworkLegendProps) {
    super(props);
    this.state = {
      showStore: props.initShowStore,
      showAgent: props.initShowAgent
    }
  }

  _unExpand = () => {
    this.props.zoomOut();
  }

  _expand = () => {
    this.props.zoomIn();
  }

  _toggleShow = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {toggleStore, toggleAgent} = this.props;
    const {name, checked} = event.target;

    this.setState(
      produce<SystemNetworkLegendState>(draft => {
        switch(name) {
          case ShowType.STORES:
            draft.showStore = !draft.showStore;
            toggleStore(draft.showStore);
            break;
          case ShowType.AGENTS:
            draft.showAgent = !draft.showAgent;
            toggleAgent(draft.showAgent);
            break;
        }
      })
    );
  }

  render () {
    const {classes} = this.props;
    const {showStore, showAgent} = this.state;

    return (
      <FormControl component="fieldset" className={classes.root}>
        <FormLabel component="legend">Legend:</FormLabel>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={showStore}
                name={ShowType.STORES}
                onChange={this._toggleShow}
              />
            }
            label="Stores"
          />
          <FormControlLabel
            control={
              <Switch
                checked={showAgent}
                name={ShowType.AGENTS}
                onChange={this._toggleShow}
              />
            }
            label="Agents"
          />
          <FormControlLabel
            control={
              <Button onClick={this._unExpand} color="secondary">
                -
              </Button>
            }
            label="Zoom Out"
          />
          <FormControlLabel
            control={
              <Button onClick={this._expand} color="secondary">
                +
              </Button>
            }
            label="Zoom In"
          />
        </FormGroup>
      </FormControl>
    );
  }
}

export default withStyles(styles)(SystemNetworkLegend);
