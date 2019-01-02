`use strict`

import * as React from 'react';
import { compose } from 'redux';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

export enum EnumTitleType {
  DEFAULT,
  EXPANSION
};

const styles = (theme:Theme) => createStyles({
  default: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.black,
    padding: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  text: {
    textTransform: "uppercase",
    fontWeight: 500
  },
  expansion: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.black,
    padding: theme.spacing.unit * 2,
    width: "100%"
  }
});

interface PanelTitleBarProps extends WithStyles<typeof styles> {
  titleType?: EnumTitleType;
}

const PanelTitleBar: React.SFC<PanelTitleBarProps> = ({classes, children, titleType}) => {
  function getDefinedTitleType() {
    switch(titleType) {
      case EnumTitleType.EXPANSION:
        return classes.expansion;
      default:
        return classes.default;
    }
  }

  if(typeof children === "string") {
    return (
      <div className={getDefinedTitleType()}>
        <Typography color={"inherit"} variant={"subtitle1"} className={classes.text}>
          {children}
        </Typography>
      </div>
    )
  }
  else {
    return (
      <div className={getDefinedTitleType()}>
        {children}
      </div>
    );
  }
}

export default withStyles(styles)(PanelTitleBar);
