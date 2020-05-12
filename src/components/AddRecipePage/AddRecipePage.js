import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

class AddRecipePage extends Component {
  state = {
    heading: "Class Component",
  };

  render() {
    return (
      <Grid>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField
              variant="outlined"
              multiline
              fullWidth
              label="Enter Recipe URL From Website"
              // onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <Button>Add Recipe From URL</Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStoreToProps)(AddRecipePage);
