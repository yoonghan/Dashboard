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
import { DashboardConsumer } from "../../../../shared/Context";
import { THEMES_AVAILABLE, DashboardThemeModal } from "../../../../const/theme";
import {withDashboardContext, WithDashboardContext} from "../../../../hoc/withDashboardContext";

interface ThemeSectionProps extends WithDashboardContext {
  gridPadding: (boolean | "auto" | 2 | 1 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12),
  sectionStyle: string,
  elevation: number
}

interface ThemeSectionState {
  isOpen: boolean;
}

class ThemeSection extends React.Component<ThemeSectionProps, ThemeSectionState> {
  constructor(props:ThemeSectionProps) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  _toggleOpen = () => {
    this.setState(
      produce<ThemeSectionState>(draft => {
        draft.isOpen = !draft.isOpen;
      })
    );
  }

  _changeSelection = (changeTheme:((selectedTheme:string)=>void)) => (event:React.ChangeEvent<HTMLSelectElement>) => {
    const selection = event.target.value;
    this.setState(
      produce<ThemeSectionState>(draft => {
        changeTheme(selection);
      })
    );
  }

  _drawMenuOfThemes = () => {
    return Object.keys(THEMES_AVAILABLE).map((key, index:number) => (
      <MenuItem value={key} key={`ts_theme_${key}`}>{THEMES_AVAILABLE[key].label}</MenuItem>
    ));
  }

  render() {
    const {isOpen} = this.state;
    const {sectionStyle, gridPadding, elevation, theme, changeTheme} = this.props;

    return (
      <Grid item xs={gridPadding}>
        <Paper className={sectionStyle} elevation={elevation}>
          <Typography variant="h6" component="h6">
            Theme
          </Typography>
          <form autoComplete="off">
            <FormControl>
              <Select
                open={isOpen}
                onClose={this._toggleOpen}
                onOpen={this._toggleOpen}
                value={theme}
                onChange={this._changeSelection(changeTheme)}
              >
                {this._drawMenuOfThemes()}
              </Select>
              <FormHelperText>Select your preferred theme. Please note that this is not saved.</FormHelperText>
            </FormControl>
          </form>
        </Paper>
      </Grid>
    );
  }
}

export default withDashboardContext(ThemeSection);
