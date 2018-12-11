`use strict`

/**
 * Helper method provided for users to group buttons into it's designated designed.
 **/

import * as React from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

const styles = (theme:Theme) => createStyles({
  root: {
    display: "flex",
    flexDirection: 'row',
    '& button': {
      marginRight: theme.spacing.unit,
      [theme.breakpoints.down('sm')]: {
        marginRight: 0,
        marginBottom: theme.spacing.unit
      },
      '&:last-child': {
        marginRight: 0
      }
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    }
  }
});

interface ButtonGroupProps extends WithStyles<typeof styles>{}

const ButtonGroup: React.SFC<ButtonGroupProps> = ({classes, children}) => {
  return (
    <div className={classes.root}>
      {children}
    </div>
  );
}


export default withStyles(styles)(ButtonGroup);
