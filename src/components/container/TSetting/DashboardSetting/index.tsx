`use strict`

import * as React from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ThemeSection from "./ThemeSection";
import DisplaySection from "./DisplaySection";
import LanguageSection from "./LanguageSection";

const styles = (theme:Theme) => createStyles({
  root: {
  },
  section: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: `0 ${theme.spacing.unit * 2}px`
  }
});

interface DashboardSettingProps extends WithStyles<typeof styles> {}

const DashboardSetting: React.SFC<DashboardSettingProps> = ({classes}) => (
  <React.Fragment>
    <ThemeSection gridPadding={12} sectionStyle={classes.section} elevation={1}/>
    <DisplaySection gridPadding={12} sectionStyle={classes.section} elevation={1}/>
    <LanguageSection gridPadding={12} sectionStyle={classes.section} elevation={1}/>
  </React.Fragment>
)

export default withStyles(styles)(DashboardSetting);
