import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IngredientDetailsPage from "../IngredientDetailsPage/IngredientDetailsPage";
import InstructionDetailsPage from "../InstructionDetailsPage/InstructionDetailsPage";
import CategoryDetailsPage from "../CategoryDetailsPage/CategoryDetailsPage";
import RecipeDetailsPage from "../RecipeDetailsPage/RecipeDetailsPage";

class DetailsPage extends Component {
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
    return (
      <div>
        <RecipeDetailsPage />
        <CategoryDetailsPage />
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <IngredientDetailsPage />
          </Grid>
          <Grid item xs={8}>
            <InstructionDetailsPage />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(DetailsPage);