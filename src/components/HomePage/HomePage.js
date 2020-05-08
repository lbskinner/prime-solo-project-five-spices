import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { Typography, Grid } from "@material-ui/core";
import "./HomePage.css";
import HomePageCategoryList from "../HomePageCategoryList/HomePageCategoryList";
import HomePageFavoriteList from "../HomePageFavoriteList/HomePageFavoriteList";
import HomePageSearch from "../HomePageSearch/HomePageSearch";
import HomePageRecipeList from "../HomePageRecipeList/HomePageRecipeList";

class HomePage extends Component {
  state = {
    heading: "Class Component",
  };

  componentDidMount() {
    this.props.dispatch({ type: "GET_CATEGORY_LIST" });
    this.props.dispatch({ type: "GET_FAVORITE_RECIPES" });
    this.props.dispatch({ type: "GET_ALL_RECIPES" });
  }

  onLogin = (event) => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <div className="container">
        <Typography variant="h3" align="center">
          Welcome {this.props.user.username}!
        </Typography>
        <HomePageSearch />
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
        >
          <Grid item xs={3}>
            <Typography variant="h4">Categories</Typography>
            <div>
              <HomePageCategoryList />
            </div>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h4" align="center">
              Recipe List Goes Here
            </Typography>
            <HomePageRecipeList />
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h4">Favorite Recipes</Typography>
            <div>
              <HomePageFavoriteList />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(HomePage);
