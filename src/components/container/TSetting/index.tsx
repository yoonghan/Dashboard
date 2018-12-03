`use strict`

import * as React from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ThemeSection from "./ThemeSection";

const styles = (theme:Theme) => createStyles({
  root: {
    width: "100%",
    margin: 0
  },
  section: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: `0 ${theme.spacing.unit * 2}px`
  }
});

interface TSettingProps extends WithStyles<typeof styles> {}

const TSetting: React.SFC<TSettingProps> = ({classes}) => (
  <Grid container spacing={24} className={classes.root}>
    <Grid item xs={12}>
      <Typography variant="h5" component="h5">
        Settings
        <Divider/>
      </Typography>
    </Grid>
    <ThemeSection gridPadding={12} sectionStyle={classes.section} elevation={1}/>
  </Grid>
)

export default withStyles(styles)(TSetting);
