import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import mapStoreToProps from "../../redux/mapStoreToProps";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Grid from "@material-ui/core/Grid";

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
      <Link to="/home">
        <h2 className="nav-title">
          Five<sup>⑤</sup> Spices{" "}
        </h2>
      </Link>
      <Grid container direction="row" justify="flex-end" alignItems="center">
        {props.store.user.id ? (
          <>
            {/* need to link to actual page once created, home link don't need to appear on Home page */}
            <Button variant="text">
              <Link to="/Home">Home</Link>
            </Button>
            {/* need to link to actual page once created, add link don't need to appear on add page */}
            <Button variant="text">
              <Link to="/info">Add Recipe</Link>
            </Button>
            <Button variant="text">
              <Link to="/info">Account</Link>
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
        <Button>
          <Link to="/about">About</Link>
        </Button>
      </Grid>
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
