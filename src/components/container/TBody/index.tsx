import * as React from "react";
import { Route, Link, Switch } from "react-router-dom";
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { SearchConsumer } from "../../../shared/Context";
import Portal from '@material-ui/core/Portal';
import { getRouteList } from "../../../nav/util";
import NotFound from "../../routable/NotFound";
import TSearch from "../TSearch";

const styles = (theme:Theme) => createStyles({
  root: {
    position: "relative",
    minHeight: "calc(100vh - 64px)"
  },
  modalContainer: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    position: "absolute",
    overflow: "auto",
    backgroundColor: fade(theme.palette.common.black, 0.25)
  },
});

interface TBodyProps extends WithStyles<typeof styles> {
}

interface TBodyState {
}

class TBody extends React.Component<TBodyProps, TBodyState> {
  private switchRef = React.createRef<HTMLDivElement>();
  private routes = getRouteList();

  constructor(props:TBodyProps) {
    super(props);
  }

  render() {
    const {classes} = this.props;

    return (
      <React.Fragment>
        <SearchConsumer>
        { consumerData => (
          <React.Fragment>
          {
            consumerData.inSearch &&
            <Portal container={this.switchRef.current}>
              <div
                className={classes.modalContainer}
                onClick={()=>consumerData.toggleSearchMode(false)}
                >
                <TSearch textSearch={consumerData.textSearch}/>
              </div>
            </Portal>
          }
          </React.Fragment>
        )}
        </SearchConsumer>
        <div ref={this.switchRef} className={classes.root}>
          <Switch>
            {
              this.routes.map((route, idx) => {
                return (
                  <Route
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                    key={`tbody_${route.path}`}/>
                )
              })
            }
            <Route component={NotFound} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
};

export default withStyles(styles)(TBody);
