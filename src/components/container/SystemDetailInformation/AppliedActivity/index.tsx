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
import ButtonPopupMenu from "../../../ButtonPopupMenu";

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

interface AppliedActivityProps extends WithStyles<typeof styles> {
}

interface AppliedActivityFormProps extends AppliedActivityProps {
  setShowDisplayError: (toShow: boolean) => () => void
}

interface AppliedActivityState {
  dialogOpen: boolean;
}

const AppliedActivityForm: React.SFC<AppliedActivityFormProps> = ({classes, setShowDisplayError}) => {

  const data = [
    {id:0, name:'Update Compliance', type: 'Job Instance', time: '12 Dec 2018 6:13:00PM SGT'},
    {id:1, name:'Update Compliance', type: 'Warning', time: '12 Dec 2018 6:13:00PM SGT'}
  ];
  const header = [
    { uniqueDataKey: 'name', numeric: false, label: 'Name' },
    { uniqueDataKey: 'type', numeric: false, label: 'type' },
    { uniqueDataKey: 'time', numeric: false, label: 'time' }
  ]
  const rowsPerPage = 5;

  return (
    <Paper className={classes.root}>
      <HelperPanel instructionTitle={"Information:"}>
        <Typography variant="body2">
          These activities have been applied to this system.
        </Typography>
      </HelperPanel>
      <div className={classes.buttonContainer}>
        <ButtonPopupMenu
          id = "actions"
          btnLabel = "Actions..."
          options = {
            [
              { label: "Open Job Properties...", handleClick: () => {} },
              { label: "Run Now", handleClick: () => {} },
              { label: "Suspend Job", handleClick: () => {} },
              { label: "Rename Job", handleClick: () => {} },
              { label: "Open Job Properties...", handleClick: () => {} },
              { label: "Delete Job", handleClick: () => {} },
              { label: "Delete History", handleClick: () => {} }
            ]
          }
        />
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
          withSelection={SelectableTableType.RADIO} />
      </div>
    </Paper>
  )
}

class AppliedActivity extends React.PureComponent<AppliedActivityProps, AppliedActivityState> {
  constructor(props:AppliedActivityProps) {
    super(props);
    this.state = {
      dialogOpen: false
    }
  }

  _displayError = (toShow:boolean) => () => {
    this.setState(
      produce<AppliedActivityState>(draft => {
        draft.dialogOpen = toShow;
      })
    );
  }

  _handleClose = () => {
    this.setState(
      produce<AppliedActivityState>(draft => {
        draft.dialogOpen = false;
      })
    );
  }

  render() {
    const {classes} = this.props;

    return (
      <React.Fragment>
        <AppliedActivityForm {...this.props} setShowDisplayError={this._displayError}/>
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

export default withStyles(styles)(AppliedActivity);
