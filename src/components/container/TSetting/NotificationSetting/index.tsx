`use strict`

import * as React from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

const styles = (theme:Theme) => createStyles({
  root: {
  }
});

interface NotificationSettingProps extends WithStyles<typeof styles> {}

const NotificationSetting: React.SFC<NotificationSettingProps> = ({classes}) => (
  <div>N/A</div>
)

export default withStyles(styles)(NotificationSetting);
