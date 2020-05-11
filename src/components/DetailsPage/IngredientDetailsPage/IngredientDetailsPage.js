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

const styles = (theme) => ({
  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
  },
  margin: {
    marginBottom: 10,
  },
});

class IngredientDetailsPage extends Component {
  state = {
    ingredient_item: "",
    ingredient_id: "",
    disabled: false,
  };

  clickDeleteButton = (ingredient_id) => (event) => {
    console.log(ingredient_id);
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

  clickSaveButton = (ingredient_id, recipe_id, index) => (event) => {
    console.log(ingredient_id, recipe_id, index);
    let ingredientObject = {
      ...this.state,
      recipe_id: recipe_id,
    };
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
            {this.state.ingredient_id === ingredient.ingredient_id ? (
              <TextField
                defaultValue={ingredient.ingredient_item}
                variant="outlined"
                label="Ingredient"
                onChange={this.handleChange}
              />
            ) : (
              <ListItemText primary={ingredient.ingredient_item} />
            )}
            {this.state.ingredient_id == ingredient.ingredient_id ? (
              <IconButton
                classes={{ root: classes.listItem }}
                onClick={this.clickSaveButton(
                  ingredient.ingredient_id,
                  ingredient.recipe_id,
                  index
                )}
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
    return (
      <div>
        <Typography variant="h5" classes={{ root: classes.margin }}>
          Ingredients{" "}
          <IconButton>
            <AddCircleOutlineIcon />
          </IconButton>
        </Typography>
        <List disablePadding={true}>{ingredientsArray}</List>
      </div>
    );
  }
}

export default withStyles(styles)(
  connect(mapStoreToProps)(IngredientDetailsPage)
);
