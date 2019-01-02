`use strict`

import * as React from 'react';
import produce from "immer";
import Grid from '@material-ui/core/Grid';
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
import SortableTable from '../../SortableTable';
import {SelectableTableType} from '../../SortableTable';
import HelperPanel from "../../HelperPanel";
import SearchTextField from "../../SearchTextField";
import ButtonPopupMenu from "../../ButtonPopupMenu";
import TitleBar from "../../TitleBar";
import Detail from "./Detail";

const styles = (theme:Theme) => createStyles({
  root: {

  },
  paper: {
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

interface TNotificationWarningProps extends WithStyles<typeof styles> {
}

interface TNotificationWarningFormProps extends TNotificationWarningProps {
  setShowDisplayError: (toShow: boolean) => () => void;
  callbackForRowClick: (idx:string) => void;
}

interface TNotificationWarningState {
  dialogOpen: boolean;
  showDetail: boolean;
}

const TNotificationWarningForm: React.SFC<TNotificationWarningFormProps> = ({classes, setShowDisplayError, callbackForRowClick}) => {
  const data = [
    {id:0, name:'System Restart', severity: 'Warning', system: "BOSS", component: "BOSS", category: "Hardware Status", timeReceived: "Dec 10, 2018 12:12", details:"System Restarted."},
    {id:1, name:'System Restart', severity: 'Warning', system: "LANE", component: "192.168.169.1", category: "Hardware Status", timeReceived: "Dec 10, 2018 12:12", details:"System Restarted."},
    {id:2, name:'System Restart', severity: 'Warning', system: "LANE", component: "192.168.169.1", category: "Hardware Status", timeReceived: "Dec 11, 2018 12:12", details:"System Restarted."},
    {id:3, name:'System Restart', severity: 'Warning', system: "LANE", component: "192.168.169.1", category: "Hardware Status", timeReceived: "Dec 12, 2018 12:12", details:"System Restarted."},
    {id:4, name:'System Restart', severity: 'Warning', system: "LANE", component: "192.168.169.1", category: "Hardware Status", timeReceived: "Dec 13, 2018 12:12", details:"System Restarted."},
    {id:5, name:'System Restart', severity: 'Warning', system: "LANE", component: "192.168.169.1", category: "Hardware Status", timeReceived: "Dec 14, 2018 12:12", details:"System Restarted."},
    {id:6, name:'System Restart', severity: 'Warning', system: "LANE", component: "192.168.169.1", category: "Hardware Status", timeReceived: "Dec 15, 2018 12:12", details:"System Restarted."},
    {id:7, name:'System Restart', severity: 'Warning', system: "LANE", component: "192.168.169.1", category: "Hardware Status", timeReceived: "Dec 16, 2018 12:12", details:"System Restarted."},
    {id:8, name:'System Restart', severity: 'Warning', system: "LANE", component: "192.168.169.1", category: "Hardware Status", timeReceived: "Dec 17, 2018 12:12", details:"System Restarted."},
    {id:9, name:'System Restart', severity: 'Warning', system: "LANE", component: "192.168.169.1", category: "Hardware Status", timeReceived: "Dec 18, 2018 12:12", details:"System Restarted."},
    {id:10, name:'System Restart', severity: 'Warning', system: "LANE", component: "192.168.169.1", category: "Hardware Status", timeReceived: "Dec 19, 2018 12:12", details:"System Restarted."},
    {id:11, name:'System Restart', severity: 'Warning', system: "LANE", component: "192.168.169.1", category: "Hardware Status", timeReceived: "Dec 20, 2018 12:12", details:"System Restarted."},
    {id:12, name:'System Restart', severity: 'Warning', system: "LANE", component: "192.168.169.1", category: "Hardware Status", timeReceived: "Dec 21, 2018 12:12", details:"System Restarted."},
    {id:13, name:'System Restart', severity: 'Warning', system: "LANE", component: "192.168.169.1", category: "Hardware Status", timeReceived: "Dec 22, 2018 12:12", details:"System Restarted."}
  ];
  const header = [
    { uniqueDataKey: 'name', numeric: false, label: 'Name' },
    { uniqueDataKey: 'severity', numeric: false, label: 'Severity' },
    { uniqueDataKey: 'system', numeric: false, label: 'System' },
    { uniqueDataKey: 'component', numeric: false, label: 'Component' },
    { uniqueDataKey: 'category', numeric: false, label: 'Category' },
    { uniqueDataKey: 'timeReceived', numeric: false, label: 'Time Received' },
    { uniqueDataKey: 'details', numeric: false, label: 'Details' }
  ]
  const rowsPerPage = 5;

  return (
    <Grid container className={classes.root}>
      <TitleBar title="System Warning" canClose={true}/>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="body2">
            View the active status reported for all discovered system.
          </Typography>
          <div className={classes.buttonContainer}>
            <ButtonPopupMenu
              id = "actions"
              btnLabel = "Actions..."
              options = {
                [
                  { label: "Delete", handleClick: () => {} },
                  { label: "Ignore", handleClick: () => {} }
                ]
              }
            />
            <Button variant="contained" color="primary" onClick={setShowDisplayError(true)}>
              Refresh
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
              withSelection={SelectableTableType.CHECKBOX}
              callbackForClickableRow={callbackForRowClick} />
          </div>
        </Paper>
      </Grid>
    </Grid>
  )
}

class TNotificationWarning extends React.PureComponent<TNotificationWarningProps, TNotificationWarningState> {
  constructor(props:TNotificationWarningProps) {
    super(props);
    this.state = {
      dialogOpen: false,
      showDetail: false
    }
  }

  _displayError = (toShow:boolean) => () => {
    this.setState(
      produce<TNotificationWarningState>(draft => {
        draft.dialogOpen = toShow;
      })
    );
  }

  _handleClose = () => {
    this.setState(
      produce<TNotificationWarningState>(draft => {
        draft.dialogOpen = false;
      })
    );
  }

  _detailClick = (idx:string) => {
    this.setState(
      produce<TNotificationWarningState>(draft => {
        draft.showDetail = true;
      })
    );
  }

  render() {
    const {classes} = this.props;
    const {showDetail} = this.state;

    return (
      <React.Fragment>
        <TNotificationWarningForm {...this.props}
          setShowDisplayError={this._displayError}
          callbackForRowClick={this._detailClick}
          />
        {showDetail &&
          <Detail/>
        }
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

export default withStyles(styles)(TNotificationWarning);
