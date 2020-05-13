import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { List, ListItem } from "@material-ui/core";

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

  componentDidMount() {}

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
    if (!this.state.recipe_url) {
      alert("Please add an URL!");
    }
    this.props.dispatch({
      type: "POST_RECIPE_URL",
      payload: this.state.recipe_url,
    });
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

  // sendSaveRequest = async (newRecipeData) => {
  //   const result = await this.props.dispatch({
  //     type: "SAVE_NEW_RECIPE",
  //     payload: newRecipeData,
  //   });
  //   while (this.props.savedRecipeId.length === 0) {
  //     continue;
  //   }
  //   console.log(this.props.savedRecipeId[0].recipe_id);
  //   // this.props.history.push(
  //   //   `/details/${this.props.savedRecipeId[0].recipe_id}`
  //   // );
  // };

  saveNewRecipe = (event) => {
    // filter out the empty strings in ingredient array
    const newIngArray = this.state.ingredient.filter(
      (ingredient) => ingredient
    );
    // filter out the empty strings in instruction array
    const newInsArray = this.state.instruction.filter(
      (instruction) => instruction.instruction_description
    );
    // convert time into iso 8601 string ti be saved in database
    let totalCookTime = "";
    if (this.state.hours || this.state.minutes) {
      const totalMinutes = this.state.hours * 60 + this.state.minutes;
      totalCookTime = moment.duration(totalMinutes, "m").toISOString();
    }
    // create new recipe object data to be sent to database
    let newRecipeData = {
      ...this.state,
      total_time: totalCookTime,
      ingredient: newIngArray,
      instruction: newInsArray,
    };
    console.log(newRecipeData);
    // required input fields for recipe name, ingredient and instruction
    if (
      !newRecipeData.recipe_name ||
      newRecipeData.ingredient.length === 0 ||
      newRecipeData.instruction.length === 0
    ) {
      alert("Please add a recipe name, ingredient and instruction!");
    }
    this.props.dispatch({
      type: "SAVE_NEW_RECIPE",
      payload: newRecipeData,
    });
    if (this.props.savedRecipeId.length > 0) {
      this.props.history.push("/home");
    }
    // still need to work on waiting for the inform to save before anything else
    // while (this.props.savedRecipeId.length === 0) {
    //   continue;
    // }
    // console.log(this.props.savedRecipeId[0].recipe_id);
    // this.props.history.push(
    //   `/details/${this.props.savedRecipeId[0].recipe_id}`
    // );
  };
  render() {
    const { classes } = this.props;
    const ingredientsArray = this.state.ingredient.map((ingredient, index) => {
      return (
        <ListItem key={index} classes={{ root: classes.listPadding }}>
          <TextField
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
              variant="outlined"
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
    return (
      <Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={10}>
            <TextField
              variant="outlined"
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
            // defaultValue={moment.duration(recipe.total_time).hours()}
            variant="outlined"
            label="Hours"
            type="number"
            size="small"
            className={classes.margin}
            onChange={(event) => this.handleRecipeDetailsChange(event, "hours")}
          />{" "}
          <TextField
            // defaultValue={moment
            //   .duration(recipe.total_time)
            //   .minutes()}
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
              variant="outlined"
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
              // defaultValue={recipe.description}
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
      </Grid>
    );
  }
}

export default withStyles(styles)(connect(mapStoreToProps)(AddRecipePage));
