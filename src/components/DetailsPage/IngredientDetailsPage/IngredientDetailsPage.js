import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import Typography from "@material-ui/core/Typography";

class IngredientDetailsPage extends Component {
  render() {
    const ingredientsArray = this.props.recipeIngredients.map((ingredient) => {
      return (
        <li key={ingredient.ingredient_id}>{ingredient.ingredient_item}</li>
      );
    });
    return (
      <div>
        <Typography variant="h5">Ingredients</Typography>
        <ul>{ingredientsArray}</ul>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(IngredientDetailsPage);
