import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '@material-ui/core/Button';

storiesOf('Button', module)
  .add('Float Button', () => (
    <React.Fragment>
      <Button variant="fab" color="primary" aria-label="Add">
        Add
      </Button>
      <Button variant="fab" color="secondary" aria-label="Edit">
        Edit
      </Button>
    </React.Fragment>
  ));
