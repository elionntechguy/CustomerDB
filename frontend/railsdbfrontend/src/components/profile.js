/* eslint-disable react/prop-types */
import React, { useState } from "react";

import { Jumbotron, Container } from "react-bootstrap";

import UserService from "../services/user-service";

export const Profile = () => {
  const [content, setContent] = useState([]);

  UserService.getProfile().then(
    (res) => {
      setContent([res.data]);
    },
    (err) => {
      setContent(err.message);
    }
  );

  return (
    <Container>
      {content.map((i) => (
        <>
          <Jumbotron>
            <Container>
              <h1> Hello {i.username}! </h1>
              <h5>
                <b>{i.email}</b>
              </h5>
              <hr />
            </Container>
          </Jumbotron>
        </>
      ))}
    </Container>
  );
};

export default Profile;
