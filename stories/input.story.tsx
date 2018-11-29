import *as React from 'react';
import { storiesOf } from '@storybook/react';
import TextField from '@material-ui/core/TextField';
import Ipv4TextField from '../src/components/Ipv4TextField';

storiesOf('Text Field', module)
  .add('Non border', () => (
    <React.Fragment>
      <TextField
          id="sample-name"
          label="Name"
          margin="normal"
        />
      <br/>
      <Ipv4TextField
        label="Ip Address"
      />
    </React.Fragment>
  ))
  .add('Border', () => (
    <React.Fragment>
    <TextField
        id="outlined-name"
        label="Name"
        margin="normal"
        variant="outlined"
      />
    </React.Fragment>
  ));
