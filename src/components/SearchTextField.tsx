`use strict`

/**
 * Creates a helper Panel to list all children in an orderly manner.
 **/

import * as React from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = (theme:Theme) => createStyles({
  root: {
    marginLeft: theme.spacing.unit
  }
});

interface SearchTextFieldProps extends WithStyles<typeof styles> {
  callbackForSearchTextChanged: (searchText:string)=>void;
  handleSearchClick: ()=>void;
  displaySearchText: string;
  id?: string;
}

const SearchTextField: React.SFC<SearchTextFieldProps> =
      ({callbackForSearchTextChanged, handleSearchClick, displaySearchText, id, classes}) => {

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const text = event.target.value;
    callbackForSearchTextChanged(text);
  }

  return (
    <TextField
      className={classes.root}
      id={id}
      label={displaySearchText}
      variant="outlined"
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <Button variant="contained" color="primary" onClick={handleSearchClick}>
              Search
            </Button>
          </InputAdornment>
        ),
      }}
      />
  );
}

export default withStyles(styles)(SearchTextField);
