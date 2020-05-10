import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { withRouter } from "react-router-dom";

const styles = (theme) => ({
  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
  },
  position: {
    paddingTop: 6,
  },
  selectBox: {
    paddingTop: 8,
    paddingBottom: 8,
  },
});

class CategoryDetailsPage extends Component {
  state = {
    category_id: "",
  };
  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({
      category_id: event.target.value,
    });
  };

  handleAddCategory = (event) => {
    console.log(this.state);
    if (!this.state.category_id) {
      alert("Please select a category to add!");
    } else {
      this.props.dispatch({
        type: "ADD_CATEGORY",
        payload: {
          ...this.state,
          recipe_id: this.props.match.params.id,
        },
      });
      this.setState({
        category_id: "",
      });
    }
  };

  clickDeleteButton = (recipe_category_id) => (event) => {
    console.log(recipe_category_id);
    this.props.dispatch({
      type: "DELETE_CATEGORY",
      payload: {
        recipe_category_id: recipe_category_id,
        recipe_id: this.props.match.params.id,
      },
    });
  };

  render() {
    const { classes } = this.props;
    const categoriesArray = this.props.recipeCategory.map((category) => {
      return (
        <ListItem
          key={category.category_id}
          classes={{ root: classes.listItem }}
        >
          <ListItemText primary={category.category_name} />
          <IconButton
            classes={{ root: classes.listItem }}
            onClick={this.clickDeleteButton(category.recipe_category_id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </ListItem>
      );
    });

    const allCategoriesArray = this.props.categoryList.map((category) => {
      return (
        <MenuItem key={category.category_id} value={category.category_id}>
          {category.category_name}
        </MenuItem>
      );
    });
    return (
      <div>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <FormControl variant="outlined">
            <Select
              labelId="category"
              id="category"
              displayEmpty
              value={this.state.category_id}
              onChange={this.handleChange}
              classes={{ root: classes.selectBox }}
            >
              <MenuItem value="">Select a Category</MenuItem>
              {allCategoriesArray}
            </Select>
          </FormControl>
          <IconButton
            aria-label="Add a Category"
            onClick={this.handleAddCategory}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Grid>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Typography classes={{ root: classes.position }}>
            Categories:
          </Typography>
          <List disablePadding={true}>{categoriesArray}</List>
        </Grid>
      </div>
    );
  }
}

export default withRouter(
  withStyles(styles)(connect(mapStoreToProps)(CategoryDetailsPage))
);
