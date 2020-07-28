import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { Button, Segment } from "semantic-ui-react";
import { Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { userId: "", redirectToReferrer: false };
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSwitch(event) {
    this.setState({ userId: event.target.value });
  }

  handleSubmit(event) {
    const { userId } = this.state;
    const { dispatch } = this.props;
    if (userId) {
      this.setState({ redirectToReferrer: true });
      dispatch(setAuthedUser(userId));
    } else {
      alert("No User selected, Please select a User");
    }
    event.preventDefault();
  }

  render() {
    const { users } = this.props;
    const { userId } = this.state;

    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;
    console.log("from props", this.props);
    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }
    return (
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Segment
            attached="top"
            style={{ width: "600px", backgroundColor: "#eee" }}
          >
            <h2>
              Welcome to{" "}
              <span style={{ color: "#00FFFF", size: 33 }}>
                Would you Rather
              </span>{" "}
              World
            </h2>
            <h3 style={{ marginTop: 0 }}></h3>
          </Segment>

          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="userSelect">Signin To Play</Label>
              <Input
                id="userSelect"
                type="select"
                name="select"
                value={userId}
                onChange={this.handleSwitch}
              >
                <option value="" disabled>
                  Select Your Player Name
                </option>
                {Object.keys(users).map((user) => (
                  <option key={user} value={user}>
                    {users[user].name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <Button
              color="facebook"
              disabled={userId === ""}
              fluid
              type="submit"
            >
              LOGIN
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(Login);
