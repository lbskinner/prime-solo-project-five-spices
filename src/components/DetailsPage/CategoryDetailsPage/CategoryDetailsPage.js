import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
        <Grid container>
          <Grid>Categories:</Grid>
          <ur>{categoriesArray}</ur>
        </Grid>
        <FormControl variant="outlined">
          <InputLabel id="category">Select a Category</InputLabel>
          <Select
            labelId="category"
            id="category"
            value={this.state.category_id}
            onChange={this.handleChange}
            label="Category"
          >
            <MenuItem value="">None</MenuItem>
            {allCategoriesArray}
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(CategoryDetailsPage);
