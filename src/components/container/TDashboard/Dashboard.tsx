`use strict`

import * as React from 'react';
import produce from "immer";
import CSSBaseLine from '@material-ui/core/CSSBaseLine';
import { MuiThemeProvider, Theme } from '@material-ui/core/styles';
import { withRouter, RouteComponentProps } from "react-router-dom";
import TAppBar from "../TAppBar";
import TBody from "../TBody";
import { DashboardProvider, SearchProvider } from "../../../shared/Context";
import { DEFAULT_THEME, THEMES_AVAILABLE, ThemeTypes } from '../../../const/theme';

interface DashboardProps extends RouteComponentProps<any> {
}

interface DashboardState {
  theme: ThemeTypes;
  inSearchMode: boolean;
  searchText: string;
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {
  constructor(props:DashboardProps) {
    super(props);
    this.state = {
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

  _changeSearchText = (searchText: string) => {
    this.setState(
      produce<DashboardState>(draft => {
        draft.searchText = searchText;
      })
    );
  }

  _onClickSetting = () => {
    const {history} = this.props;

    this.setState(
      produce<DashboardState>(draft => {
        draft.inSearchMode = false;
        history.push("setting");
      })
    );
  }

  render() {
    const {theme, inSearchMode, searchText} = this.state;
    return (
      <DashboardProvider value={
        {
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
              onClickMail={()=>{}}
              onClickSetting={this._onClickSetting}
              onClickNotification={()=>{}}
              />
            <TBody/>
          </SearchProvider>
        </MuiThemeProvider>
      </DashboardProvider>
    )
  }
}

export default withRouter(Dashboard);
