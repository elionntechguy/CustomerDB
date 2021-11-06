/* eslint-disable react/prop-types */
import React, { useState } from "react";

import { Container, Form, Button } from "react-bootstrap";

import { connect } from "react-redux";

import "../App.css";
import { newCustomer } from "../actions/customer";

export const NewCustomer = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [issues, setIssues] = useState("");
  const [issuedescription, setIssuedescription] = useState("//");

  const { dispatch, history } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phonenumber = e.target.phonenumber.value;
    const issues = e.target.issues.value;
    const issuedescription = e.target.issuedescription.value;

    dispatch(
      newCustomer(name, email, phonenumber, issues, issuedescription)
    ).then(() => {
      history.push("/dashboard");
      window.location.reload();
    });
  };

  const validateForm = () => {
    return (
      name.length > 0 &&
      email.length > 0 &&
      phonenumber.length > 0 &&
      issues.length > 0
    );
  };

  const { message } = props;

  return (
    <Container fluid>
      <div className="new-customer">
        <h4>New Customer</h4>
        <hr />
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="phonenumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="issues">
            <Form.Label>Issues</Form.Label>
            <Form.Control
              type="text"
              value={issues}
              onChange={(e) => setIssues(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="issuedescription">
            <Form.Label>Issue Description</Form.Label>
            <Form.Control
              as="textarea"
              value={issuedescription}
              onChange={(e) => setIssuedescription(e.target.value)}
              rows={3}
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
    </Container>
  );
};

const mapStateToProps = (state) => ({
  message: state.message.message.message,
});

export default connect(mapStateToProps)(NewCustomer);
