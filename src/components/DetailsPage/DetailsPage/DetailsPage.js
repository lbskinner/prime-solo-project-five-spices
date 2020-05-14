import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import Grid from "@material-ui/core/Grid";
import IngredientDetailsPage from "../IngredientDetailsPage/IngredientDetailsPage";
import InstructionDetailsPage from "../InstructionDetailsPage/InstructionDetailsPage";
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
    // clear that saved recipe id
    this.props.dispatch({ type: "CLEAR_SAVED_RECIPE_ID" });
  }
  render() {
    return (
      <div>
        <RecipeDetailsPage />
        <Grid container spacing={3}>
          <Grid item xs={5}>
            <IngredientDetailsPage />
          </Grid>
          <Grid item xs={7}>
            <InstructionDetailsPage />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(DetailsPage);
