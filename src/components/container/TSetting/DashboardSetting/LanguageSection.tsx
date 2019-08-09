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
import {withDashboardContext, WithDashboardContext} from "../../../../hoc/withDashboardContext";

interface LanguageSectionProps extends WithDashboardContext {
  gridPadding: (boolean | "auto" | 2 | 1 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12),
  sectionStyle: string,
  elevation: number
}

interface LanguageSectionState {
  isOpen: boolean;
}

class LanguageSection extends React.Component<LanguageSectionProps, LanguageSectionState> {
  constructor(props:LanguageSectionProps) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  _toggleOpen = () => {
    this.setState(
      produce<LanguageSectionState>(draft => {
        draft.isOpen = !draft.isOpen;
      })
    );
  }

  _changeSelection = () => (event:React.ChangeEvent<HTMLSelectElement>) => {
    const selection = event.target.value;
    alert("Not implemented");
  }

  render() {
    const {isOpen} = this.state;
    const {sectionStyle, gridPadding, elevation} = this.props;

    return (
      <Grid item xs={gridPadding}>
        <Paper className={sectionStyle} elevation={elevation}>
          <Typography variant="h6" component="h6">
            Language Display
          </Typography>
          <form autoComplete="off">
            <FormControl>
              <Select
                open={isOpen}
                onClose={this._toggleOpen}
                onOpen={this._toggleOpen}
                value={"English"}
                onChange={this._changeSelection()}
              >
                <MenuItem value={"ENG"}>English</MenuItem>
                <MenuItem value={"GER"}>Deutsch</MenuItem>
              </Select>
              <FormHelperText>Change Language.</FormHelperText>
            </FormControl>
          </form>
        </Paper>
      </Grid>
    );
  }
}

export default withDashboardContext(LanguageSection);
