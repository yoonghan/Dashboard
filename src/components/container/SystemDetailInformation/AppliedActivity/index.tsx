`use strict`

import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import SortableTable from '../../../SortableTable';

interface AppliedActivityProps {
}

const AppliedActivity: React.SFC<AppliedActivityProps> = ({}) => {

  const data = [
    {id:0, name:'Memory Usage for Group Policy', severity: 'Critical', system: "192.168.1.169", component: "192.168.1.169", category: "Threshold Status", timeReceived: "Dec 10, 2018 12:12", details:"Monitoring Progress"},
    {id:1, name:'Memory Usage for Group Policy', severity: 'Critical', system: "192.168.1.169", component: "192.168.1.169", category: "Threshold Status", timeReceived: "Nov 10, 2018 12:12", details:"Monitoring Progress"},
  ];
  const header = [
    { uniqueDataKey: 'name', numeric: false, label: 'Name' },
    { uniqueDataKey: 'severity', numeric: false, label: 'Severity' },
    { uniqueDataKey: 'system', numeric: false, label: 'System' },
    { uniqueDataKey: 'component', numeric: false, label: 'Component' },
    { uniqueDataKey: 'category', numeric: false, label: 'Category' },
    { uniqueDataKey: 'timeReceived', numeric: false, label: 'timeReceived' },
    { uniqueDataKey: 'details', numeric: false, label: 'Details' }
  ]
  const rowsPerPage = 20;

  return (
    <div>
      <div>
        <Typography>
          192.168.1.22 (status)
        </Typography>
      </div>
      <div>
        Missing functions to DELETE/IGNORE/ACTIONS/SEARCH
      </div>
      <div>
        <SortableTable data={data} header={header} defaultRowsPerPage={rowsPerPage} withPagination={true}/>
      </div>
    </div>
  )
}

export default AppliedActivity;
