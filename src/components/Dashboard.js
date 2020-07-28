import React, { Component } from "react";
import Question from "./Question";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import { connect } from "react-redux";

class DashBoard extends Component {
  state = {
    activeTab: "1",
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    const { unansweredQuestions, answeredQuestions } = this.props;
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Unanswered
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Answered
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            {unansweredQuestions.map((qid) => (
              <div key={qid}>
                <Row>
                  <Col className="tabcol-unanswered" key={qid} sm="8" md="6">
                    <Question id={qid} />
                  </Col>
                </Row>
                <Row>
                  <Col key={qid} sm="8" md="6"></Col>
                </Row>
              </div>
            ))}
          </TabPane>
          <TabPane tabId="2">
            {answeredQuestions.map((qid) => (
              <Row key={qid}>
                <Col className="tabcol-answered" key={qid} sm="6" md="4">
                  <Question id={qid} />
                </Col>
              </Row>
            ))}
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }) {
  const user = users[authedUser];
  const answeredQuestions = Object.keys(user.answers).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );
  return {
    unansweredQuestions: Object.keys(questions)
      .filter((qid) => !answeredQuestions.includes(qid))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    answeredQuestions,
  };
}

export default connect(mapStateToProps)(DashBoard);
