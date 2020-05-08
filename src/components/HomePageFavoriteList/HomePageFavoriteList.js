import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { List, ListItem, ListItemText } from "@material-ui/core";

class HomePageFavoriteList extends Component {
  state = {
    heading: "Class Component",
  };

  handleClick = (recipe_id) => (event) => {
    console.log(recipe_id);

    // this.props.dispatch({
    //   type: "GET_RECIPES_BY_CATEGORY",
    //   payload: category_id,
    // });
  };
  render() {
    const favoriteArray = this.props.favoriteRecipes.map((recipe) => {
      return (
        <ListItem
          key={recipe.recipe_id}
          onClick={this.handleClick(recipe.recipe_id)}
        >
          <ListItemText primary={recipe.recipe_name} />
        </ListItem>
      );
    });
    return <List>{favoriteArray}</List>;
  }
}

export default connect(mapStoreToProps)(HomePageFavoriteList);
