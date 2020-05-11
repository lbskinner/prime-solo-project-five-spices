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
  timeInput: {
    width: 75,
  },
  servingInput: {
    width: 100,
  },
  margin: {
    marginTop: 4,
    marginBottom: 4,
  },
});

class RecipeDetailsPage extends Component {
  state = {
    recipeDetailsAreEditable: false,
    recipe_name: "",
    serving_size: "",
    description: "",
    image_url: "",
    total_time: "",
    hours: "",
    minutes: "",
  };

  handleChange = (event, propertyKey) => {
    this.setState({
      ...this.state,
      [propertyKey]: event.target.value,
    });
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
    const recipe = this.props.recipeDetails[0];
    console.log(recipe_id);
    this.setState({
      recipeDetailsAreEditable: false,
    });
    // create new object for payload to update recipe details
    let recipeDetailsObject = {
      ...this.state,
      recipe_id: recipe_id,
    };
    // if name is not changed, use recipe name in reducer
    if (this.state.recipe_name == null || this.state.recipe_name == "") {
      recipeDetailsObject.recipe_name = recipe.recipe_name;
    }
    // if serving size is not changed, use serving size in reducer
    if (this.state.serving_size == null || this.state.serving_size == "") {
      recipeDetailsObject.serving_size = recipe.serving_size;
    }
    // if description is not changed, use description in reducer
    if (this.state.description == null || this.state.description == "") {
      recipeDetailsObject.description = recipe.description;
    }
    // if image url is not changed, use  image url in reducer
    if (this.state.image_url == null || this.state.image_url == "") {
      recipeDetailsObject.image_url = recipe.image_url;
    }
    // if no changes made to hours
    let totalMinutes = 0;
    if (this.state.hours == null || this.state.hours == "") {
      // and not changed made to minutes
      if (this.state.minutes == null || this.state.minutes == "") {
        // set total time to the total time in reducer
        recipeDetailsObject.total_time = recipe.total_time;
      } else {
        // if no changes are made to hours and changes are made to minutes
        // take the hour from total time in reducer the add the minutes updated
        totalMinutes =
          moment.duration(recipe.total_time).hours() * 60 +
          parseFloat(this.state.minutes);
        recipeDetailsObject.total_time = moment
          .duration(totalMinutes, "m")
          .toISOString();
      }
    } else {
      // if changes are made to hours and no changes are made to minutes
      if (this.state.minutes == null || this.state.minutes == "") {
        // take minutes from total time in reducer and add the hours entered converted to minutes
        totalMinutes =
          parseFloat(this.state.hours) * 60 +
          moment.duration(recipe.total_time).minutes();
        recipeDetailsObject.total_time = moment
          .duration(totalMinutes, "m")
          .toISOString();
      } else {
        // if changes are made to hours and minutes
        totalMinutes =
          parseFloat(this.state.hours) * 60 + parseFloat(this.state.minutes);
        recipeDetailsObject.total_time = moment
          .duration(totalMinutes, "m")
          .toISOString();
      }
    }
    console.log(recipeDetailsObject);
    this.props.dispatch({
      type: "UPDATE_RECIPE_DETAILS",
      payload: recipeDetailsObject,
    });
  };
  render() {
    const { classes } = this.props;
    const recipe = this.props.recipeDetails[0];
    // convert time format (ISO8601 String) in database to hours and minutes
    // const totalCookMinutes = moment.duration(recipe.total_time).asMinutes();
    // let totalTime = `${totalCookMinutes} min`;
    // let hours = 0;
    // let minutes = totalCookMinutes;
    // if (totalCookMinutes >= 60) {
    //   hours = Math.floor(totalCookMinutes / 60);
    //   minutes = totalCookMinutes % 60;
    //   totalTime = `${hours} hr ${minutes} min`;
    // }
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
              onChange={(event) => this.handleChange(event, "recipe_name")}
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
                      defaultValue={moment.duration(recipe.total_time).hours()}
                      variant="outlined"
                      label="Hours"
                      type="number"
                      size="small"
                      className={classes.timeInput}
                      onChange={(event) => this.handleChange(event, "hours")}
                    />{" "}
                    <TextField
                      defaultValue={moment
                        .duration(recipe.total_time)
                        .minutes()}
                      variant="outlined"
                      label="Minutes"
                      type="number"
                      size="small"
                      className={classes.timeInput}
                      onChange={(event) => this.handleChange(event, "minutes")}
                    />
                  </div>
                ) : (
                  <Typography className={classes.margin}>
                    {moment.duration(recipe.total_time).hours() > 0 ? (
                      <span>
                        {moment.duration(recipe.total_time).hours()} hr{" "}
                        {moment.duration(recipe.total_time).minutes()} min
                      </span>
                    ) : (
                      <span>
                        {moment.duration(recipe.total_time).minutes()} min
                      </span>
                    )}
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
                    className={classes.servingInput}
                    label="Servings"
                    onChange={(event) =>
                      this.handleChange(event, "serving_size")
                    }
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
                onChange={(event) => this.handleChange(event, "description")}
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
                onChange={(event) => this.handleChange(event, "image_url")}
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
