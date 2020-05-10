import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FavoriteButton from "../FavoriteButtonDetailsPage/FavoriteButtonDetailsPage";
import CategoryDetailsPage from "../CategoryDetailsPage/CategoryDetailsPage";

const styles = (theme) => ({
  titleInputFontSize: {
    fontSize: 48,
  },
  position: {
    paddingTop: 6,
  },
  selectBox: {
    paddingTop: 8,
    paddingBottom: 8,
  },
});

class RecipeDetailsPage extends Component {
  state = {
    recipeDetailsAreEditable: false,
  };
  clickDeleteButton = (recipe_id) => (event) => {
    console.log(recipe_id);
  };

  clickEditButton = (recipe_id) => (event) => {
    console.log(recipe_id);
    this.setState({
      recipeDetailsAreEditable: true,
    });
  };

  clickSaveButton = (recipe_id) => (event) => {
    console.log(recipe_id);
    this.setState({
      recipeDetailsAreEditable: false,
    });
  };
  render() {
    const { classes } = this.props;
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
          {this.state.recipeDetailsAreEditable ? (
            <TextField
              defaultValue={recipe.recipe_name}
              variant="outlined"
              label="Recipe Name"
            />
          ) : (
            <span>{recipe.recipe_name} </span>
          )}
          <IconButton>
            <EditIcon onClick={this.clickEditButton(recipe.recipe_id)} />{" "}
          </IconButton>
          <IconButton>
            <SaveIcon onClick={this.clickSaveButton(recipe.recipe_id)} />{" "}
          </IconButton>
          <IconButton>
            <DeleteIcon onClick={this.clickDeleteButton(recipe.recipe_id)} />
          </IconButton>
        </Typography>

        <br />
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Typography>
              Total Cook Time:{" "}
              {this.state.recipeDetailsAreEditable ? (
                <span>
                  <TextField
                    defaultValue={recipe.total_time}
                    variant="outlined"
                    size="small"
                    label="Hours"
                  />
                  <TextField
                    defaultValue={recipe.total_time}
                    variant="outlined"
                    size="small"
                    label="Minutes"
                  />
                </span>
              ) : (
                <span>{recipe.total_time}</span>
              )}
            </Typography>

            <Typography>
              Servings:{" "}
              {this.state.recipeDetailsAreEditable ? (
                <TextField
                  defaultValue={recipe.serving_size}
                  variant="outlined"
                  size="small"
                  label="Servings"
                />
              ) : (
                <span>{recipe.serving_size}</span>
              )}
            </Typography>
            <Typography>
              Favorite: <FavoriteButton />
            </Typography>
            <Typography>
              {this.state.recipeDetailsAreEditable ? (
                <TextField
                  defaultValue={recipe.description}
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  label="Description"
                />
              ) : (
                <span>{recipe.description}</span>
              )}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <CategoryDetailsPage />
          </Grid>
          <Grid item xs={4}>
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

export default withStyles(styles)(connect(mapStoreToProps)(RecipeDetailsPage));
