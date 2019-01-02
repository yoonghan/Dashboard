`use strict`

import * as React from 'react';
import produce from "immer";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import FolderIcon from '@material-ui/icons/Folder';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import SortableTable from '../../../SortableTable';
import {SelectableTableType} from '../../../SortableTable';
import HelperPanel from "../../../HelperPanel";
import SearchTextField from "../../../SearchTextField";

const styles = (theme:Theme) => createStyles({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  buttonContainer: {
    paddingTop: theme.spacing.unit * 8,
    paddingBottom: theme.spacing.unit * 3,
    display: "flex",
    alignItems: "center",
    "& > button": {
      marginRight: theme.spacing.unit
    }
  }
});

interface ActiveStatusProps extends WithStyles<typeof styles> {
}

interface ActiveStatusFormProps extends ActiveStatusProps {
  setShowDisplayError: (toShow: boolean) => () => void
}

interface ActiveStatusState {
  dialogOpen: boolean;
}

const ActiveStatusForm: React.SFC<ActiveStatusFormProps> = ({classes, setShowDisplayError}) => {

  const data = [
    {id:0, name:'Memory Usage for Group Policy', severity: 'Critical', system: "192.168.1.170", component: "192.168.1.169", category: "Threshold Status", timeReceived: "Dec 10, 2018 12:12", details:"Monitoring Progress"},
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
    <Paper className={classes.root}>
      <HelperPanel instructionTitle={"Information:"}>
        <Typography variant="body2">
          View the active status reported for: 192.168.169.1 (Status)
        </Typography>
      </HelperPanel>
      <div className={classes.buttonContainer}>
        <Button variant="contained" color="secondary" onClick={setShowDisplayError(true)}>
          Delete
        </Button>
        <Button variant="contained" color="primary" onClick={setShowDisplayError(true)}>
          Ignore
        </Button>
        <Button variant="contained" color="primary" onClick={() => alert("Download as CSV")}>
          <FolderIcon fontSize="small" />
        </Button>
        <SearchTextField
          callbackForSearchTextChanged={()=>{}}
          handleSearchClick={()=>{}}
          displaySearchText="Filter..."
        />
      </div>
      <div>
        <SortableTable
          data={data}
          header={header}
          defaultRowsPerPage={rowsPerPage}
          withPagination={true}
          withSelection={SelectableTableType.CHECKBOX} />
      </div>
    </Paper>
  )
}

class ActiveStatusInfo extends React.PureComponent<ActiveStatusProps, ActiveStatusState> {
  constructor(props:ActiveStatusProps) {
    super(props);
    this.state = {
      dialogOpen: false
    }
  }

  _displayError = (toShow:boolean) => () => {
    this.setState(
      produce<ActiveStatusState>(draft => {
        draft.dialogOpen = toShow;
      })
    );
  }

  _handleClose = () => {
    this.setState(
      produce<ActiveStatusState>(draft => {
        draft.dialogOpen = false;
      })
    );
  }

  render() {
    const {classes} = this.props;

    return (
      <React.Fragment>
        <ActiveStatusForm {...this.props} setShowDisplayError={this._displayError}/>
        <Dialog
          open={this.state.dialogOpen}
          onClose={this._handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Selection error
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You are required to select records before starting an action.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this._handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(ActiveStatusInfo);
