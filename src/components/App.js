import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import NavBar from "./NavBar";
import Dashboard from "./Dashboard";
import LeaderBoardView from "./LeaderboardView";
import Login from "./Login";
import NewQuestionView from "./NewQuestionView";
import QuestionDetailsView from "./QuestionDetailsView";
import Expired from "./Expired";
import Logout from "./Logout.js";
import PrivateRoute from "./PrivateRoute";
import { Switch, Route } from "react-router-dom";

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }
  render() {
    const { didsignin } = this.props;

    return (
      <Router>
        <Fragment>
          <div className="main-container">
            <NavBar />
            <div className="container">
              {
                <Fragment>
                  <Switch>
                    <PrivateRoute
                      path="/"
                      exact
                      component={Dashboard}
                      authedUser={didsignin}
                    />

                    <PrivateRoute
                      path="/leaderboard"
                      exact
                      component={LeaderBoardView}
                      authedUser={didsignin}
                    />
                    <PrivateRoute
                      path="/add"
                      exact
                      component={NewQuestionView}
                      authedUser={didsignin}
                    />

                    <PrivateRoute
                      path="/questions/:id"
                      component={QuestionDetailsView}
                      authedUser={didsignin}
                    />

                    <Route path="/login" component={Login} />
                    <Route exact path="/logout" component={Logout} />
                    <Route path="/" component={Expired} />
                  </Switch>
                </Fragment>
              }
            </div>
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    didsignin: authedUser === null,
  };
}

export default connect(mapStateToProps)(App);
