import *as React from 'react';
import { storiesOf } from '@storybook/react';
import HelperPanel from '../src/components/HelperPanel';

storiesOf('Helpers', module)
  .add('HelperPanel', () => (
    <HelperPanel instructionTitle={"Function"}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </HelperPanel>
  ))
