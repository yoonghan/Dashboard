`use strict`

import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Ipv4TextField from '../../Ipv4TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { withFormik, FormikProps, FormikErrors, FormikBag } from 'formik';

import green from '@material-ui/core/colors/green';

import {isIPAddressValid} from '../../../const/validatorRegex';
import ButtonPopupMenu from "../../ButtonPopupMenu";

const height = 32;
const styles = (theme:Theme) => createStyles({
  root: {
    height: height
  },
  chip: {
    height: height,
    width: height
  },
  inset: {
    padding: "10px",
  },
  statusOk: {
    backgroundColor: green[600]
  }
})

export interface SystemNetworkInfoInputModal {
  storeName: string;
  ipAddress: string;
  hostname: string;
}

interface SystemNetworkInfoProps extends WithStyles<typeof styles> {
  storeName: string;
  ipAddress: string;
  hostname: string;
  openSideBar: boolean;
  handleClose: () => void;
  handleMoreInfoOnClick: () => void;
}

interface SystemNetworkInfoProps_Formik extends SystemNetworkInfoProps, FormikProps<SystemNetworkInfoInputModal> {
}

const SystemNetworkInfoForm: React.SFC<SystemNetworkInfoProps_Formik> =
    ({openSideBar, handleClose, handleMoreInfoOnClick, isSubmitting, handleSubmit, errors, values, handleChange, classes}) => {

  return (
    <Drawer anchor="right" open={openSideBar} onClose={handleClose}>
      <form onSubmit={handleSubmit} className={classes.inset}>
        <FormControl component="fieldset">
          <FormGroup>
            <FormLabel>Connection Information</FormLabel>
            <Chip label="OK" className={`${classes.chip} ${classes.statusOk}`}/>
          </FormGroup>
          <Divider inset/>
          <FormGroup>
            <Button variant="contained" color="primary" disabled={isSubmitting} onClick={handleMoreInfoOnClick}>
              More Info
            </Button>

            <ButtonPopupMenu
              id = "actions"
              btnLabel = "Actions..."
              options = {
                [
                  { label: "Shutdown", handleClick: () => {} },
                  { label: "Restart", handleClick: () => {} },
                  { label: "Suspend", handleClick: () => {} },
                  { label: "Wakeup on Lan", handleClick: () => {} }
                ]
              }
            />
            <Divider/>
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
            <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
              Update
            </Button>
            <Button variant="contained" color="secondary" type="submit" disabled={isSubmitting}>
              Remove
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Drawer>
  );
}

const SystemNetworkInfo = withFormik<SystemNetworkInfoProps, SystemNetworkInfoInputModal>({
  mapPropsToValues: props => {
    return {
      storeName: props.storeName || '',
      ipAddress: props.ipAddress || '',
      hostname: props.hostname || ''
    };
  },
  validate: (values: SystemNetworkInfoInputModal) => {
    let errors: FormikErrors<SystemNetworkInfoInputModal> = {};

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

  handleSubmit: (values: SystemNetworkInfoInputModal, formikBag: FormikBag<SystemNetworkInfoInputModal,SystemNetworkInfoInputModal>) => {

  },
})(SystemNetworkInfoForm);

export default withStyles(styles)(SystemNetworkInfo);
