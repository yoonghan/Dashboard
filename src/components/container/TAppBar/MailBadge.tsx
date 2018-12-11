`use strict`

import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';

interface MailBadgeProps {
  count: number;
}

const MailBadge: React.SFC<MailBadgeProps> = ({count}) => {
  return (
    <Badge badgeContent={count} color="secondary" className={"tabable"}>
      <MailIcon />
    </Badge>
  );
}

export default MailBadge;
