`use strict`

import * as React from 'react';
import produce from "immer";
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ButtonGroup from "../../../ButtonGroup";

const styles = (theme:Theme) => createStyles({
  root: {
  },
  editBtn: {
    margin: theme.spacing.unit * 4,
    marginTop: 0
  }
});

interface LocationProps extends WithStyles<typeof styles>{
}

interface LocationState {
  isEditMode: boolean;
}

class Location extends React.PureComponent<LocationProps, LocationState> {
  private scrollToEditLocation = React.createRef<HTMLFormElement>();

  constructor(props:LocationProps) {
    super(props);
    this.state = {
      isEditMode: false
    };
  }

  componentDidUpdate(prevProp:LocationProps, prevState:LocationState) {
    if(!prevState.isEditMode) {
    
      window.scrollTo(
        {
          top: (this.scrollToEditLocation as any).current.offsetTop,
          behavior: "smooth"
        }
      );
    }
  }

  toggleEditMode = () => {
    this.setState(
      produce<LocationState>(draft => {
        draft.isEditMode = !draft.isEditMode;
      })
    );
  }

  renderSaveButton = () => {
    const {classes} = this.props;
    const {isEditMode} = this.state;

    if(isEditMode) {
      return (
        <React.Fragment>
          <Button onClick={this.toggleEditMode} color="secondary" variant={"contained"}>
            Cancel
          </Button>
          <Button onClick={()=>{}} color="primary" variant={"contained"}>
            Save
          </Button>
        </React.Fragment>
      );
    }
    else {
      return (
        <Button onClick={this.toggleEditMode} color="secondary" variant={"contained"}>
          Edit
        </Button>
      )
    }
  }

  _renderEditableComponent = (value:string, id:string) => {
    const {isEditMode} = this.state;

    if(isEditMode) {
      return (
        <FormControl component="div" fullWidth={true}>
          <FormGroup>
            <TextField
                id={id}
                margin="normal"
                value={value}
                autoFocus={id==="telephone-number" ? true:false}
              />
          </FormGroup>
        </FormControl>
      );
    }
    else {
      return (
        <span>{value}</span>
      )
    }
  }

  render() {
    const {classes} = this.props;
    const {isEditMode} = this.state;

    return (
      <form ref={this.scrollToEditLocation}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
            <Typography>Location</Typography>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Resource Name</TableCell>
                  <TableCell>LAPTOP-23123D3</TableCell>
                </TableRow>
                <TableRow selected={isEditMode}>
                  <TableCell>Telephone number</TableCell>
                  <TableCell>{this._renderEditableComponent("", "telephone-number")}</TableCell>
                </TableRow>
                <TableRow selected={isEditMode}>
                  <TableCell>Extension</TableCell>
                  <TableCell>{this._renderEditableComponent("", "extension")}</TableCell>
                </TableRow>
                <TableRow selected={isEditMode}>
                  <TableCell>Country or religion</TableCell>
                  <TableCell>{this._renderEditableComponent("", "country-religion")}</TableCell>
                </TableRow>
                <TableRow selected={isEditMode}>
                  <TableCell>Street Address</TableCell>
                  <TableCell>{this._renderEditableComponent("", "street-address")}</TableCell>
                </TableRow>
                <TableRow selected={isEditMode}>
                  <TableCell>City</TableCell>
                  <TableCell>{this._renderEditableComponent("", "city")}</TableCell>
                </TableRow>
                <TableRow selected={isEditMode}>
                  <TableCell>State or province</TableCell>
                  <TableCell>{this._renderEditableComponent("", "state-province")}</TableCell>
                </TableRow>
                <TableRow selected={isEditMode}>
                  <TableCell>Postal code</TableCell>
                  <TableCell>{this._renderEditableComponent("", "postal-code")}</TableCell>
                </TableRow>
                <TableRow selected={isEditMode}>
                  <TableCell>Building</TableCell>
                  <TableCell>{this._renderEditableComponent("", "building")}</TableCell>
                </TableRow>
                <TableRow selected={isEditMode}>
                  <TableCell>Floor</TableCell>
                  <TableCell>{this._renderEditableComponent("", "floor")}</TableCell>
                </TableRow>
                <TableRow selected={isEditMode}>
                  <TableCell>Room number</TableCell>
                  <TableCell>{this._renderEditableComponent("", "room-number")}</TableCell>
                </TableRow>
                <TableRow selected={isEditMode}>
                  <TableCell>Row</TableCell>
                  <TableCell>{this._renderEditableComponent("", "row")}</TableCell>
                </TableRow>
                <TableRow selected={isEditMode}>
                  <TableCell>Aisle</TableCell>
                  <TableCell>{this._renderEditableComponent("", "aisle")}</TableCell>
                </TableRow>
                <TableRow selected={isEditMode}>
                  <TableCell>Displaced height(cm)</TableCell>
                  <TableCell>{this._renderEditableComponent("", "displaced-height")}</TableCell>
                </TableRow>
                <TableRow selected={isEditMode}>
                  <TableCell>Altitude</TableCell>
                  <TableCell>{this._renderEditableComponent("", "altitude")}</TableCell>
                </TableRow>
                <TableRow selected={isEditMode}>
                  <TableCell>Other information</TableCell>
                  <TableCell>{this._renderEditableComponent("", "other-information")}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </ExpansionPanelDetails>
          <ButtonGroup classes={{
            root: classes.editBtn
          }}>
            {this.renderSaveButton()}
          </ButtonGroup>
        </ExpansionPanel>
      </form>
    )
  }
}

export default withStyles(styles)(Location);
