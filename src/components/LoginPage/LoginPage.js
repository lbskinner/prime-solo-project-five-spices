import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import image from "../../images/bgImage.jpg";
import { Grid } from "@material-ui/core";

class LoginPage extends Component {
  state = {
    username: "",
    password: "",
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: "LOGIN",
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <img src={image} alt="bg" className="bg" />
        <button
          type="button"
          className="link-button"
          onClick={() => {
            this.props.dispatch({ type: "SET_TO_REGISTER_MODE" });
          }}
        >
          Create Account
        </button>
        {this.props.store.errors.loginMessage && (
          <h2 className="alert" role="alert">
            {this.props.store.errors.loginMessage}
          </h2>
        )}

        <Grid container direction="row" justify="center" alignItems="center">
          <form className="formPanel" onSubmit={this.login}>
            <h1 className="textColor">Login</h1>
            <div>
              <label htmlFor="username" className="textColor textSize">
                Username:
              </label>{" "}
              <br />
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor("username")}
              />
            </div>
            <div>
              <label htmlFor="password" className="textColor textSize">
                Password:{" "}
              </label>{" "}
              <br />
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor("password")}
              />
            </div>
            <div>
              <input
                className="log-in"
                type="submit"
                name="submit"
                value="Log In"
              />
            </div>
          </form>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LoginPage);
