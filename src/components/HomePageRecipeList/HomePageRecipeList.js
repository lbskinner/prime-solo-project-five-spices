import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

class HomePageRecipeList extends Component {
  state = {
    heading: "Class Component",
  };

  render() {
    const recipesArray = this.props.allRecipes.map((recipe) => {
      return <div key={recipe.recipe_id}>{recipe.recipe_name}</div>;
    });
    return <div>{recipesArray}</div>;
  }
}

export default connect(mapStoreToProps)(HomePageRecipeList);
