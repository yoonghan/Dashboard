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

const styles = (theme:Theme) => createStyles({
  form: {
    marginBottom: `${theme.spacing.unit * 2}px`,
    ...theme.mixins.gutters()
  },
  datePicker: {
    width: "55%"
  },
  timePicker: {
    width: "35%"
  }
});

interface CollectState {
  isDialogOpen: boolean;
  collectSchedule: string;
  collectDate: Date;
}

interface CollectProps extends WithStyles<typeof styles> {
  callbackCollectClick: (selection:Date) => void;
}

class Collect extends React.Component<CollectProps, CollectState> {
  constructor(props:CollectProps) {
    super(props);
    this.state = {
      isDialogOpen: false,
      collectSchedule: "NOW",
      collectDate: new Date()
    }
  }

  _handleSubmitClick = () => {
    const {callbackCollectClick} = this.props;
    const {collectDate} = this.state;

    this.setState(
      produce<CollectState>(draft => {
        draft.isDialogOpen = !draft.isDialogOpen;
        callbackCollectClick(collectDate);
      })
    );
  }

  _handleDialogClick = () => {
    this.setState(
      produce<CollectState>(draft => {
        draft.isDialogOpen = !draft.isDialogOpen;
      })
    );
  }

  _handleCollectClick = () => {
    this.setState(
      produce<CollectState>(draft => {
        draft.isDialogOpen = !draft.isDialogOpen;
      })
    );
  }

  _handlecollectScheduleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    this.setState(
      produce<CollectState>(draft => {
        draft.collectSchedule = value;
      })
    );
  }

  _handleCollectDateChange = (date: Date) => {
    this.setState(
      produce<CollectState>(draft => {
        draft.collectDate = date;
      })
    );
  }

  render() {
    const {classes} = this.props;
    const {isDialogOpen, collectDate, collectSchedule} = this.state;

    return (
      <React.Fragment>
        <Button variant="contained" color="primary" onClick={this._handleCollectClick}>
           Collect Inventory
        </Button>
        <Dialog onClose={this._handleDialogClick} aria-labelledby="inventory-collect-dialog" open={isDialogOpen}>
          <DialogTitle id="inventory-collect-dialog">Collect Inventory</DialogTitle>
          <FormControl component="div" className={classes.form}>
            <RadioGroup
              aria-label="Collect On"
              name="collectSchedule"
              value={this.state.collectSchedule}
              onChange={this._handlecollectScheduleChange}
            >
              <FormControlLabel value="NOW" control={<Radio />} label="Now" />
              <FormControlLabel value="LATER" control={<Radio />} label="Later" />
            </RadioGroup>
            {collectSchedule === "LATER" &&
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Grid container justify="space-around" spacing={8}>
                  <DatePicker
                    margin="normal"
                    label="Date picker"
                    value={collectDate}
                    onChange={this._handleCollectDateChange}
                    disablePast={true}
                    leftArrowIcon={<LeftIcon/>}
                    rightArrowIcon={<RightIcon/>}
                    className={classes.datePicker}
                  />
                  <TimePicker
                    margin="normal"
                    label="Time picker"
                    value={collectDate}
                    onChange={this._handleCollectDateChange}
                    className={classes.timePicker}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            }
            <Divider className={classes.form}/>
            <Button variant="contained" color="primary" onClick={this._handleSubmitClick}>
              Submit
            </Button>
          </FormControl>
        </Dialog>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Collect);
