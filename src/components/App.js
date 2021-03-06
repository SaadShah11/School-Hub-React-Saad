import React from "react";
import { HashRouter, Route, Switch, Redirect, Router } from "react-router-dom";

// components
import Layout from "./Layout";

// pages
import Error from "../pages/error";
import Login from "../pages/login";
import Signin from '../pages/profiling/signin/signinNew'
import Landing from './../pages/landing/Landing'

// context
import { useUserState } from "../context/UserContext";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import AdminAdding from '../pages/Admin/AdminAdding'
import checkboxUI from "../pages/Admin/checkbox"



export default function App() {
  // global
  var { isAuthenticated } = useUserState();
  let url1 = '/user_management/login';
  let url2 = '/user_management/signup';


  return (
    <HashRouter>
      <Switch>
        {/* <Route exact path="/" component={Landing} /> */}
        {/* <Route exact path="/" render={() => <Redirect to="/app/home" />} /> */}
        {/* <Route exact path="/app" render={() => <Redirect to="/app/home" />}/> */}


        <Route exact path="/admin" component={AdminAdding} />
        <Route exact path="/" render={(props) => (
          <Login {...props} fetchUrl1={url1} fetchUrl2={url2} />
        )} />
        <Route path="/app/dashboard" component={Dashboard} />
        <Route path="/app" component={Layout} />
        {/* <PublicRoute path="/login" render={(props) => (
          <Login {...props} fetchUrl={url1} fetchUrl2={url2} />
        )} /> */}
        <Route component={Error} />
      </Switch>
    </HashRouter>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: {
                    from: props.location,
                  },
                }}
              />
            )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
              React.createElement(component, props)
            )
        }
      />
    );
  }
}
