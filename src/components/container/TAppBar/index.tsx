`use strict`

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationBadge from './NotificationBadge';
import AlertBadge from './AlertBadge';
import WarningBadge from './WarningBadge';
import SearchField from "./SearchField";
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Route, Link, Switch } from "react-router-dom";
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

const styles = (theme:Theme) => createStyles({
  title: {
    width: 300
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    "& button": {
      marginRight: "2px"
    }
  },
  iconBtn: {
    background: fade(theme.palette.common.white, 0.8)
  },
  link: {
    textDecoration: "unset",
    color: theme.palette.common.white
  }
});

//ComposedRoute
// interface TAppBarProps {
//   onClickSetting : () => void,
//   onClickNotification : () => void,
//   onClickMail: () => void
// }

//ComposedRoute
//interface TAppBarComposedProps extends TAppBarProps, WithStyles<typeof styles>, RouteComponentProps<any> {}

interface TAppBarProps extends WithStyles<typeof styles> {
  onClickSetting : () => void,
  onClickNotification : () => void,
  onClickAlert: () => void,
  onClickWarning: () => void
}

//ComposedRoute
//const TAppBar: React.SFC<TAppBarComposedProps> = ({ classes, onClickSetting, onClickNotification, onClickMail }) => {
const TAppBar: React.SFC<TAppBarProps> = ({ classes, onClickSetting, onClickNotification, onClickAlert, onClickWarning }) => {
  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography className={classes.title} variant="h5" color="inherit" noWrap>
          <Link to={'/'} className={classes.link}>
            Dashboard v0.1
          </Link>
        </Typography>
        <SearchField/>
        <IconButton color="inherit" onClick={onClickAlert}>
          <AlertBadge count={1}/>
        </IconButton>
        <IconButton color="inherit" onClick={onClickWarning}>
          <WarningBadge count={13}/>
        </IconButton>
        <IconButton color="inherit" onClick={onClickNotification}>
          <NotificationBadge count={12}/>
        </IconButton>
        <IconButton color="inherit" onClick={onClickSetting}>
          <SettingsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

// ComposedRoute
// const enhance = compose<React.SFC<TAppBarProps>>(
//   withRouter,
//   withStyles(styles)
// );
// export default enhance(TAppBar);

export default withStyles(styles)(TAppBar);
