`use strict`

import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import SortableTable from '../../../SortableTable';

interface ActiveStatusProps{
}

const ActiveStatusInfo: React.SFC<ActiveStatusProps> = ({}) => {

  const data = [
    {id:0, name:'Memory Usage for Group Policy', severity: 'Critical', system: "192.168.1.169", component: "192.168.1.169", category: "Threshold Status", timeReceived: "Dec 10, 2018 12:12", details:"Monitoring Progress"},
    {id:1, name:'NIC is Off', severity: 'Warning', system: "192.168.1.170", component: "Local Area network", category: "Hardware Satus", timeReceived: "Nov 10, 2018 12:12", details:"NIC is offline"},
    {id:2, name:'NIC is Off', severity: 'Warning', system: "192.168.1.170", component: "Local Area network", category: "Hardware Satus", timeReceived: "Nov 11, 2018 12:12", details:"NIC is offline"},
    {id:3, name:'NIC is Off', severity: 'Warning', system: "192.168.1.170", component: "Local Area network", category: "Hardware Satus", timeReceived: "Nov 12, 2018 12:12", details:"NIC is offline"},
    {id:4, name:'NIC is Off', severity: 'Warning', system: "192.168.1.170", component: "Local Area network", category: "Hardware Satus", timeReceived: "Nov 13, 2018 12:12", details:"NIC is offline"},
    {id:5, name:'NIC is Off', severity: 'Warning', system: "192.168.1.170", component: "Local Area network", category: "Hardware Satus", timeReceived: "Nov 14, 2018 12:12", details:"NIC is offline"}
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
        <Typography>View Status Report For: 192.168.169.1 (Status)</Typography>
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

export default ActiveStatusInfo;
