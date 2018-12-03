`use strict`

import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AlarmIcon from '@material-ui/icons/Alarm';
import { ThemeTypes } from "../../../const/theme";
import {withDashboardContext, WithDashboardContext} from "../../../hoc/withDashboardContext";

interface NotificationProps extends WithDashboardContext {
  count: number;
}

const NotificationBadge: React.SFC<NotificationProps> = ({count, theme}) => {
  function _changeIconBasedOnTheme(theme:ThemeTypes) {
    if(theme === "gadot_theme") {
      return <AlarmIcon/>
    }
    return <NotificationsIcon />;
  }

  return (
    <Badge badgeContent={count} color="secondary">
      {_changeIconBasedOnTheme(theme)}
    </Badge>
  );
}

export default withDashboardContext(NotificationBadge);
