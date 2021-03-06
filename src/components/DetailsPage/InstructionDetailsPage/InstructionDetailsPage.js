import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { List, ListItem, ListItemText } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";

const styles = (theme) => ({
  step: {
    minWidth: 75,
    // alignItems: "flex-start",
  },
  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
  },
  margin: {
    marginBottom: 10,
  },
  inputBox: {
    width: 300,
  },
});

class InstructionDetailsPage extends Component {
  state = {
    instruction_id: "",
    instruction_number: "",
    instruction_description: "",
    disabled: false,
    additionalInput: false,
  };

  // in order for step number to work correctly, the delete existing step feature is not included int he base mode, it will be a stretch feature
  // clickDeleteButton = (instruction_id) => (event) => {
  //   console.log(instruction_id);
  //   if (window.confirm("Are you sure you want to delete the instruction?")) {
  //     this.props.dispatch({
  //       type: "DELETE_INSTRUCTION_DESCRIPTION",
  //       payload: {
  //         instruction_id: instruction_id,
  //         recipe_id: this.props.match.params.id,
  //       },
  //     });
  //   }
  // };

  clickEditButton = (instruction_id) => (event) => {
    this.setState({
      instruction_id: instruction_id,
      disabled: true,
    });
  };

  handleChange = (event) => {
    this.setState({
      ...this.state,
      instruction_description: event.target.value,
    });
  };

  clickSaveToUpdateInstruction = (index) => (event) => {
    console.log(index);
    // create object for payload
    let instructionObject = {
      instruction_id: this.state.instruction_id,
      instruction_description: this.state.instruction_description,
      recipe_id: this.props.match.params.id,
    };
    // // if no changes are made to existing instruction description, use the existing ingredient item in reducer
    if (
      this.state.instruction_description == null ||
      this.state.instruction_description == ""
    ) {
      instructionObject.instruction_description = this.props.recipeIngredients[
        index
      ].instruction_description;
    }
    this.props.dispatch({
      type: "UPDATE_INSTRUCTION",
      payload: instructionObject,
    });
    this.setState({
      instruction_id: null,
      disabled: false,
      instruction_description: "",
    });
  };

  // when click the add button next to instructions, show a new input field
  addInstructionDescriptionInput = (event) => {
    this.setState({
      additionalInput: true,
      disabled: true,
    });
  };

  // click delete before save new instruction description, remove the additional input
  deleteAdditionalInput = (event) => {
    if (this.state.instruction_description) {
      swal("Are you sure you want to delete without save?", {
        buttons: ["No", "Yes"],
      }).then((value) => {
        if (value) {
          this.setState({
            additionalInput: false,
            disabled: false,
            instruction_description: "",
          });
        }
      });
    } else {
      this.setState({
        additionalInput: false,
        disabled: false,
        instruction_description: "",
      });
    }
  };

  // save new instruction description to existing recipe to database
  saveNewInstructionDescription = (stepNumber) => (event) => {
    if (
      this.state.instruction_description == null ||
      this.state.instruction_description == ""
    ) {
      alert("Please enter an instruction!");
      return;
    }
    let newInstructionObject = {
      instruction_number: stepNumber,
      instruction_description: this.state.instruction_description,
      recipe_id: this.props.match.params.id,
    };
    this.props.dispatch({
      type: "SAVE_NEW_INSTRUCTION_DESCRIPTION",
      payload: newInstructionObject,
    });
    this.setState({
      additionalInput: false,
      disabled: false,
      instruction_description: "",
    });
  };

  render() {
    const { classes } = this.props;
    const instructionsArray = this.props.recipeInstructions.map(
      (instruction, index) => {
        return (
          <ListItem key={instruction.instruction_id}>
            <Typography classes={{ root: classes.step }}>
              Step {instruction.instruction_number}.{" "}
            </Typography>
            {/* conditional rendering, only render the list item when the id equals to the id clicked */}
            {this.state.instruction_id === instruction.instruction_id ? (
              <TextField
                defaultValue={instruction.instruction_description}
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                label="Instruction"
                onChange={this.handleChange}
                autoFocus
                onFocus={(event) => {
                  const val = event.target.value;
                  event.target.value = "";
                  event.target.value = val;
                }}
              />
            ) : (
              <ListItemText primary={instruction.instruction_description} />
            )}
            {/* conditional rendering, only render the save button foe the list item when the id equals to the id clicked */}
            {this.state.instruction_id === instruction.instruction_id ? (
              <IconButton onClick={this.clickSaveToUpdateInstruction(index)}>
                <SaveIcon fontSize="small" />{" "}
              </IconButton>
            ) : (
              <IconButton
                onClick={this.clickEditButton(instruction.instruction_id)}
                disabled={this.state.disabled}
              >
                <EditIcon fontSize="small" />{" "}
              </IconButton>
            )}
            {/* in order for step number to work correctly, not allowing the user to delete steps
            this feature may be added later as a stretch feature
            <IconButton
              onClick={this.clickDeleteButton(instruction.instruction_id)}
              disabled={this.state.disabled}
            >
              <DeleteIcon fontSize="small" />
            </IconButton> */}
          </ListItem>
        );
      }
    );
    const stepNumber = this.props.recipeInstructions.length + 1;
    let additionalInput = (
      <ListItem>
        <Typography classes={{ root: classes.step }}>
          Step {stepNumber}.{" "}
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          label="Instruction"
          onChange={this.handleChange}
          autoFocus
        />
        <IconButton onClick={this.saveNewInstructionDescription(stepNumber)}>
          <SaveIcon fontSize="small" />{" "}
        </IconButton>
        <IconButton onClick={this.deleteAdditionalInput}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </ListItem>
    );
    return (
      <div>
        <Typography variant="h5">
          Instructions
          <IconButton
            onClick={this.addInstructionDescriptionInput}
            disabled={this.state.disabled}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Typography>
        <List>
          {instructionsArray}
          {this.state.additionalInput && additionalInput}
        </List>
      </div>
    );
  }
}

export default withRouter(
  withStyles(styles)(connect(mapStoreToProps)(InstructionDetailsPage))
);
