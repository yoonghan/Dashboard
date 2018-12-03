`use strict`

import * as React from 'react';
import produce from "immer";
import { Link } from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { routes, RouteModal } from "../../../nav/sites";


const styles = (theme:Theme) => createStyles({
  listContainer: {
    padding: '20px',
    backgroundColor: theme.palette.background.paper
  }
});

interface TSearchProps extends WithStyles<typeof styles> {
  textSearch: string;
}

interface TSearchState {
}

class TSearch extends React.PureComponent<TSearchProps, TSearchState> {
  constructor(props:TSearchProps) {
    super(props);
  }

  _filterMatchedRoutes = () => {
    const {textSearch} = this.props;

    if(textSearch === "") {
      return routes;
    }
    else {
      const lcTextSearch = textSearch.toLowerCase();
      return routes.filter((route:RouteModal) => {
        const keywords = route.keywords;
        return keywords.some((keyword:string) => {
          return (keyword.indexOf(lcTextSearch) > -1)
        });
      });
    }
  }

  _drawSearches = () => {
    const matchedKeywords = this._filterMatchedRoutes();

    if(matchedKeywords.length === 0) {
      return (
        <Typography color="error" variant="h6">
          No Result Found
        </Typography>
      )
    }

    return matchedKeywords.map((route:RouteModal, idx: number) => {
      return (
        <React.Fragment key={`search_r_${route.path}`}>
          { (idx !==0) && <Divider/> }
          <Link to={route.path}>
            <ListItem button>
              <ListItemText primary={route.label} />
            </ListItem>
          </Link>
        </React.Fragment>
      );
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <List className={classes.listContainer}>
        <Typography color="textSecondary" variant="caption">
          Search Result
        </Typography>
        {this._drawSearches()}
      </List>
    )
  }
}

export default withStyles(styles)(TSearch);
