import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, IconButton, InputBase } from "@material-ui/core";
import { Paper, Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { List, ListItem, ListItemText } from "@material-ui/core";
import "./LandingPage.css";

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

class LandingPage extends Component {
  state = {
    heading: "Class Component",
  };

  componentDidMount() {
    this.props.dispatch({ type: "GET_CATEGORY_LIST" });
  }

  onLogin = (event) => {
    this.props.history.push("/login");
  };

  render() {
    const categoryArray = this.props.categoryList.map((category) => {
      return (
        <ListItem key={category.category_id}>
          <ListItemText primary={category.category_name} />
        </ListItem>
      );
    });
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
              <List>{categoryArray}</List>
            </div>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h4" align="center">
              Recipe List Goes Here
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h4" align="center">
              Favorite Recipes
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
