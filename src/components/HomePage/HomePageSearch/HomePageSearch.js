import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import { withStyles } from "@material-ui/core/styles";
import { Paper, IconButton, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const styles = (theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 790,
    margin: "auto",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
});

class HomePageSearch extends Component {
  state = {
    searchKeywords: "",
  };

  handleChange = (event) => {
    this.setState({
      searchKeywords: event.target.value,
    });
  };

  clickSearch = (event) => {
    this.props.dispatch({
      type: "SEARCH_RECIPES",
      payload: this.state.searchKeywords,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          variant="outlined"
          placeholder="Search Keywords"
          onChange={this.handleChange}
        />
        <IconButton
          className={classes.iconButton}
          type="submit"
          aria-label="search"
          onClick={this.clickSearch}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    );
  }
}

export default withStyles(styles)(connect(mapStoreToProps)(HomePageSearch));
