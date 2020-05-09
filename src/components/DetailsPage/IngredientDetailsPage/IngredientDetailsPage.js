import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import Typography from "@material-ui/core/Typography";
import { List, ListItem, ListItemText } from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";

class IngredientDetailsPage extends Component {
  render() {
    const { classes } = this.props;
    const ingredientsArray = this.props.recipeIngredients.map((ingredient) => {
      return (
        <ListItem key={ingredient.ingredient_id}>
          <ListItemIcon>
            <Checkbox disableRipple />
          </ListItemIcon>
          <ListItemText primary={ingredient.ingredient_item} />
        </ListItem>
      );
    });
    return (
      <div>
        <Typography variant="h5">Ingredients</Typography>
        <List>{ingredientsArray}</List>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(IngredientDetailsPage);
