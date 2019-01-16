`use strict`

import * as React from 'react';
import Dashboard from "./Dashboard";
import { BrowserRouter } from "react-router-dom";

const TDashboard: React.SFC<any> = () => (
  <BrowserRouter>
    <Dashboard/>
  </BrowserRouter>
)

export default TDashboard;
