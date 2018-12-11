`use strict`

import * as React from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { SearchConsumer } from "../../../shared/Context";
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

const styles = (theme:Theme) => createStyles({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 5,
    transition: theme.transitions.create('width')
  },
  searchIcon: {
    width: theme.spacing.unit * 5,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

interface SearchFieldProps extends WithStyles<typeof styles> {
}

class SearchField extends React.PureComponent<SearchFieldProps, {}> {
  onSearchTextChange = (onSuperChangeText:(text:string) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    onSuperChangeText(text);
  }

  render() {
    const {classes} = this.props;

    return (
      <SearchConsumer>
      { consumerData => (
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              inputProps={{className:"tabable", tabIndex:1000}}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              type={"search"}
              onFocus={()=>consumerData.toggleSearchMode(true)}
              onKeyDown={()=>consumerData.toggleSearchMode(true)}
              onChange={this.onSearchTextChange(consumerData.changeSearchText)}
            />
          </div>
        )
      }
      </SearchConsumer>
    );
  }
}

export default withStyles(styles)(SearchField);
