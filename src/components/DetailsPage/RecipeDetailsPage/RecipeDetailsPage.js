import React, { Component } from "react";
import moment from "moment";
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
  titleInput: {
    marginTop: 10,
    width: 500,
    height: 50,
  },
  detailsInput: {
    width: 75,
  },
  margin: {
    marginTop: 4,
    marginBottom: 4,
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
    // convert time format (ISO8601 String) in database to hours and minutes
    const totalCookMinutes = moment.duration(recipe.total_time).asMinutes();
    let totalTime = `${totalCookMinutes} min`;
    if (totalCookMinutes >= 60) {
      let hour = Math.floor(totalCookMinutes / 60);
      let minutes = totalCookMinutes % 60;
      totalTime = `${hour} hr ${minutes} min`;
    }
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
              className={classes.titleInput}
            />
          ) : (
            <span>{recipe.recipe_name} </span>
          )}
          {this.state.recipeDetailsAreEditable ? (
            <IconButton onClick={this.clickSaveButton(recipe.recipe_id)}>
              <SaveIcon />{" "}
            </IconButton>
          ) : (
            <IconButton onClick={this.clickEditButton(recipe.recipe_id)}>
              <EditIcon />{" "}
            </IconButton>
          )}
          <IconButton onClick={this.clickDeleteButton(recipe.recipe_id)}>
            <DeleteIcon />
          </IconButton>
        </Typography>

        <br />
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Grid container spacing={1}>
              <Grid item>
                <Typography className={classes.margin}>
                  Total Cook Time:{" "}
                </Typography>
              </Grid>
              <Grid item>
                {this.state.recipeDetailsAreEditable ? (
                  <div>
                    <TextField
                      defaultValue={recipe.total_time}
                      variant="outlined"
                      label="Hours"
                      size="small"
                      className={classes.detailsInput}
                    />{" "}
                    <TextField
                      defaultValue={recipe.total_time}
                      variant="outlined"
                      label="Minutes"
                      size="small"
                      className={classes.detailsInput}
                    />
                  </div>
                ) : (
                  <Typography className={classes.margin}>
                    <span> {totalTime}</span>
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item>
                <Typography className={classes.margin}>Servings: </Typography>
              </Grid>
              <Grid item>
                {this.state.recipeDetailsAreEditable ? (
                  <TextField
                    defaultValue={recipe.serving_size}
                    variant="outlined"
                    size="small"
                    className={classes.detailsInput}
                    label="Servings"
                  />
                ) : (
                  <Typography className={classes.margin}>
                    {recipe.serving_size}
                  </Typography>
                )}
              </Grid>
            </Grid>

            <Typography>
              Favorite: <FavoriteButton />
            </Typography>
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
              <Typography>{recipe.description}</Typography>
            )}
          </Grid>
          <Grid item xs={4}>
            <CategoryDetailsPage />
          </Grid>
          <Grid item xs={4}>
            {this.state.recipeDetailsAreEditable ? (
              <TextField
                defaultValue={recipe.image_url}
                variant="outlined"
                label="Image URL"
                multiline
                rows={4}
                fullWidth
              />
            ) : (
              <img
                src={recipe.image_url}
                alt={recipe.recipe_name}
                style={{ width: 300, height: 250 }}
              />
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(connect(mapStoreToProps)(RecipeDetailsPage));
