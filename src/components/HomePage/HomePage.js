import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, IconButton, InputBase } from "@material-ui/core";
import { Paper, Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import "./HomePage.css";
import HomePageCategoryList from "../HomePageCategoryList/HomePageCategoryList";
import HomePageFavoriteList from "../HomePageFavoriteList/HomePageFavoriteList";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

class HomePage extends Component {
  state = {
    heading: "Class Component",
  };

  componentDidMount() {
    this.props.dispatch({ type: "GET_CATEGORY_LIST" });
    this.props.dispatch({ type: "GET_FAVORITE_RECIPES" });
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
        <Paper>
          <InputBase variant="outlined" placeholder="Search Keywords" />
          <IconButton type="submit" aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
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
