`use strict`

import * as React from 'react';
import Dashboard from "./Dashboard";
import { BrowserRouter } from "react-router-dom";

const TDashboard: React.SFC<any> = () => (
  <BrowserRouter>
    <React.Suspense fallback={<div>Loading...</div>}>
      <Dashboard/>
    </React.Suspense>
  </BrowserRouter>
)

export default TDashboard;
