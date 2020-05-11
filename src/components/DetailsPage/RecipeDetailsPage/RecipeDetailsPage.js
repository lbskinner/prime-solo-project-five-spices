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
    hour: "",
    minute: "",
  };

  handleChange = (event, propertyKey) => {
    this.setState(
      {
        ...this.state,
        [propertyKey]: event.target.value,
      },
      () => {
        console.log(this.state);
      }
    );
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
    let saveObject = {
      ...this.state,
    };
    if (this.state.recipe_name == null || this.state.recipe_name == "") {
      saveObject.recipe_name = recipe.recipe_name;
    }
    if (this.state.serving_size == null || this.state.serving_size == "") {
      saveObject.serving_size = recipe.serving_size;
    }
    if (this.state.description == null || this.state.description == "") {
      saveObject.description = recipe.description;
    }
    if (this.state.image_url == null || this.state.image_url == "") {
      saveObject.image_url = recipe.image_url;
    }
    if (
      (this.state.hours == null || this.state.hours == "") &&
      (this.state.minutes == null || this.state.minutes == "")
    ) {
      saveObject.total_time = recipe.total_time;
    } else {
    }
  };
  render() {
    const { classes } = this.props;
    const recipe = this.props.recipeDetails[0];
    // convert time format (ISO8601 String) in database to hours and minutes
    const totalCookMinutes = moment.duration(recipe.total_time).asMinutes();
    let totalTime = `${totalCookMinutes} min`;
    let hours = 0;
    let minutes = totalTime;
    if (totalCookMinutes >= 60) {
      hours = Math.floor(totalCookMinutes / 60);
      minutes = totalCookMinutes % 60;
      totalTime = `${hours} hr ${minutes} min`;
    }
    console.log(moment.duration(totalTime).toISOString());
    console.log(JSON.stringify(totalTime));
    console.log(moment(totalTime, [moment.ISO_8601]));

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
                      defaultValue={hours}
                      variant="outlined"
                      label="Hours"
                      size="small"
                      className={classes.timeInput}
                    />{" "}
                    <TextField
                      defaultValue={minutes}
                      variant="outlined"
                      label="Minutes"
                      size="small"
                      className={classes.timeInput}
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
