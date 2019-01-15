`use strict`

import * as React from 'react';
import produce from "immer";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withFormik, FormikProps, FormikErrors, FormikBag } from 'formik';
import {isIPAddressValid} from '../../../const/validatorRegex';
import Ipv4TextField from '../../Ipv4TextField';

export interface SystemNetworkControlInputModal {
  ipAddress: string;
  hostname: string;
  checkHostIp: boolean;
  eventFilter: number;
}

interface SystemNetworkControlInputProps {
  onSubmit: (output: SystemNetworkControlInputModal) => void;
  handleClose: () => void;
  openDialog: boolean;
}

interface SystemNetworkControlInputProps_Formik extends SystemNetworkControlInputProps, FormikProps<SystemNetworkControlInputModal> {
}

interface SystemNetworkControlInputState {
  isOpen: boolean;
}

class SystemNetworkControlForm extends React.PureComponent<SystemNetworkControlInputProps_Formik, SystemNetworkControlInputState> {
  constructor(props:SystemNetworkControlInputProps_Formik) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  _toggleOpen = () => {
    this.setState(
      produce<SystemNetworkControlInputState>(draft => {
        draft.isOpen = !draft.isOpen;
      })
    );
  }

  render() {
    const {openDialog, handleClose, isSubmitting, handleSubmit, errors, values, handleChange, onSubmit} = this.props;
    const {isOpen} = this.state;

    return (
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="system-dialog-title"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle id="system-dialog-title">
            Add a new store?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the store connection information for monitoring and management.
            </DialogContentText>
            <Grid container spacing={0}>
              {
                !values.checkHostIp &&
                (<Grid item xs={12}>
                  <Ipv4TextField
                    required
                    id="ip-address"
                    name="ipAddress"
                    label="Ip Address"
                    margin="normal"
                    helperText="Range (254.254.254.254)"
                    onChange={handleChange}
                    value={values.ipAddress}
                    error={(errors.ipAddress && errors.ipAddress !== '')}
                  />
                </Grid>)
              }
              {
                values.checkHostIp &&
                (<Grid item xs={12}>
                  <TextField
                    required
                    id="host-name"
                    name="hostname"
                    label="Hostname"
                    margin="normal"
                    onChange={handleChange}
                    helperText="Check non ip setting"
                    value={values.hostname}
                    error={(errors.hostname && errors.hostname !== '')}
                  />
                </Grid>)
              }
              <Grid item xs={12}>
                <FormControlLabel
                  id="check-host-ip"
                  name="checkHostIp"
                  control={
                    <Checkbox checked={values.checkHostIp} onChange={handleChange} />
                  }
                  label="Use hostname"
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Event Filter: </FormLabel>
                <Select
                  id="select-event-filter"
                  name="eventFilter"
                  open={isOpen}
                  onClose={this._toggleOpen}
                  onOpen={this._toggleOpen}
                  value={"15"}
                  onChange={handleChange}
                >
                  <MenuItem value={"3"}>FATAL</MenuItem>
                  <MenuItem value={"15"}>FATAL, CRITICAL</MenuItem>
                  <MenuItem value={"31"}>FATAL,CRITICAL,MINOR</MenuItem>
                  <MenuItem value={"127"}>FATAL,CRITICAL,MINOR,WARNING</MenuItem>
                  <MenuItem value={"1023"}>FATAL,CRITICAL,MINOR, WARNING, HARMLESS</MenuItem>
                  <MenuItem value={"2047"}>ALL</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Close
            </Button>
            <Button color="primary" type="submit" disabled={isSubmitting}>
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

const SystemNetworkControlInput = withFormik<SystemNetworkControlInputProps, SystemNetworkControlInputModal>({
  mapPropsToValues: props => {
    return {
      ipAddress: '',
      hostname: '',
      checkHostIp: true,
      eventFilter: 15
    };
  },
  validate: (values: SystemNetworkControlInputModal) => {
    let errors: FormikErrors<SystemNetworkControlInputModal> = {};
    const ipAddressRegexValidator = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;

    if(!values.checkHostIp) {
      if (!values.ipAddress) {
        errors.ipAddress = "Required";
      }
      else if(isIPAddressValid(values.ipAddress)) {
        errors.ipAddress = "Invalid IP, try (254.254.254.254)";
      }
    }

    if(values.checkHostIp) {
      if (!values.hostname) {
        errors.hostname = "Required";
      }
    }

    return errors;
  },

  handleSubmit: (values: SystemNetworkControlInputModal, formikBag: FormikBag<SystemNetworkControlInputProps,SystemNetworkControlInputModal>) => {
    formikBag.props.onSubmit({
      ipAddress: values.ipAddress?values.ipAddress:"0.0.0.0",
      hostname: values.hostname?values.hostname:"Empty",
      checkHostIp: values.checkHostIp,
      eventFilter: values.eventFilter
    });
    formikBag.resetForm();
    formikBag.props.handleClose();
  },
})(SystemNetworkControlForm);

export default SystemNetworkControlInput;
