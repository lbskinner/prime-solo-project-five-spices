import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class LogOutPage extends Component {
  state = {
    heading: "Class Component",
  };

  render() {
    return (
      <div>
        <div>
          <button
            type="button"
            className="link-button"
            onClick={() => {
              this.props.history.push("/login");
              this.props.dispatch({ type: "SET_TO_LOGIN_MODE" });
            }}
          >
            Login
          </button>
        </div>
        <div>
          <h2 className="center-text">
            Thank you for using Five<sup>⑤</sup> Spices!
          </h2>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LogOutPage);
