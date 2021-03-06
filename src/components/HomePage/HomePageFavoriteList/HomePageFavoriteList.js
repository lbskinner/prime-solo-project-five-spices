import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { withRouter } from "react-router-dom";

class HomePageFavoriteList extends Component {
  state = {
    heading: "Class Component",
  };

  handleClick = (recipe_id) => (event) => {
    this.props.dispatch({ type: "RESET_ALL_RECIPES_REDUCER" });
    this.props.history.push(`/details/${recipe_id}`);
  };
  render() {
    const favoriteArray = this.props.favoriteRecipes.map((recipe) => {
      return (
        <span key={recipe.recipe_id} style={{ cursor: "pointer" }}>
          <ListItem onClick={this.handleClick(recipe.recipe_id)} divider>
            <ListItemText primary={recipe.recipe_name} />
          </ListItem>
        </span>
      );
    });
    return <List>{favoriteArray}</List>;
  }
}

export default withRouter(connect(mapStoreToProps)(HomePageFavoriteList));
