import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { List, ListItem, ListItemText } from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router-dom";

const styles = (theme) => ({
  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
  },
  margin: {
    marginBottom: 10,
  },
  inputBox: {
    width: 300,
  },
});

class IngredientDetailsPage extends Component {
  state = {
    ingredient_item: "",
    ingredient_id: "",
    disabled: false,
    additionalInput: false,
  };

  clickDeleteButton = (ingredient_id) => (event) => {
    if (window.confirm("Are you sure you want to delete the ingredient?")) {
      this.props.dispatch({
        type: "DELETE_INGREDIENT_ITEM",
        payload: {
          ingredient_id: ingredient_id,
          recipe_id: this.props.match.params.id,
        },
      });
    }
  };

  clickEditButton = (ingredient_id) => (event) => {
    this.setState({
      ingredient_id: ingredient_id,
      disabled: true,
    });
  };

  handleChange = (event) => {
    this.setState({
      ...this.state,
      ingredient_item: event.target.value,
    });
  };

  // save updated ingredient to database
  clickSaveToUpdateIngredient = (index) => (event) => {
    // create object for payload
    let ingredientObject = {
      ingredient_item: this.state.ingredient_item,
      ingredient_id: this.state.ingredient_id,
      recipe_id: this.props.match.params.id,
    };
    // // if no changes are made to existing ingredient item, use the existing ingredient item in reducer
    if (
      this.state.ingredient_item == null ||
      this.state.ingredient_item == ""
    ) {
      ingredientObject.ingredient_item = this.props.recipeIngredients[
        index
      ].ingredient_item;
    }
    this.props.dispatch({
      type: "UPDATE_INGREDIENT",
      payload: ingredientObject,
    });
    this.setState({
      ingredient_id: null,
      disabled: false,
    });
  };

  // when click the add sign next to ingredients, show a new input field
  addIngredientItemInput = (event) => {
    this.setState({
      additionalInput: true,
      disabled: true,
    });
  };

  // click delete before save new ingredient item, remove the additional input
  deleteAdditionalInput = (event) => {
    if (window.confirm("Are you sure you want to delete without save?")) {
      this.setState({
        additionalInput: false,
        disabled: false,
      });
    }
  };

  // save new ingredient item to existing recipe to database
  saveNewIngredientItem = (event) => {
    let newIngredientObject = {
      ingredient_item: this.state.ingredient_item,
      recipe_id: this.props.match.params.id,
    };
    this.props.dispatch({
      type: "SAVE_NEW_INGREDIENT_ITEM",
      payload: newIngredientObject,
    });
    this.setState({
      additionalInput: false,
      disabled: false,
    });
  };
  render() {
    const { classes } = this.props;
    const ingredientsArray = this.props.recipeIngredients.map(
      (ingredient, index) => {
        return (
          <ListItem
            key={ingredient.ingredient_id}
            classes={{ root: classes.listItem }}
          >
            <ListItemIcon>
              <Checkbox disableRipple />
            </ListItemIcon>
            {/* conditional rendering, only render the list item when the id equals to the id clicked */}
            {this.state.ingredient_id === ingredient.ingredient_id ? (
              <TextField
                defaultValue={ingredient.ingredient_item}
                variant="outlined"
                label="Ingredient"
                onChange={this.handleChange}
                classes={{ root: classes.inputBox }}
              />
            ) : (
              <ListItemText primary={ingredient.ingredient_item} />
            )}
            {/* conditional rendering, only render the save button foe the list item when the id equals to the id clicked */}
            {this.state.ingredient_id == ingredient.ingredient_id ? (
              <IconButton
                classes={{ root: classes.listItem }}
                onClick={this.clickSaveToUpdateIngredient(index)}
              >
                <SaveIcon fontSize="small" />{" "}
              </IconButton>
            ) : (
              <IconButton
                classes={{ root: classes.listItem }}
                onClick={this.clickEditButton(ingredient.ingredient_id)}
                disabled={this.state.disabled}
              >
                <EditIcon fontSize="small" />{" "}
              </IconButton>
            )}
            <IconButton
              classes={{ root: classes.listItem }}
              onClick={this.clickDeleteButton(ingredient.ingredient_id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </ListItem>
        );
      }
    );
    let additionalInput = (
      <ListItem classes={{ root: classes.listItem }}>
        <ListItemIcon>
          <Checkbox disableRipple />
        </ListItemIcon>
        <TextField
          variant="outlined"
          label="Ingredient"
          onChange={this.handleChange}
          classes={{ root: classes.inputBox }}
        />
        <IconButton
          classes={{ root: classes.listItem }}
          onClick={this.saveNewIngredientItem}
        >
          <SaveIcon fontSize="small" />{" "}
        </IconButton>
        <IconButton
          classes={{ root: classes.listItem }}
          onClick={this.deleteAdditionalInput}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </ListItem>
    );
    return (
      <div>
        <Typography variant="h5" classes={{ root: classes.margin }}>
          Ingredients{" "}
          <IconButton
            onClick={this.addIngredientItemInput}
            disabled={this.state.disabled}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Typography>
        <List disablePadding={true}>
          {ingredientsArray}
          {this.state.additionalInput && additionalInput}
        </List>
      </div>
    );
  }
}

export default withRouter(
  withStyles(styles)(connect(mapStoreToProps)(IngredientDetailsPage))
);
