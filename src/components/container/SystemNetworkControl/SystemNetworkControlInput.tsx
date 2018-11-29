`use strict`

import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { withFormik, FormikProps, FormikErrors, FormikBag } from 'formik';
import {isIPAddressValid} from '../../../const/validatorRegex';
import Ipv4TextField from '../../Ipv4TextField';

export interface SystemNetworkControlInputModal {
  storeName: string;
  ipAddress: string;
  hostname: string;
}

interface SystemNetworkControlInputProps {
  onSubmit: (output: SystemNetworkControlInputModal) => void;
  handleClose: () => void;
  openDialog: boolean;
}

interface SystemNetworkControlInputProps_Formik extends SystemNetworkControlInputProps, FormikProps<SystemNetworkControlInputModal> {
}

const SystemNetworkControlForm: React.SFC<SystemNetworkControlInputProps_Formik>
  = ({openDialog, handleClose, isSubmitting, handleSubmit, errors, values, handleChange, onSubmit}) => {

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      aria-labelledby="system-dialog-title"
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle id="system-dialog-title">
          Add a new Network?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the store connection information for monitoring.
          </DialogContentText>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <TextField
                required
                id="store-name"
                name="storeName"
                label="Store Name"
                margin="normal"
                onChange={handleChange}
                value={values.storeName}
                error={(errors.storeName && errors.storeName !== '')}
                />
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="host-name"
                name="hostname"
                label="Host Name"
                margin="normal"
                onChange={handleChange}
                value={values.hostname}
                error={(errors.hostname && errors.hostname !== '')}
              />
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

const SystemNetworkControlInput = withFormik<SystemNetworkControlInputProps, SystemNetworkControlInputModal>({
  mapPropsToValues: props => {
    return {
      storeName: '',
      ipAddress: '',
      hostname: ''
    };
  },
  validate: (values: SystemNetworkControlInputModal) => {
    let errors: FormikErrors<SystemNetworkControlInputModal> = {};
    const ipAddressRegexValidator = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;

    if (!values.storeName) {
      errors.storeName = 'Required';
    }

    if (!values.ipAddress) {
      errors.ipAddress = 'Required';
    }
    else if(isIPAddressValid(values.ipAddress)) {
      errors.ipAddress = 'Invalid IP, try (254.254.254.254)';
    }

    if (!values.hostname) {
      errors.hostname = 'Required';
    }
    return errors;
  },

  handleSubmit: (values: SystemNetworkControlInputModal, formikBag: FormikBag<SystemNetworkControlInputProps,SystemNetworkControlInputModal>) => {
    formikBag.props.onSubmit({
      storeName: values.storeName,
      ipAddress: values.ipAddress,
      hostname: values.hostname
    });
    formikBag.resetForm();
    formikBag.props.handleClose();
  },
})(SystemNetworkControlForm);

export default SystemNetworkControlInput;
