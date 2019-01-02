`use strict`

/**
 * Creates a helper Panel to list all children in an orderly manner.
 **/

import * as React from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = (theme:Theme) => createStyles({
  root: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    padding: `${theme.spacing.unit * 2}px 0`,
    "& > div, > span": {
      padding:`${theme.spacing.unit * 2}px`
    }
  },
  rightDivider: {
   borderLeft: `2px solid ${theme.palette.divider}`,
   padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
   display: "flex",
   flexDirection: "row",
   "& > *": {
     marginRight: `${theme.spacing.unit * 2}px`
   }
 }
});

interface HelperPanelProps extends WithStyles<typeof styles> {
  instructionTitle: string;
}

const HelperPanel: React.SFC<HelperPanelProps> = ({instructionTitle, classes, children}) => {
  return (
    <Paper  className={classes.root} elevation={1}>
      <Typography variant="caption">
        {instructionTitle}
      </Typography>
      <div className={classes.rightDivider}>
        {children}
      </div>
    </Paper >
  );
}

export default withStyles(styles)(HelperPanel);
