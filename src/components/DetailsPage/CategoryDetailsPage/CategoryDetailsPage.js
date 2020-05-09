import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

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
  render() {
    const categoriesArray = this.props.recipeCategory.map((category) => {
      return <li key={category.category_id}>{category.category_name}</li>;
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
        <FormControl variant="outlined">
          <Select
            labelId="category"
            id="category"
            displayEmpty
            value={this.state.category_id}
            onChange={this.handleChange}
          >
            <MenuItem value="">Select a Category</MenuItem>
            {allCategoriesArray}
          </Select>
        </FormControl>
        <Button>Add Category</Button>
        <Grid container>
          <Grid>Categories:</Grid>
          <ur>{categoriesArray}</ur>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(CategoryDetailsPage);
