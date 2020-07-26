import React, { Component } from "react";
import { Segment } from "semantic-ui-react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Input,
  Form,
  Button,
  Row,
  Col,
} from "reactstrap";
import { connect } from "react-redux";
import User from "./User";
import { handleAnswer } from "../actions/shared";

class QuestionDetailsView extends Component {
  state = {
    selectedOption: "",
  };

  radioSelected = (e) => {
    this.setState({
      selectedOption: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.saveQuestionAnswer(this.state.selectedOption);
  };

  render() {
    const { question, questionAuthor, answer, total, pOne, pTwo } = this.props;
    const { selectedOption } = this.state;

    return (
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Card>
            <CardHeader>
              <User id={questionAuthor.id} />
            </CardHeader>
            <CardBody>
              <Segment
                attached="top"
                style={{ width: "400px", backgroundColor: "#eee" }}
              >
                <h2>
                  <span style={{ color: "#00FFFF", size: 33 }}>
                    Would you Rather
                  </span>{" "}
                </h2>
                <h3 style={{ marginTop: 0 }}></h3>
              </Segment>
              {answer ? (
                <div>
                  <FormGroup>
                    <FormGroup check disabled>
                      <Label check>
                        <Input
                          type="radio"
                          checked={answer === "optionOne"}
                          readOnly
                        />{" "}
                        {question.optionOne.text}
                      </Label>
                    </FormGroup>
                    <FormGroup check disabled>
                      <Label check>
                        <Input
                          type="radio"
                          checked={answer === "optionTwo"}
                          readOnly
                        />{" "}
                        {question.optionTwo.text}
                      </Label>
                    </FormGroup>
                  </FormGroup>
                  <div className="total">There are {total} Total Votes</div>
                  <div className="qdetails">
                    <div
                      className="qdetails-one"
                      style={{ width: `${pOne}%` }}
                    >{`${pOne}%`}</div>
                    <div
                      className="qdetails-two"
                      style={{ width: `${pTwo}%` }}
                    >{`${pTwo}%`}</div>
                  </div>
                </div>
              ) : (
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup tag="fieldset">
                    <FormGroup style={{ paddingLeft: 30 }}>
                      <Label>
                        <Input
                          type="radio"
                          name="radio1"
                          value="optionOne"
                          onChange={this.radioSelected}
                        />{" "}
                        {question.optionOne.text}
                      </Label>
                    </FormGroup>
                    <FormGroup style={{ paddingLeft: 30 }}>
                      <Label>
                        <Input
                          type="radio"
                          name="radio1"
                          value="optionTwo"
                          onChange={this.radioSelected}
                        />{" "}
                        {question.optionTwo.text}
                      </Label>
                    </FormGroup>
                  </FormGroup>
                  <Button disabled={selectedOption === ""}>Submit</Button>
                </Form>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

function converter(x) {
  return Number.parseFloat(x).toFixed(2);
}

function mapStateToProps({ questions, users, authedUser }, { match }) {
  const answers = users[authedUser].answers;
  let answer, pOne, pTwo, total;
  const { id } = match.params;
  const question = questions[id];
  if (answers.hasOwnProperty(question.id)) {
    answer = answers[question.id];
  }
  const questionAuthor = users[question.author];
  total = question.optionOne.votes.length + question.optionTwo.votes.length;
  pOne = converter((question.optionOne.votes.length / total) * 100);
  pTwo = converter((question.optionTwo.votes.length / total) * 100);
  return {
    question,
    questionAuthor,
    answer,
    total,
    pOne,
    pTwo,
  };
}

function mapDispatchToProps(dispatch, props) {
  const { id } = props.match.params;

  return {
    saveQuestionAnswer: (answer) => {
      dispatch(handleAnswer(id, answer));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionDetailsView);
