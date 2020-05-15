import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import image from "../../images/bgImage.jpg";
import Grid from "@material-ui/core/Grid";

class RegisterPage extends Component {
  state = {
    username: "",
    email: "",
    password: "",
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: "REGISTER",
        payload: {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: "REGISTRATION_INPUT_ERROR" });
    }
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <img src={image} alt="bg" className="bg" />
        <div>
          <button
            type="button"
            className="link-button"
            onClick={() => {
              this.props.dispatch({ type: "SET_TO_LOGIN_MODE" });
            }}
          >
            Login
          </button>
        </div>
        {this.props.errors.registrationMessage && (
          <h2 className="alert" role="alert">
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <Grid container direction="row" justify="center" alignItems="center">
          <div></div>
          <form className="formPanel" onSubmit={this.registerUser}>
            <h1 className="textColor">Create Account</h1>
            <div>
              <label htmlFor="username" className="textColor textSize">
                Username:{" "}
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
              <label htmlFor="email" className="textColor textSize">
                Email:
              </label>{" "}
              <br />
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChangeFor("email")}
              />
            </div>
            <div>
              <label htmlFor="password" className="textColor textSize">
                Password:
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
                className="register"
                type="submit"
                name="submit"
                value="Register"
              />
            </div>
          </form>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RegisterPage);
