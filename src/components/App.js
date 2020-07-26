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
              <Switch>
                {didsignin ? (
                  <Route path="/" exact component={Login} />
                ) : (
                  <Fragment>
                    <Route path="/" exact component={Dashboard} />
                    <Route
                      path="/leaderboardview"
                      exact
                      component={LeaderBoardView}
                    />
                    <Route path="/add" component={NewQuestionView} />
                    <Route
                      path="/questions/:id"
                      component={QuestionDetailsView}
                    />
                    <Route exact path="/logout" component={Logout} />
                  </Fragment>
                )}
                <Route component={Expired} />
              </Switch>
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
