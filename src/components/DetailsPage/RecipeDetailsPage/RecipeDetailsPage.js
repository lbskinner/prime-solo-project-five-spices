import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import FavoriteButton from "../FavoriteButtonDetailsPage/FavoriteButtonDetailsPage";
import CategoryDetailsPage from "../CategoryDetailsPage/CategoryDetailsPage";

class RecipeDetailsPage extends Component {
  clickDeleteButton = (recipe_id) => (event) => {
    console.log(recipe_id);
  };

  clickEditButton = (recipe_id) => (event) => {
    console.log(recipe_id);
  };
  render() {
    const recipe = this.props.recipeDetails[0];
    return (
      <div>
        <Link
          component="a"
          href={recipe.recipe_url}
          target="_blank"
          rel="noreferrer"
        >
          Original Recipe Link
        </Link>
        <Typography variant="h3">
          {recipe.recipe_name}{" "}
          <IconButton>
            <EditIcon onClick={this.clickEditButton(recipe.recipe_id)} />{" "}
          </IconButton>
          <IconButton>
            <DeleteIcon onClick={this.clickDeleteButton(recipe.recipe_id)} />
          </IconButton>
        </Typography>

        <br />
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Typography>{`Total Cook Time: ${recipe.total_time}`}</Typography>
            <Typography>{`Servings: ${recipe.serving_size}`}</Typography>
            <Typography>
              Favorite: <FavoriteButton />
            </Typography>
            <Typography>{recipe.description}</Typography>
          </Grid>
          <Grid item xs={4}>
            <CategoryDetailsPage />
          </Grid>
          <Grid item xs={4}>
            <br />
            <img
              src={recipe.image_url}
              alt={recipe.recipe_name}
              style={{ width: 300, height: 250 }}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RecipeDetailsPage);
