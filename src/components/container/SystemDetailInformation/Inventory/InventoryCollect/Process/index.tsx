`use strict`

import * as React from 'react';
import produce from "immer";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import LeftIcon from '@material-ui/icons/ArrowLeft';
import RightIcon from '@material-ui/icons/ArrowRight';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import * as moment from "moment";
import ButtonGroup from "../../../../../ButtonGroup";

const styles = (theme:Theme) => createStyles({
  root: {
  },
  form: {
    marginBottom: `${theme.spacing.unit * 2}px`,
    ...theme.mixins.gutters()
  }
});

interface ProcessState {
  isDialogOpen: boolean;
  progressState: number;
}

interface ProcessProps extends WithStyles<typeof styles> {
  callbackProcessCancelClick: () => void;
  collectionDate: Date;
}

class Process extends React.Component<ProcessProps, ProcessState> {
  private timer:any = null;

  constructor(props:ProcessProps) {
    super(props);
    this.state = {
      isDialogOpen: false,
      progressState: 0
    }
  }

  _handleDialogClick = () => {
    this.setState(
      produce<ProcessState>(draft => {
        draft.isDialogOpen = !draft.isDialogOpen;
      })
    );
  }

  _handleProcessClick = () => {
    this.setState(
      produce<ProcessState>(draft => {
        draft.isDialogOpen = !draft.isDialogOpen;
      })
    );
  }

  _handleCancelClick = () => {
    const {callbackProcessCancelClick} = this.props;

    this.setState(
      produce<ProcessState>(draft => {
        draft.isDialogOpen = !draft.isDialogOpen;
        callbackProcessCancelClick();
      })
    );
  }

  componentDidMount() {
    if(this._canProgressBeTaken()){
      this.timer = setInterval(this._handleFakeProgress, 500);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  _canProgressBeTaken = () => {
    const {collectionDate} = this.props
    return moment().isAfter(moment(collectionDate));
  }

  _handleFakeProgress = () => {
    const { progressState } = this.state;
    const {callbackProcessCancelClick} = this.props;

    if (progressState === 100) {
      this.setState(
        produce<ProcessState>(draft => {
          draft.isDialogOpen = !draft.isDialogOpen;
          callbackProcessCancelClick();
        })
      )
    } else {
      const diff = Math.random() * 20;
      this.setState(
        produce<ProcessState>(draft => {
          draft.progressState = Math.min(draft.progressState + diff, 100)
        })
      );
    }
  };

  _controlDisplay = () => {
    const {classes, collectionDate} = this.props;
    const canProgressBeTaken = this._canProgressBeTaken();
    if(canProgressBeTaken) {
      return <LinearProgress color="primary" variant="determinate" value={this.state.progressState} className={classes.form}/>;
    }
    else {
      return <Typography>{`Progress will only start at: ${collectionDate}`}</Typography>;
    }
  }

  render() {
    const {classes} = this.props;
    const {isDialogOpen} = this.state;

    return (
      <React.Fragment>
        <Button variant="contained" color="primary" onClick={this._handleProcessClick}>
          ...Processing
        </Button>
        <Dialog onClose={this._handleDialogClick} aria-labelledby="inventory-collect-dialog" open={isDialogOpen}>
          <DialogTitle id="inventory-collect-dialog">Inventory Collection Status</DialogTitle>
          <FormControl component="div" className={classes.form}>
            {this._controlDisplay()}
            <Divider className={classes.form}/>
            <ButtonGroup>
              <Button variant="contained" color="primary" onClick={this._handleProcessClick}>
                Close
              </Button>
              <Button variant="contained" color="secondary" onClick={this._handleCancelClick}>
                Cancel
              </Button>
            </ButtonGroup>
          </FormControl>
        </Dialog>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Process);
