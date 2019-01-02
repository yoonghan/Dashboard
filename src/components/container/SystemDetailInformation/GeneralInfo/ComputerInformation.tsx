`use strict`

import * as React from 'react';
import produce from "immer";
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '../../../TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ButtonGroup from "../../../ButtonGroup";
import PanelTitleBar from "../../../PanelTitleBar";
import {EnumTitleType} from "../../../PanelTitleBar";

const styles = (theme:Theme) => createStyles({
  root: {
  },
  editBtn: {
    margin: theme.spacing.unit * 4,
    marginTop: 0
  },
  expansionPanelSummary: {
    padding: 0
  },
  expansionPanelSummaryTitle: {
    margin: "0 !important"
  }
});

interface ComputerInformationProps extends WithStyles<typeof styles>{
}

interface ComputerInformationState {
  isEditMode: boolean;
}

class ComputerInformation extends React.PureComponent<ComputerInformationProps, ComputerInformationState> {
  private scrollToEditLocation = React.createRef<HTMLFormElement>();

  constructor(props:ComputerInformationProps) {
    super(props);
    this.state = {
      isEditMode: false
    }
  }

  componentDidUpdate(prevProp:ComputerInformationProps, prevState:ComputerInformationState) {
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
      produce<ComputerInformationState>(draft => {
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
                autoFocus
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
        <ExpansionPanel expanded >
          <ExpansionPanelSummary className={classes.expansionPanelSummary} classes={{
            content: classes.expansionPanelSummaryTitle
          }}>
            <PanelTitleBar titleType={EnumTitleType.EXPANSION}>Computer information</PanelTitleBar>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Generic System</TableCell>
                </TableRow>
                <TableRow selected={isEditMode}>
                  <TableCell>Description</TableCell>
                  <TableCell>{this._renderEditableComponent("RMA Agent Store Sample", "description")}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>IP Address</TableCell>
                  <TableCell>192.168.169.143</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Communication State</TableCell>
                  <TableCell>Unauthorized</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Created Date</TableCell>
                  <TableCell>Dec 5, 2018 3:21:21PM</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Dedicated</TableCell>
                  <TableCell>RMA General Agent</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Detailed State</TableCell>
                  <TableCell>Terminated</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>MAC Address</TableCell>
                  <TableCell>00:DA:DD:FF:2E</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Model</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Query Vital Properties Interval</TableCell>
                  <TableCell>Disabled</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>RMA Version</TableCell>
                  <TableCell>RMA V3R1.2</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>State</TableCell>
                  <TableCell>Available</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Verify Connection Interval</TableCell>
                  <TableCell>Disabled</TableCell>
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

export default withStyles(styles)(ComputerInformation);
