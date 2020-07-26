import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { handleAddQuestion } from "../actions/shared";
import { Redirect } from "react-router-dom";

class NewQuestionView extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    redirect: false,
  };

  handleChangeOne = (event) => {
    event.preventDefault();
    this.setState({
      optionOne: event.target.value,
    });
  };

  handleChangeTwo = (event) => {
    event.preventDefault();
    this.setState({
      optionTwo: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { optionOne, optionTwo } = this.state;
    const { dispatch } = this.props;
    dispatch(handleAddQuestion(optionOne, optionTwo));
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/" />;
    }
    const { optionOne, optionTwo } = this.state;
    return (
      <Row>
        <Col sm="8" md={{ size: 8, offset: 3 }}>
          <Card>
            <CardBody>
              <CardTitle>Would You Rather</CardTitle>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="optionOne">Option One</Label>
                  <Input
                    type="text"
                    name="optionOne"
                    value={optionOne}
                    onChange={this.handleChangeOne}
                    placeholder="Option One"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="optionTwo">Option Two</Label>
                  <Input
                    type="text"
                    name="optionTwo"
                    value={optionTwo}
                    onChange={this.handleChangeTwo}
                    placeholder="Option Two"
                  />
                </FormGroup>
                <Button
                  color="btn btn-primary"
                  disabled={optionOne === "" || optionTwo === ""}
                >
                  Submit
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default connect(null)(NewQuestionView);
