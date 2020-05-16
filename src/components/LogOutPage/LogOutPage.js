import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { Typography, Grid } from "@material-ui/core";
import image from "../../images/bgImage.jpg";

class LogOutPage extends Component {
  state = {
    heading: "Class Component",
  };

  render() {
    return (
      <div className="pageHeight">
        <img src={image} alt="bg" className="bg" />
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
        <Grid container direction="row" justify="center" alignItems="center">
          <Typography className="textColor" variant="h3" align="center">
            Thank you for using Five<sup>⑤</sup> Spices!
          </Typography>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LogOutPage);
