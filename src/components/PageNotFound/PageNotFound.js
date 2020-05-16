import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class PageNotFound extends Component {
  render() {
    return (
      <div>
        <h1>404</h1>
        <h2>Oops! Page not found</h2>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(PageNotFound);
