`use strict`

import Badge from '@material-ui/core/Badge';
import ErrorIcon from '@material-ui/icons/Error';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

const styles = (theme:Theme) => createStyles({
  badge: {
    color: theme.palette.error.main
  }
});

interface AlertBadgeProps extends WithStyles<typeof styles>{
  count: number;
}

const AlertBadge: React.SFC<AlertBadgeProps> = ({classes, count}) => {
  return (
    <Badge badgeContent={count} color="secondary">
      <ErrorIcon className={classes.badge}/>
    </Badge>
  );
}

export default withStyles(styles)(AlertBadge);
