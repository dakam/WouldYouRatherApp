import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { Card, Statistic, Label } from "semantic-ui-react";

function Leaderboardview(props) {
  const { users } = props;
  return (
    <Fragment>
      {users.map((user, index) => (
        <Card className="lb-item" key={index}>
          <Card.Content className="lb-item-content">
            <div>
              <Label attached="top left"> {index + 1}</Label>
              <img width="60" height="60" src={user.avatarURL} />
            </div>

            <div className="lb-item-middle">
              <h2>{user.name}</h2>
              <div>
                <p>Answered Questions</p>
                <p>{Object.keys(user.answers).length}</p>
              </div>
              <div>
                <p>Created Questions</p>
                <p>{user.questions.length}</p>
              </div>
            </div>

            <div>
              <Statistic>
                <Statistic.Value>
                  {Object.keys(user.answers).length + user.questions.length}
                </Statistic.Value>
                <Statistic.Label>
                  <span style={{ alignContent: "center" }}>Total Score</span>
                </Statistic.Label>
              </Statistic>
            </div>
          </Card.Content>
        </Card>
      ))}
    </Fragment>
  );
}

const mapStateToProps = ({ users }) => {
  const ranking = (user) =>
    Object.keys(user.answers).length + user.questions.length;
  return {
    users: Object.values(users).sort((a, b) => ranking(b) - ranking(a)),
  };
};

export default connect(mapStateToProps)(Leaderboardview);
