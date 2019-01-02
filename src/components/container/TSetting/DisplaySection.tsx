`use strict`

import * as React from 'react';
import produce from "immer";
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { DashboardConsumer } from "../../../shared/Context";
import {withDashboardContext, WithDashboardContext} from "../../../hoc/withDashboardContext";

interface DisplaySectionProps extends WithDashboardContext {
  gridPadding: (boolean | "auto" | 2 | 1 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12),
  sectionStyle: string,
  elevation: number
}

interface DisplaySectionState {
  isOpen: boolean;
}

class DisplaySection extends React.Component<DisplaySectionProps, DisplaySectionState> {
  constructor(props:DisplaySectionProps) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  _toggleOpen = () => {
    this.setState(
      produce<DisplaySectionState>(draft => {
        draft.isOpen = !draft.isOpen;
      })
    );
  }

  _changeSelection = (changeCompact:((isCompact:boolean)=>void)) => (event:React.ChangeEvent<HTMLSelectElement>) => {
    const selection = event.target.value;
    this.setState(
      produce<DisplaySectionState>(draft => {
        changeCompact(selection==="true"? true: false);
      })
    );
  }

  render() {
    const {isOpen} = this.state;
    const {sectionStyle, gridPadding, elevation, isCompact, changeCompact} = this.props;

    return (
      <Grid item xs={gridPadding}>
        <Paper className={sectionStyle} elevation={elevation}>
          <Typography variant="h6" component="h6">
            Compact Display
          </Typography>
          <form autoComplete="off">
            <FormControl>
              <Select
                open={isOpen}
                onClose={this._toggleOpen}
                onOpen={this._toggleOpen}
                value={isCompact?"true":"false"}
                onChange={this._changeSelection(changeCompact)}
              >
                <MenuItem value={"true"}>Compact</MenuItem>
                <MenuItem value={"false"}>Non Compact</MenuItem>
              </Select>
              <FormHelperText>Compact display allows more data displayed.</FormHelperText>
            </FormControl>
          </form>
        </Paper>
      </Grid>
    );
  }
}

export default withDashboardContext(DisplaySection);
