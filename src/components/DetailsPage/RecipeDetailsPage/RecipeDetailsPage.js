import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FavoriteButton from "../FavoriteButtonDetailsPage/FavoriteButtonDetailsPage";

class RecipeDetailsPage extends Component {
  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <a
            href={this.props.recipeDetails[0].recipe_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Original Recipe Link
          </a>
          <Typography variant="h3">
            {this.props.recipeDetails[0].recipe_name}
          </Typography>
          <Typography>{`Total Cook Time: ${this.props.recipeDetails[0].total_time}`}</Typography>
          <Typography>{`Servings: ${this.props.recipeDetails[0].serving_size}`}</Typography>
          <Typography>
            Favorite: <FavoriteButton />
          </Typography>
          <Typography>{this.props.recipeDetails[0].description}</Typography>
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
    );
  }
}

export default connect(mapStoreToProps)(RecipeDetailsPage);
