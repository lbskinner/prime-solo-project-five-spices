import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

class RecipeDetailsPage extends Component {
  state = {
    recipe_id: this.props.match.params.id,
  };
  componentDidMount() {
    const recipe_id = this.props.match.params.id;
    // get recipes info
    this.props.dispatch({ type: "GET_RECIPE_DETAILS", payload: recipe_id });
    // get ingredients
    this.props.dispatch({ type: "GET_RECIPE_INGREDIENTS", payload: recipe_id });
    // get instructions
    this.props.dispatch({
      type: "GET_RECIPE_INSTRUCTIONS",
      payload: recipe_id,
    });
    // get category list
    this.props.dispatch({ type: "GET_CATEGORY_LIST" });
    // get category info for recipe
    this.props.dispatch({ type: "GET_RECIPE_CATEGORY", payload: recipe_id });
  }
  render() {
    const ingredientsArray = this.props.recipeIngredients.map((ingredient) => {
      return (
        <li key={ingredient.ingredient_id}>{ingredient.ingredient_item}</li>
      );
    });

    const instructionsArray = this.props.recipeInstructions.map(
      (instruction) => {
        return (
          <li key={instruction.instruction_id}>
            Step {instruction.instruction_number}{" "}
            {instruction.instruction_description}
          </li>
        );
      }
    );
    const categoriesArray = this.props.recipeCategory.map((category) => {
      return <li key={category.category_id}>{category.category_name}</li>;
    });
    return (
      <div>
        {this.props.recipeDetails.length > 0 && (
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <h2>{this.props.recipeDetails[0].recipe_name}</h2>
              <p>{this.props.recipeDetails[0].total_time}</p>
              <p>{this.props.recipeDetails[0].serving_size}</p>
              <p>{this.props.recipeDetails[0].description}</p>
            </Grid>
            <Grid item xs={4}>
              <br />
              <img
                src={this.props.recipeDetails[0].image_url}
                alt={this.props.recipeDetails[0].recipe_name}
                style={{ width: 250, height: 250 }}
              />
            </Grid>
          </Grid>
        )}
        <Grid container>
          <Grid>Category:</Grid>
          <ur>{categoriesArray}</ur>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={4}>
            <h3>Ingredients</h3>
            <ul>{ingredientsArray}</ul>
          </Grid>
          <Grid item xs={8}>
            <h3>Instructions</h3>
            <ul>{instructionsArray}</ul>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RecipeDetailsPage);
