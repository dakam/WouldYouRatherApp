import React from "react";
import { connect } from "react-redux";
import Expired from "./Expired";
import Dashboard from "./Dashboard";
import Logout from "./Logout";
import Leaderboard from "./LeaderboardView";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  authedUser: AuthedUser,
  path: paths,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      AuthedUser ? (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export default PrivateRoute;
