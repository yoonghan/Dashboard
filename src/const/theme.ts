import { createMuiTheme, Theme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import pink from '@material-ui/core/colors/pink';
import blue from '@material-ui/core/colors/blue';
import purple from '@material-ui/core/colors/purple';
import blueGrey from '@material-ui/core/colors/blueGrey';

//TODO: Fix on warn, success type check.
interface IExtendColor {
  main: string;
}

interface IExtendPalette {
  warn: IExtendColor;
  success: IExtendColor;
}

export const toshiba_theme = createMuiTheme(({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: blue,
    secondary: pink,
    warn: {
      main: amber[700]
    },
    success: {
      main: green[700]
    }
  }
} as any));

export const gadot_theme = createMuiTheme(({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: blueGrey,
    secondary: purple,
    warn: {
      main: amber[700]
    },
    success: {
      main: green[700]
    }
  },
} as any));

export interface DashboardThemeModal {
  [key:string]: ThemeModal
}

export interface ThemeModal {
  label: string,
  theme: Theme
}

function getThemeAttribute (idx:number):ThemeModal {
  switch(idx) {
    case 0:
      return {
        label: "Toshiba",
        theme: toshiba_theme
      }
    case 1:
      return {
        label: "Gadot",
        theme: gadot_theme
      }
  }
  return {
    label: "Toshiba",
    theme: toshiba_theme
  };
}

function getThemesAvailable(themes: Array<ThemeTypes>) {
  const themesAvailable:DashboardThemeModal = {};
  themes.map((themeName:string, idx: number) => {
    themesAvailable[themeName] = getThemeAttribute(idx);
  });
  return themesAvailable;
}


export function getTheme(theme:ThemeTypes) {
  return THEMES_AVAILABLE[theme];
}

export type ThemeTypes = "toshiba_theme"| "gadot_theme";
export const THEMES:Array<ThemeTypes> = ["toshiba_theme", "gadot_theme"];
export const THEMES_AVAILABLE:DashboardThemeModal = getThemesAvailable(THEMES);
export const DEFAULT_THEME = "toshiba_theme";
export default THEMES_AVAILABLE[DEFAULT_THEME].theme;
