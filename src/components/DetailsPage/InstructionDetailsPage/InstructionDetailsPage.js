import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import Typography from "@material-ui/core/Typography";

class InstructionDetailsPage extends Component {
  render() {
    const instructionsArray = this.props.recipeInstructions.map(
      (instruction) => {
        return (
          <li key={instruction.instruction_id}>
            Step {instruction.instruction_number}{" "}
            {instruction.instruction_description}
          </li>
        );
      }
    );
    return (
      <div>
        <Typography variant="h5">Instructions</Typography>
        <ul>{instructionsArray}</ul>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(InstructionDetailsPage);
