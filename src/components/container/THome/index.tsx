`use strict`

import * as React from 'react';
import SystemNetworkControl from "../SystemNetworkControl";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface THomeProps extends RouteComponentProps<any> {}

const THome: React.SFC<THomeProps> = ({history}) => (
  <SystemNetworkControl handleMoreInfoOnClick={()=>{history.push("/serverinfo")}}/>
)

export default withRouter(THome);
