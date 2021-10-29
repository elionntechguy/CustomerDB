/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

import { Container, Table, Row, Col, Button } from "react-bootstrap";

// import { connect } from "react-redux";

import CustomerService from "../services/customer-service";

export const Dashboard = (props) => {
  const [content, setContent] = useState([]);
  const [assigneduser, setAssigneduser] = useState([]);

  useEffect(() => {
    CustomerService.dashboard().then(
      (res) => {
        console.log(res);
        setContent(res.customers);
        setAssigneduser(res.assigneduser);
      },
      (err) => {
        setContent(err.message);
      }
    );
  }, []);

  const { history } = props;

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     const password = e.target.password.value;
  //     dispatch(resetPassword(password)).then(() => {
  //       history.push("/");
  //       window.location.reload();
  //     });
  //   };

  //   const validateForm = () => {
  //     return password.length > 0;
  //   };

  //   const { message } = props;

  return (
    <Container>
      <>
        <div className="dashboardheader">
          <Row>
            <Col md={6}>
              <h2 className="dashboardheaderh2">Customers</h2>
            </Col>
            <Col md={6}>
              <Button
                className="newcustomerbutton"
                onClick={() => history.push("/new_customer")}
                variant="success"
              >
                New Customer
              </Button>
            </Col>
          </Row>
        </div>
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Issue Status</th>
                <th>Issue Description</th>
                <th>Assigned Users</th>
              </tr>
            </thead>
            <tbody>
              {content.map((i) => {
                // const assignedUserFilter = assigneduser.filter(
                //   ({ customers_id }) => customers_id == i.id
                // );

                const assignedUserFilter = () => {
                  return (
                    assigneduser.find((z) => {
                      for (const element of z.customers_id) {
                        return element == i.id;
                      }
                    }) || []
                  );
                };

                return (
                  <tr key={i.id}>
                    <td>{i.id}</td>
                    <td>{i.name}</td>
                    <td>{i.email}</td>
                    <td>{i.phonenumber}</td>
                    <td>
                      {i.issue_status === "Opened" ? (
                        <span className="issue_status opened">
                          {i.issue_status}
                        </span>
                      ) : i.issue_status === "In Progress" ? (
                        <span className="issue_status inprogress">
                          {i.issue_status}
                        </span>
                      ) : (
                        <span className="issue_status closed">
                          {i.issue_status}
                        </span>
                      )}
                    </td>
                    <td>{i.issue_description}</td>
                    <td>{assignedUserFilter().username}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </>
    </Container>
  );
};

export default Dashboard;
