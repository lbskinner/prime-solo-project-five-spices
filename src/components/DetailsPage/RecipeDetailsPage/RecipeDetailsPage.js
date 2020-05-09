import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

class RecipeDetailsPage extends Component {
  render() {
    return (
      <div>
        {this.props.recipeDetails.length > 0 && (
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <h2>{this.props.recipeDetails[0].recipe_name}</h2>
              <p>{this.props.recipeDetails[0].total_time}</p>
              <p>{this.props.recipeDetails[0].serving_size}</p>
              <p>{this.props.recipeDetails[0].description}</p>
            </Grid>
            <Grid item xs={4}>
              <br />
              <img
                src={this.props.recipeDetails[0].image_url}
                alt={this.props.recipeDetails[0].recipe_name}
                style={{ width: 250, height: 250 }}
              />
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RecipeDetailsPage);
