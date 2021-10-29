import React from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link, Redirect } from "react-router-dom";

import LogIn from "./components/login";
import { logout } from "./actions/auth";
import Profile from "./components/profile";
import Dashboard from "./components/dashboard";
import NewCustomer from "./components/new-customer";

import { history } from "./helpers/history";

function App(props) {
  // eslint-disable-next-line react/prop-types
  const { user, logout } = props;

  const PrivateRoute = (props) => {
    return user ? <Route {...props} /> : <Redirect to="/" />;
  };

  return (
    <Router history={history}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            railsdbproj
          </Link>
          <div className="navbar-nav mr-auto">
            {user && (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/" className="nav-link" onClick={logout}>
                    Logout
                  </a>
                </li>
              </div>
            )}
          </div>
        </nav>

        <div className="container-fluid mt-3">
          <Switch>
            <Route exact path="/" component={LogIn} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/new_customer" component={NewCustomer} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
