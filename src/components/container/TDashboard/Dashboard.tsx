`use strict`

import * as React from 'react';
import produce from "immer";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import CSSBaseLine from '@material-ui/core/CSSBaseLine';
import { MuiThemeProvider, Theme } from '@material-ui/core/styles';
import { withRouter, RouteComponentProps } from "react-router-dom";
import TAppBar from "../TAppBar";
import TBody from "../TBody";
import { DashboardProvider, SearchProvider } from "../../../shared/Context";
import { DEFAULT_THEME, THEMES_AVAILABLE, ThemeTypes } from '../../../const/theme';
import loggerMiddleware from '../../../middleware/logging';
import fetchMiddleware from '../../../middleware/fetch';
import reducer from '../../../ducks';

const createStoreWithMiddleware = applyMiddleware(fetchMiddleware)(createStore);
const store = createStoreWithMiddleware(reducer);

interface DashboardProps extends RouteComponentProps<any> {
}

interface DashboardState {
  isCompact: boolean;
  theme: ThemeTypes;
  inSearchMode: boolean;
  searchText: string;
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {
  constructor(props:DashboardProps) {
    super(props);
    this.state = {
      isCompact: false,
      theme: DEFAULT_THEME,
      inSearchMode: false,
      searchText: ""
    }
  }

  _toggleSearchMode = (inSearchMode: boolean) => {
    this.setState(
      produce<DashboardState>(draft => {
        draft.inSearchMode = inSearchMode;
      })
    );
  }

  _changeTheme = (selectedTheme: ThemeTypes) => {
    this.setState(
      produce<DashboardState>(draft => {
        draft.theme = selectedTheme;
      })
    );
  }

  _changeCompact = (isCompact: boolean) => {
    this.setState(
      produce<DashboardState>(draft => {
        draft.isCompact = isCompact;
      })
    );
  }

  _changeSearchText = (searchText: string) => {
    this.setState(
      produce<DashboardState>(draft => {
        draft.searchText = searchText;
      })
    );
  }

  _jumpPage = (location:string) => {
    const {history} = this.props;

    this.setState(
      produce<DashboardState>(draft => {
        draft.inSearchMode = false;
        history.push(location);
      })
    );
  }

  _onClickSetting = () => {
    this._jumpPage("/setting");
  }

  _onClickNotification = () => {
    this._jumpPage("/notification/mail");
  }

  _onClickAlert= () => {
    this._jumpPage("/notification/alert");
  }

  _onClickWarning = () => {
    const {history} = this.props;

    this.setState(
      produce<DashboardState>(draft => {
        draft.inSearchMode = false;
        history.push("/notification/warning");
      })
    );
  }

  render() {
    const {theme, inSearchMode, isCompact, searchText} = this.state;
    return (
      <Provider store={store}>
        <DashboardProvider value={
          {
            isCompact: isCompact,
            changeCompact: this._changeCompact,
            theme: theme,
            changeTheme: this._changeTheme
          }
        }>
          <MuiThemeProvider theme={THEMES_AVAILABLE[theme].theme}>
            <CSSBaseLine/>
            <SearchProvider value ={
              {
                inSearch: inSearchMode,
                textSearch: searchText,
                changeSearchText: this._changeSearchText,
                toggleSearchMode: this._toggleSearchMode
              }
            }>
              <TAppBar
                onClickSetting={this._onClickSetting}
                onClickNotification={this._onClickNotification}
                onClickAlert={this._onClickAlert}
                onClickWarning={this._onClickWarning}
                />
              <TBody/>
            </SearchProvider>
          </MuiThemeProvider>
        </DashboardProvider>
      </Provider>
    )
  }
}

export default withRouter(Dashboard);
