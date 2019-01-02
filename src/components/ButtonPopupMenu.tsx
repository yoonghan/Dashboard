`use strict`

import * as React from 'react';
import produce from "immer";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

interface OptionModal {
  label: string,
  handleClick: () => void
}

interface PopupMenuProps {
  id: string;
  btnLabel: string,
  options: Array<OptionModal>;
}

interface PopupMenuState {
  anchorEl: HTMLElement;
}

class PopupMenu extends React.Component<PopupMenuProps, PopupMenuState> {
  constructor(props:PopupMenuProps) {
    super(props);
    this.state = {
      anchorEl: null
    }
  }

  _handleClick = (event: React.MouseEvent<any>) => {
    const target = event.currentTarget;
    this.setState(
      produce<PopupMenuState>(draft => {
        draft.anchorEl = target;
      })
    );
  }

  _handleClose = (optionClickEvent:() => void) => () => {
    this.setState(
      produce<PopupMenuState>(draft => {
        draft.anchorEl = null;

        if(optionClickEvent != null) {
          optionClickEvent();
        }
      })
    );
  };

  render() {
    const {anchorEl} = this.state;
    const {id, btnLabel, options} = this.props;

    return (
      <React.Fragment>
        <Button variant="contained" onClick={this._handleClick} id={id}>
          {btnLabel}
        </Button>
        <Menu
          id={id}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this._handleClose(null)}
          PaperProps={{
              style: {
                maxHeight: 300,
                width: 200,
                marginLeft: '20px'
              },
            }}
        >
          {options.map((option:OptionModal, idx:number) => (
            <MenuItem key={`${option.label}_${idx}`} onClick={this._handleClose(option.handleClick)}>
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      </React.Fragment>
    );
  }
}

export default PopupMenu;
