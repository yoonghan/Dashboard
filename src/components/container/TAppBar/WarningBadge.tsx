`use strict`

import Badge from '@material-ui/core/Badge';
import WarningIcon from '@material-ui/icons/Warning';
import amber from '@material-ui/core/colors/amber';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

const styles = (theme:Theme) => createStyles({
  badge: {
    color: amber[700]
  }
});

interface WarningBadgeProps extends WithStyles<typeof styles>{
  count: number;
}

const WarningBadge: React.SFC<WarningBadgeProps> = ({classes, count}) => {
  return (
    <Badge badgeContent={count} color="secondary">
      <WarningIcon className={classes.badge}/>
    </Badge>
  );
}

export default withStyles(styles)(WarningBadge);
