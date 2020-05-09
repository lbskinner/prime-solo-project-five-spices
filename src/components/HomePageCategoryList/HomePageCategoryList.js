import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { List, ListItem, ListItemText } from "@material-ui/core";

class HomePageCategoryList extends Component {
  state = {
    heading: "Class Component",
  };

  handleClick = (category_id) => (event) => {
    this.props.dispatch({
      type: "GET_RECIPES_BY_CATEGORY",
      payload: category_id,
    });
  };
  render() {
    const categoryArray = this.props.categoryList.map((category) => {
      return (
        <span style={{ cursor: "pointer" }}>
          <ListItem
            key={category.category_id}
            onClick={this.handleClick(category.category_id)}
          >
            <ListItemText primary={category.category_name} />
          </ListItem>
        </span>
      );
    });
    return <List>{categoryArray}</List>;
  }
}

export default connect(mapStoreToProps)(HomePageCategoryList);
