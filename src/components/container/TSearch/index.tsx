`use strict`

import * as React from 'react';
import { compose } from 'redux';
import { Link } from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { withRouter, RouteComponentProps } from "react-router-dom";
import { routes as nonFilteredRoutes, RouteModal } from "../../../nav/sites";
import { SearchConsumer } from "../../../shared/Context";

const styles = (theme:Theme) => createStyles({
  listContainer: {
    padding: '20px',
    backgroundColor: theme.palette.background.paper
  }
});

interface TSearchProps {
  textSearch: string;
}

interface TSearchPropsWithHoc extends TSearchProps, WithStyles<typeof styles>, RouteComponentProps<any> {}

interface TSearchState {
}

class TSearch extends React.PureComponent<TSearchPropsWithHoc, TSearchState> {
  private handleCloseWindow = () => {};
  private routes:Array<RouteModal> = null;

  constructor(props:TSearchPropsWithHoc) {
    super(props);
    this.routes = this._filterMenuRoutes();
  }

  _filterMenuRoutes = () => {
    return nonFilteredRoutes.filter(route => {
      return (!route.isNotMenuItem);
    });
  }

  _handleKeyDown = (e:KeyboardEvent) => {
    switch(e.key) {
      case "Esc":
      case "Escape":
        e.preventDefault();
        this.handleCloseWindow();
        break;
      case "Tab":
        const className = (e.target as any).className;
        if(className && className.indexOf("tabable") === -1) {
          e.preventDefault();
        }
        break;
      default:
        console.log("Execute");
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this._handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeyDown);
  }

  _filterMatchedRoutes = () => {
    const {textSearch} = this.props;

    if(textSearch === "") {
      return this.routes;
    }
    else {
      const lcTextSearch = textSearch.split(":")[0].toLowerCase();
      return this.routes.filter((route:RouteModal) => {
        const keywords = route.keywords;
        return keywords.some((keyword:string) => {
          return (keyword.indexOf(lcTextSearch) > -1)
        });
      });
    }
  }

  _renderSearchItem = (handleCloseWindow:()=>void, totalSize:number) => (route:RouteModal, idx: number) => {
    const {history} = this.props;

    const funcRedirect = () => {
      history.push(route.path);
      handleCloseWindow();
    };

    const isLast = (idx === (totalSize - 1));
    const blurFunc = (isLast? handleCloseWindow : null);

    return (
      <ListItem button divider onClick={funcRedirect} onKeyPress={funcRedirect} key={`search_r_${route.path}`} onBlur={blurFunc}>
        <ListItemText primary={route.label} tabIndex={1001} className={"tabable"}/>
      </ListItem>
    );
  }

  _renderEmptySearchItem = () => {
    return (
      <Typography color="error" variant="h6">
        No Result Found
      </Typography>
    );
  }

  _drawSearches = (handleCloseWindow:()=>void) => {
    const matchedKeywords = this._filterMatchedRoutes();

    if(matchedKeywords.length === 0) {
      return this._renderEmptySearchItem();
    }

    const renderSearchItemFunc = this._renderSearchItem(handleCloseWindow, matchedKeywords.length);
    return matchedKeywords.map(renderSearchItemFunc);
  }

  _assignSearchClose = (handleCloseWindow: ()=>void) => {
    this.handleCloseWindow = handleCloseWindow;
  }

  render() {
    const { classes } = this.props;
    return (
      <SearchConsumer>
      { consumerData => (
        <List className={classes.listContainer} component="nav">
          <Typography color="textSecondary" variant="caption">
            Search Result
          </Typography>
          {this._drawSearches(() => consumerData.toggleSearchMode(false))}
          {this._assignSearchClose(() => consumerData.toggleSearchMode(false))}
        </List>
      )}
      </SearchConsumer>
    )
  }
}

const enhance = compose<React.SFC<TSearchProps>> (
  withRouter,
  withStyles(styles)
);

export default enhance(TSearch);
