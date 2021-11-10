/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

import { Jumbotron, Container, Form, Button, Col, Row } from "react-bootstrap";

import { connect } from "react-redux";

import UserService from "../services/user-service";

import { resetPassword } from "../actions/auth";

export const Profile = (props) => {
  const [content, setContent] = useState([]);
  const [password, setPassword] = useState("");

  useEffect(() => {
    UserService.getProfile().then(
      (res) => {
        setContent([res.data]);
      },
      (err) => {
        setContent(err.message);
      }
    );
  }, []);

  const { dispatch, history } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    dispatch(resetPassword(password)).then(() => {
      history.push("/profile");
      window.location.reload();
    });
  };

  const validateForm = () => {
    return password.length > 0;
  };

  const { message } = props;

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

          <div className="profile-main">
            <Row>
              <Col md={6}>
                <div className="reset-password">
                  <h4>Reset password</h4>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="password">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>

                    <Button
                      variant="secondary"
                      block
                      size="lg"
                      type="submit"
                      disabled={!validateForm()}
                    >
                      Submit
                    </Button>
                  </Form>
                  <br />
                  {message && (
                    <div className="form-group">
                      <div className="alert alert-danger" role="alert">
                        {message}
                      </div>
                    </div>
                  )}
                </div>
              </Col>
              <Col md={6}>
                <div className="user-info">
                  <h4>{i.username}</h4>
                  <h5>{i.email}</h5>
                </div>
              </Col>
            </Row>
          </div>
        </>
      ))}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  message: state.message.message.message,
});

export default connect(mapStateToProps)(Profile);
