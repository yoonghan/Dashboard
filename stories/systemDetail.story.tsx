import *as React from 'react';
import { storiesOf } from '@storybook/react';
import TextField from '@material-ui/core/TextField';
import SystemDetailInformation from '../src/components/container/SystemDetailInformation';
import GeneralInfo from '../src/components/container/SystemDetailInformation/GeneralInfo';

storiesOf('Network Info', module)
  .add('Main', () => (
    <SystemDetailInformation/>
  ))
  .add('General Info', () => (
    <GeneralInfo/>
  ))
  ;
