import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import FavoriteButton from "../FavoriteButtonDetailsPage/FavoriteButtonDetailsPage";

class RecipeDetailsPage extends Component {
  render() {
    const recipe = this.props.recipeDetails[0];
    return (
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Link
            component="a"
            href={recipe.recipe_url}
            target="_blank"
            rel="noreferrer"
          >
            Original Recipe Link
          </Link>
          <Typography variant="h3">{recipe.recipe_name}</Typography>
          <Typography>{`Total Cook Time: ${recipe.total_time}`}</Typography>
          <Typography>{`Servings: ${recipe.serving_size}`}</Typography>
          <Typography>
            Favorite: <FavoriteButton />
          </Typography>
          <Typography>{recipe.description}</Typography>
        </Grid>
        <Grid item xs={4}>
          <br />
          <img
            src={recipe.image_url}
            alt={recipe.recipe_name}
            style={{ width: 250, height: 250 }}
          />
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStoreToProps)(RecipeDetailsPage);