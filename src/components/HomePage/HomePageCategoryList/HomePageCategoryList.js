import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import { List, ListItem, ListItemText } from "@material-ui/core";

class HomePageCategoryList extends Component {
  handleClick = (category_id) => (event) => {
    this.props.dispatch({ type: "RESET_ALL_RECIPES_REDUCER" });
    this.props.dispatch({
      type: "GET_RECIPES_BY_CATEGORY",
      payload: category_id,
    });
  };

  handleAllRecipesClick = (event) => {
    this.props.dispatch({ type: "RESET_ALL_RECIPES_REDUCER" });
    this.props.dispatch({ type: "GET_ALL_RECIPES" });
  };

  render() {
    const categoryArray = this.props.categoryList.map((category) => {
      return (
        <span key={category.category_id} style={{ cursor: "pointer" }}>
          <ListItem onClick={this.handleClick(category.category_id)} divider>
            <ListItemText primary={category.category_name} />
          </ListItem>
        </span>
      );
    });
    return (
      <List>
        <span key="All Recipes" style={{ cursor: "pointer" }}>
          <ListItem onClick={this.handleAllRecipesClick} divider>
            <ListItemText primary="All Recipes" />
          </ListItem>
        </span>
        {categoryArray}
      </List>
    );
  }
}

export default connect(mapStoreToProps)(HomePageCategoryList);
