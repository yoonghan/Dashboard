import * as React from 'react';
import { MuiThemeProvider} from '@material-ui/core/styles';
import theme from '../const/theme';

const withTheme =
  <TOriginalProps extends {}>(Component: (React.ComponentType<TOriginalProps>)) => {
    
  const themedComponent:React.SFC<TOriginalProps> = (props:TOriginalProps) =>{
    return (
      <MuiThemeProvider theme={theme}>
        <Component {...props}/>
      </MuiThemeProvider>
    );
  }

  return themedComponent;
}

export default withTheme;
