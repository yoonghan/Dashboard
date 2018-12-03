`use strict`

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationBadge from './NotificationBadge';
import MailBadge from './MailBadge';
import SearchField from "./SearchField";
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

const styles = (theme:Theme) => createStyles({
  title: {
    width: 300
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
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
  onClickMail: () => void
}

//ComposedRoute
//const TAppBar: React.SFC<TAppBarComposedProps> = ({ classes, onClickSetting, onClickNotification, onClickMail }) => {
const TAppBar: React.SFC<TAppBarProps> = ({ classes, onClickSetting, onClickNotification, onClickMail }) => {
  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography className={classes.title} variant="h5" color="inherit" noWrap>
          Dashboard v0.1
        </Typography>
        <SearchField/>
        <IconButton color="inherit" onClick={onClickMail}>
          <MailBadge count={17}/>
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
