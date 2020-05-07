import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import mapStoreToProps from "../../redux/mapStoreToProps";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

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

  let loginLinkData = {
    path: "/login",
    text: "Login / Register",
  };

  if (props.store.user.id != null) {
    loginLinkData.path = "/admin";
    loginLinkData.text = "Home";
  }

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">
          Five<sup>⑤</sup> Spices{" "}
        </h2>
      </Link>
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
        <Button>
          <Link to="/about">About</Link>
        </Button>
      </div>

      <div className="nav-right">
        <Link className="nav-link" to={loginLinkData.path}>
          {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
          {loginLinkData.text}
        </Link>
        {/* Show the link to the info page and the logout button if the user is logged in */}
        {props.store.user.id && (
          <>
            <Link className="nav-link" to="/info">
              Info Page
            </Link>
            <LogOutButton className="nav-link" />
          </>
        )}
        {/* Always show this link since the about page is not protected */}
        <Link className="nav-link" to="/about">
          About
        </Link>
      </div>
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
