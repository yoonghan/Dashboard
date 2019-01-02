import * as React from 'react';
import { ThemeTypes } from "../const/theme";
import { DashboardConsumer, TDashboardContext } from "../shared/Context";

export interface WithDashboardContext {
  theme?: ThemeTypes;
  changeTheme?: (theme: ThemeTypes) => void;
  isCompact?: boolean;
  changeCompact?: (isCompact: boolean) => void;
};

/**
 * Unable to use with ref
 **/
export const withDashboardContext =
  <TOriginalProps extends {}>(Component: (React.ComponentType<TOriginalProps & WithDashboardContext>)) => {
    const DashboardContextComponent:React.SFC<TOriginalProps> = (props:TOriginalProps) =>{
      return (
        <DashboardConsumer>
        {
          consumerData =>
            (<Component {...props} {...consumerData}/>)
        }
        </DashboardConsumer>
      );
    }
  return DashboardContextComponent;
}
