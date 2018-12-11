`use strict`

import * as React from 'react';
import Location from "./Location";
import ComputerInformation from "./ComputerInformation";

interface GeneralInfoProps{
}

const GeneralInfo: React.SFC<GeneralInfoProps> = ({}) => {
  return (
    <React.Fragment>
      <ComputerInformation/>
      <Location/>
    </React.Fragment>
  )
}

export default GeneralInfo;
