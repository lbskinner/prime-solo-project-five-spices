import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

class FavoriteButton extends Component {
  clickFavorite = (recipe_id, favorite) => (event) => {
    console.log(recipe_id, favorite);
    const favoriteStatus = !favorite;
    this.props.dispatch({
      type: "UPDATE_DETAILS_PAGE_FAVORITE",
      payload: {
        recipe_id: recipe_id,
        favorite: favoriteStatus,
      },
    });
  };

  render() {
    const { classes } = this.props;
    const recipe = this.props.recipeDetails[0];
    return (
      <IconButton
        aria-label="add to favorites"
        onClick={this.clickFavorite(recipe.recipe_id, recipe.favorite)}
      >
        {recipe.favorite === true ? (
          <FavoriteIcon style={{ color: "red" }} />
        ) : (
          <FavoriteBorderIcon />
        )}
      </IconButton>
    );
  }
}

export default connect(mapStoreToProps)(FavoriteButton);
