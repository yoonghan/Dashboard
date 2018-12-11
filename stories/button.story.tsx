import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '@material-ui/core/Button';
import ButtonGroup from "../src/components/ButtonGroup";

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
  ))
  .add('Button in Groups', () => (
    <ButtonGroup>
      <Button color="primary" aria-label="Add" variant={"contained"}>
        Save
      </Button>
      <Button color="secondary" aria-label="Cancel" variant={"contained"}>
        Cancel
      </Button>
    </ButtonGroup>
  ));
