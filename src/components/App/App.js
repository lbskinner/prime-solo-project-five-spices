import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { connect } from "react-redux";

import Nav from "../Nav/Nav"; // header component
import Footer from "../Footer/Footer"; // footer component

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import InfoPage from "../InfoPage/InfoPage";
import HomePage from "../HomePage/HomePage/HomePage"; // home page after users log in
import LoginPage from "../LoginPage/LoginPage"; // login page
import RegisterPage from "../RegisterPage/RegisterPage"; //registration page
import DetailsPage from "../DetailsPage/DetailsPage/DetailsPage"; // recipe details page & edit page
import AddRecipePage from "../AddRecipePage/AddRecipePage"; // add recipe page
import LogOutPage from "../LogOutPage/LogOutPage"; // log out page

import "./App.css";
import PageNotFound from "../PageNotFound/PageNotFound";

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_USER" });
  }

  render() {
    return (
      <Router>
        <div className="page-container">
          <Nav />
          <div className="content-wrap">
            <div className="sideMargin">
              <Switch>
                {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
                <Redirect exact from="/" to="/home" />
                {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
                <Route exact path="/about" component={AboutPage} />
                {/* <Route exact path="/home" component={LandingPage} /> */}
                <Route exact path="/logout" component={LogOutPage} />
                {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
                <ProtectedRoute exact path="/admin" component={UserPage} />
                {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
                <ProtectedRoute exact path="/info" component={InfoPage} />
                {/* This works the same as the other protected route, except that if the user is logged in,
            they will be redirected to the authRedirect path provided. */}
                <ProtectedRoute
                  exact
                  path="/login"
                  authRedirect="/home"
                  component={LoginPage}
                />
                <ProtectedRoute
                  exact
                  path="/registration"
                  authRedirect="/home"
                  component={RegisterPage}
                />
                <ProtectedRoute exact path="/home" component={HomePage} />
                <ProtectedRoute
                  exact
                  path="/details/:id"
                  component={DetailsPage}
                />
                <ProtectedRoute exact path="/add" component={AddRecipePage} />
                {/* If none of the other routes matched, we will show a 404. */}
                {/* <Route render={() => <h1>404</h1>} /> */}
                <Route path="*" component={PageNotFound} />
              </Switch>
            </div>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default connect()(App);
