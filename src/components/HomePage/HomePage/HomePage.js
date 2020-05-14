import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import { Typography, Grid } from "@material-ui/core";
import "./HomePage.css";
import HomePageCategoryList from "../HomePageCategoryList/HomePageCategoryList";
import HomePageFavoriteList from "../HomePageFavoriteList/HomePageFavoriteList";
import HomePageSearch from "../HomePageSearch/HomePageSearch";
import HomePageRecipeList from "../HomePageRecipeList/HomePageRecipeList";
import Button from "@material-ui/core/Button";

class HomePage extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "GET_ALL_RECIPES" });
    this.props.dispatch({ type: "GET_CATEGORY_LIST" });
    this.props.dispatch({ type: "GET_FAVORITE_RECIPES" });
  }

  onLogin = (event) => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <div className="container">
        <Button
          onClick={() => {
            this.props.dispatch({ type: "GET_ALL_RECIPES" });
          }}
        >
          All Recipes
        </Button>
        <Typography variant="h3" align="center">
          Welcome {this.props.user.username}!
        </Typography>
        <HomePageSearch />
        <br />
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
        >
          <Grid item xs={2}>
            <Typography variant="h4">Categories</Typography>
            <div>
              <HomePageCategoryList />
            </div>
          </Grid>
          <Grid item xs={8}>
            {/* {this.props.allRecipes.length === 0 ? ( */}
            {this.props.allRecipes.length > 0 ? (
              <HomePageRecipeList />
            ) : (
              // <div className="loader"></div>
              <Typography variant="h4" align="center">
                No Recipe Found!
              </Typography>
            )}
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h4">Favorites</Typography>
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
