import React, { Component } from "react";
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
    instruction: [
      {
        instruction_number: "",
        instruction_description: "",
      },
      {
        instruction_number: "",
        instruction_description: "",
      },
      {
        instruction_number: "",
        instruction_description: "",
      },
      {
        instruction_number: "",
        instruction_description: "",
      },
    ],
  };

  handleRecipeDetailsChange = (event, propertyKey) => {
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

  handleIngredientItemChange = (event) => {
    this.setState(
      {
        ...this.state,
        // can't do it this way, it's pushing every single letter into the array
        ingredient: [...this.state.ingredient, event.target.value],
      },
      () => {
        console.log(this.state.ingredient);
      }
    );
  };

  handleInstructionChange = (event) => {
    this.setState(
      {
        ...this.state,
        // can't do it this way, it's pushing every single letter as an object into the array
        instruction: [
          ...this.state.instruction,
          {
            instruction_number: "",
            instruction_description: event.target.value,
          },
        ],
      },
      () => {
        console.log(this.state.instruction);
      }
    );
  };

  clickAddRecipe = (event) => {
    console.log("Add Recipe From URL Clicked");
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
      instruction: [
        ...this.state.instruction,
        {
          instruction_number: "",
          instruction_description: "",
        },
      ],
    });
  };

  saveNewRecipe = (event) => {
    console.log("Clicked Save Recipe Button");
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
            onChange={this.handleIngredientItemChange}
          />
        </ListItem>
      );
    });

    const instructionsArray = this.state.instruction.map(
      (instruction, index) => {
        let stepNumber = index + 1;
        return (
          <ListItem key={index} classes={{ root: classes.listPadding }}>
            <Typography>Step {stepNumber}. </Typography>
            <TextField
              variant="outlined"
              fullWidth
              multiline
              rows={2}
              label="Instruction"
              onChange={(event) =>
                this.handleInstructionChange(event, stepNumber)
              }
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
