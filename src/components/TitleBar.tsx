`use strict`

import * as React from 'react';
import { compose } from 'redux';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { withRouter, RouteComponentProps } from "react-router-dom";

const styles = (theme:Theme) => createStyles({
  root: {
    position: "relative",
    width: "100%",
    padding: theme.spacing.unit * 2
  },
  closeBtn: {
    position: "absolute",
    width: "100%",
    textAlign: "right",
    cursor: "pointer",
    padding: theme.spacing.unit * 2,
    left: 0,
    top: "5px"
  },
  divider: {
    marginTop: "5px"
  }
});

interface TitleBarProps {
  title: string;
  canClose?: boolean;
}
interface TitleBarPropsWithHoc extends TitleBarProps, WithStyles<typeof styles>, RouteComponentProps<any> {}

const TitleBar: React.SFC<TitleBarPropsWithHoc> = ({title, canClose, history, classes}) => {
  function onClickClose() {
    if(history.length > 1){
      history.goBack();
    }
  }

  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h5">
        {title}
      </Typography>
      {canClose &&
        (<div className={classes.closeBtn}>
          <CloseIcon onClick={onClickClose}/>
        </div>)
      }
      <Divider className={classes.divider}/>
    </div>
  );
}

const enhance = compose<React.SFC<TitleBarProps>>(
  withRouter,
  withStyles(styles)
);

export default enhance(TitleBar);
