import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { Typography, Button, MenuItem, Menu, Grid } from "@material-ui/core";
import "./Nav.css";

const Nav = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (link) => {
    setAnchorEl(null);
    if (link === "login") {
      props.dispatch({ type: "SET_TO_LOGIN_MODE" });
    }
    if (link === "create") {
      props.dispatch({ type: "SET_TO_REGISTER_MODE" });
    }
  };

  return (
    <div className="nav">
      <Link to="/Home">
        <Typography className="nav-title" variant="h3" align="left">
          Five<sup>⑤</sup> Spices{" "}
        </Typography>
      </Link>
      <Grid container direction="row" justify="flex-end" alignItems="center">
        {props.store.user.id ? (
          <>
            {/* need to link to actual page once created, home link don't need to appear on Home page */}
            <Button
              className="nav-link"
              variant="text"
              component={Link}
              to="/Home"
            >
              Home
            </Button>
            {/* need to link to actual page once created, add link don't need to appear on add page */}
            <Button variant="text" component={Link} to="/info">
              Add Recipe
            </Button>
            <Button variant="text" component={Link} to="/info">
              Account
            </Button>
            <LogOutButton />
          </>
        ) : (
          <div>
            <Button
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
            >
              Login
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <Link to="/login">
                <MenuItem onClick={() => handleClose("login")}>Login</MenuItem>
              </Link>
              <Link to="/registration">
                <MenuItem onClick={() => handleClose("create")}>
                  Create Account
                </MenuItem>
              </Link>
            </Menu>
          </div>
        )}
        <Button component={Link} to="/about">
          About
        </Button>
      </Grid>
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
