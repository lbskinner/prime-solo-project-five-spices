import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import Typography from "@material-ui/core/Typography";
import { List, ListItem, ListItemText } from "@material-ui/core";

class InstructionDetailsPage extends Component {
  render() {
    const instructionsArray = this.props.recipeInstructions.map(
      (instruction) => {
        return (
          <ListItem key={instruction.instruction_id}>
            <ListItemText
              primary={`Step ${instruction.instruction_number}.
              ${instruction.instruction_description}`}
            />
          </ListItem>
        );
      }
    );
    return (
      <div>
        <Typography variant="h5">Instructions</Typography>
        <List>{instructionsArray}</List>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(InstructionDetailsPage);
