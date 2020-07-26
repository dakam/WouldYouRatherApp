import { Nav, Navbar, NavDropdown, NavItem } from "react-bootstrap";

import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import React, { Component } from "react";

class NavBar extends Component {
  render() {
    const { authedUser, user } = this.props;

    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand tag={Link} to="/">
            Would You Rather
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {authedUser && (
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/add">
                  New Question
                </Nav.Link>
                <Nav.Link as={Link} to="/leaderboardview">
                  Leader Board
                </Nav.Link>
                <NavItem>
                  <img
                    src={user.avatarURL}
                    className="avatar"
                    alt={`Avatar of ${user.name}`}
                  />
                </NavItem>

                <NavDropdown title={user.name} id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    {" "}
                    <img
                      src={user.avatarURL}
                      className="avatar"
                      alt={`Avatar of ${user.name}`}
                    />
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/logout">
                    SignOut
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    user: users[authedUser],
  };
}

export default withRouter(connect(mapStateToProps, null)(NavBar));
