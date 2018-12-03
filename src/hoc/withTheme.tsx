import * as React from 'react';
import { MuiThemeProvider} from '@material-ui/core/styles';
import defaultTheme from '../const/theme';

const withTheme =
  <TOriginalProps extends {}>(Component: (React.ComponentType<TOriginalProps>)) => {

  const themedComponent:React.SFC<TOriginalProps> = (props:TOriginalProps) =>{
    return (
      <MuiThemeProvider theme={defaultTheme}>
        <Component {...props}/>
      </MuiThemeProvider>
    );
  }

  return themedComponent;
}

export default withTheme;
