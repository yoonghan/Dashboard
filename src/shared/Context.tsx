`use strict`

import * as React from 'react';
import { Theme } from '@material-ui/core/styles';
import { DEFAULT_THEME, THEMES_AVAILABLE, ThemeTypes } from '../const/theme';

export interface TDashboardContext {
  isCompact: boolean;
  changeCompact: (isCompact: boolean) => void;
  theme: ThemeTypes;
  changeTheme: (theme: ThemeTypes) => void;
}

export interface TSearchContext {
  inSearch: boolean;
  textSearch: string;
  changeSearchText: (text: string) => void;
  toggleSearchMode: (inSearchMode: boolean) => void;

}

const dashboardContext = React.createContext<TDashboardContext>({
                            isCompact: false,
                            changeCompact: (isCompact: boolean) => {},
                            theme: DEFAULT_THEME,
                            changeTheme: (theme: string) => {}
                          });
export const DashboardProvider = dashboardContext.Provider;
export const DashboardConsumer = dashboardContext.Consumer;

const searchContext = React.createContext<TSearchContext>({
                          inSearch: false,
                          textSearch: "",
                          changeSearchText: (search: string) => {},
                          toggleSearchMode: (inSearchMode: boolean) => {}
                        });
export const SearchProvider = searchContext.Provider;
export const SearchConsumer = searchContext.Consumer;
