import React from "react";
import { Button, Card, CardBody, CardHeader, CardTitle } from "reactstrap";

const Expired = ({ history }) => (
  <Card>
    <CardHeader>404</CardHeader>
    <CardBody>
      <CardTitle>
        We did not find this Page or your session Expired: Oooooops
      </CardTitle>
      <Button
        size="small"
        color="btn btn-danger"
        onClick={() => history.push("/")}
      >
        Login
      </Button>
    </CardBody>
  </Card>
);

export default Expired;
