import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, IconButton, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

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

class HomePageSearch extends Component {
  state = {
    heading: "Class Component",
  };

  render() {
    return (
      <Paper>
        <InputBase variant="outlined" placeholder="Search Keywords" />
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    );
  }
}

export default connect(mapStoreToProps)(HomePageSearch);
