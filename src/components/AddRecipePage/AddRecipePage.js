import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Typography, Grid } from "@material-ui/core";
import { Button, IconButton } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { List, ListItem } from "@material-ui/core";
import swal from "sweetalert";

const styles = (theme) => ({
  margin: {
    marginBottom: 10,
    marginRight: 10,
  },
  listPadding: {
    paddingTop: 0,
    paddingBottom: 8,
  },
  buttonPadding: {
    paddingTop: 8,
    paddingBottom: 8,
  },
});

class AddRecipePage extends Component {
  state = {
    isLoading: false,
    recipe_name: "",
    description: "",
    total_time: "",
    hours: "",
    minutes: "",
    serving_size: "",
    image_url: "",
    recipe_url: "",
    ingredient: ["", "", "", "", "", "", ""],
    instruction: [{}, {}, {}, {}],
  };

  handleRecipeDetailsChange = (event, propertyKey) => {
    this.setState({
      ...this.state,
      [propertyKey]: event.target.value,
    });
  };

  handleIngredientItemChange = (event, index) => {
    let newIngredientArray = [...this.state.ingredient];
    newIngredientArray[index] = event.target.value;
    this.setState({
      ...this.state,
      ingredient: [...newIngredientArray],
    });
  };

  handleInstructionChange = (event, index) => {
    let newInstructionArray = [...this.state.instruction];
    newInstructionArray[index] = {
      instruction_number: index + 1,
      instruction_description: event.target.value,
    };
    this.setState({
      ...this.state,
      instruction: [...newInstructionArray],
    });
  };

  clickAddRecipe = (event) => {
    console.log("Add Recipe From URL Clicked");
    if (this.state.recipe_url) {
      this.setState({
        isLoading: true,
      });
      axios({
        method: "POST",
        url: "https://mycookbook-io1.p.rapidapi.com/recipes/rapidapi",
        headers: {
          "content-type": "text/plain",
          "x-rapidapi-host": "mycookbook-io1.p.rapidapi.com",
          "x-rapidapi-key":
            "545712eeecmsh555676176f5dcd4p131071jsn90a7368f1e31",
          accept: "text/plain",
        },
        data: this.state.recipe_url,
      })
        .then((response) => {
          const data = response.data[0];
          console.log(data);
          let hours = "";
          let minutes = "";
          if (data["total-time"]) {
            hours = moment.duration(data["total-time"]).hours();
            minutes = moment.duration(data["total-time"]).minutes();
          }
          const instructionsArray = data.instructions[0].steps.map(
            (instruction, index) => {
              return {
                instruction_number: index + 1,
                instruction_description: instruction,
              };
            }
          );
          this.setState(
            {
              recipe_name: data.name,
              description: data.description,
              total_time: data["total-time"],
              hours: hours,
              minutes: minutes,
              serving_size: data.yield,
              image_url: data.images[0],
              // recipe_url: data.url,
              ingredient: data.ingredients,
              instruction: instructionsArray,
              isLoading: false,
            },
            () => {
              console.log(this.state);
            }
          );
        })
        .catch((error) => {
          this.setState({
            isLoading: false,
          });
          swal(
            "Add recipe from URL did not work, please check the URL and try again!"
          );
          console.log("Post call to RapidAPI request failed: ", error);
        });
    } else {
      swal("Please add an URL!");
    }
  };

  addIngredientItemInput = (event) => {
    this.setState({
      ...this.state,
      ingredient: [...this.state.ingredient, ""],
    });
  };

  addInstructionDescriptionInput = (event) => {
    this.setState({
      ...this.state,
      instruction: [...this.state.instruction, {}],
    });
  };

  saveNewRecipe = (event) => {
    // filter out the empty strings in ingredient array
    let newIngArray = this.state.ingredient.filter((ingredient) => ingredient);
    // filter out the empty strings in instruction array
    let newInsArray = this.state.instruction.filter(
      (instruction) => instruction.instruction_description
    );
    // requires input fields for recipe name, ingredient and instruction
    if (
      this.state.recipe_name &&
      newIngArray.length > 0 &&
      newInsArray.length > 0
    ) {
      this.setState({
        isLoading: true,
      });
      // replace any single quote with two single quotes to not cause bug with SQL
      newIngArray = newIngArray.map((ingredient) =>
        ingredient.replace(/'/g, "''")
      );
      // replace any single quote with two single quotes to not cause bug with SQL
      newInsArray = newInsArray.map((instruction) => {
        return {
          instruction_number: instruction.instruction_number,
          instruction_description: instruction.instruction_description.replace(
            /'/g,
            "''"
          ),
        };
      });
      // convert time into iso 8601 string ti be saved in database
      let totalCookTime = this.state.total_time;
      if (this.state.hours || this.state.minutes) {
        const totalMinutes = this.state.hours * 60 + this.state.minutes;
        totalCookTime = moment.duration(totalMinutes, "m").toISOString();
      }
      // create new recipe object data to be sent to database
      const newRecipeData = {
        recipe_name: this.state.recipe_name.replace(/'/g, "''"),
        description: this.state.description.replace(/'/g, "''"),
        serving_size: this.state.serving_size,
        image_url: this.state.image_url,
        recipe_url: this.state.recipe_url,
        total_time: totalCookTime,
        ingredient: newIngArray,
        instruction: newInsArray,
      };
      console.log(newRecipeData);
      this.props.dispatch({
        type: "SAVE_NEW_RECIPE",
        payload: newRecipeData,
      });
    } else {
      swal("Please add a recipe name, ingredient and instruction!");
    }
  };
  render() {
    const { classes } = this.props;
    const ingredientsArray = this.state.ingredient.map((ingredient, index) => {
      return (
        <ListItem key={index} classes={{ root: classes.listPadding }}>
          <TextField
            value={ingredient}
            inputProps={{ maxLength: 255 }}
            variant="outlined"
            size="small"
            fullWidth
            label="Ingredient"
            onChange={(event) => this.handleIngredientItemChange(event, index)}
          />
        </ListItem>
      );
    });

    const instructionsArray = this.state.instruction.map(
      (instruction, index) => {
        return (
          <ListItem key={index} classes={{ root: classes.listPadding }}>
            <Typography>Step {index + 1}. </Typography>
            <TextField
              value={instruction.instruction_description}
              variant="outlined"
              inputProps={{ maxLength: 1000 }}
              fullWidth
              multiline
              rows={2}
              label="Instruction"
              onChange={(event) => this.handleInstructionChange(event, index)}
            />
          </ListItem>
        );
      }
    );

    if (this.props.savedRecipeId.length > 0) {
      this.props.history.push(
        `/details/${this.props.savedRecipeId[0].recipe_id}`
      );
    }

    return (
      <div>
        {this.state.isLoading ? (
          <div className="loader"></div>
        ) : (
          <Grid>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={10}>
                <TextField
                  value={this.state.recipe_url}
                  variant="outlined"
                  inputProps={{ maxLength: 2083 }}
                  multiline
                  fullWidth
                  size="small"
                  label="Enter Recipe URL From Website"
                  onChange={(event) =>
                    this.handleRecipeDetailsChange(event, "recipe_url")
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <Button variant="outlined" onClick={this.clickAddRecipe}>
                  Add Recipe From URL
                </Button>
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Typography variant="subtitle1">Recipe Name</Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  value={this.state.recipe_name}
                  inputProps={{ maxLength: 255 }}
                  variant="outlined"
                  multiline
                  fullWidth
                  size="small"
                  label="Recipe Name"
                  className={classes.margin}
                  onChange={(event) =>
                    this.handleRecipeDetailsChange(event, "recipe_name")
                  }
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Typography variant="subtitle1">Total Cook Time</Typography>
              </Grid>
              <TextField
                value={this.state.hours}
                variant="outlined"
                label="Hours"
                type="number"
                size="small"
                className={classes.margin}
                onChange={(event) =>
                  this.handleRecipeDetailsChange(event, "hours")
                }
              />{" "}
              <TextField
                value={this.state.minutes}
                variant="outlined"
                label="Minutes"
                type="number"
                size="small"
                className={classes.margin}
                onChange={(event) =>
                  this.handleRecipeDetailsChange(event, "minutes")
                }
              />
              <Grid item>
                <Typography variant="subtitle1">Servings</Typography>
              </Grid>
              <TextField
                value={this.state.serving_size}
                inputProps={{ maxLength: 80 }}
                variant="outlined"
                size="small"
                className={classes.margin}
                label="Servings"
                onChange={(event) =>
                  this.handleRecipeDetailsChange(event, "serving_size")
                }
              />
            </Grid>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Typography variant="subtitle1">Image URL</Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  value={this.state.image_url}
                  variant="outlined"
                  inputProps={{ maxLength: 2083 }}
                  multiline
                  fullWidth
                  size="small"
                  label="Enter URL for Recipe Image"
                  className={classes.margin}
                  onChange={(event) =>
                    this.handleRecipeDetailsChange(event, "image_url")
                  }
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Typography variant="subtitle1">Description</Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  value={this.state.description}
                  inputProps={{ maxLength: 1000 }}
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  label="Description"
                  onChange={(event) =>
                    this.handleRecipeDetailsChange(event, "description")
                  }
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={5}>
                <Typography variant="subtitle1">
                  Ingredients{" "}
                  <IconButton
                    classes={{ root: classes.buttonPadding }}
                    onClick={this.addIngredientItemInput}
                    // disabled={this.state.disabled}
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Typography>
                <List>{ingredientsArray}</List>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="subtitle1">
                  Instructions
                  <IconButton
                    classes={{ root: classes.buttonPadding }}
                    onClick={this.addInstructionDescriptionInput}
                    // disabled={this.state.disabled}
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Typography>
                <List>{instructionsArray}</List>
              </Grid>
            </Grid>
            <div styles={{ display: "block" }}>
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="flex-start"
              >
                <Button variant="outlined" onClick={this.saveNewRecipe}>
                  Save Recipe
                </Button>
              </Grid>
            </div>
          </Grid>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(connect(mapStoreToProps)(AddRecipePage));
