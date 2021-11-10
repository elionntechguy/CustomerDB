/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

import { Table, Row, Col, Button, CloseButton } from "react-bootstrap";
import { Pencil, Check } from "react-bootstrap-icons";

import CustomerService from "../services/customer-service";

import "../App.css";

import { deleteCustomer } from "../actions/customer";
import { editCustomer } from "../actions/customer";

export const Dashboard = (props) => {
  const [content, setContent] = useState([]);
  const [assigneduser, setAssigneduser] = useState([]);

  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [nameChange, setNameChange] = useState("");
  const [emailChange, setEmailChange] = useState("");
  const [phoneNumberChange, setPhoneNumberChange] = useState("");
  const [issueStatusChange, setIssueStatusChange] = useState("");
  const [issueChange, setIssueChange] = useState("");
  const [issueDescriptionChange, setIssueDescriptionChange] = useState("");

  useEffect(() => {
    CustomerService.dashboard().then(
      (res) => {
        setContent(res.customers);
        setAssigneduser(res.assigneduser);
      },
      (err) => {
        setContent(err.message);
      }
    );
  }, []);

  const { history } = props;

  const handleEdit = (key) => {
    let i = content.find((zv) => zv.id == key);
    setNameChange(i.name);
    setEmailChange(i.email);
    setPhoneNumberChange(i.phonenumber);
    setIssueStatusChange(i.issue_status);
    setIssueChange(i.issues);
    setIssueDescriptionChange(i.issue_description);
    setEdit(!edit);
    setEditId(key);
  };

  const sendEdit = (key) => {
    props.sendEdited(
      key,
      nameChange,
      emailChange,
      phoneNumberChange,
      issueStatusChange,
      issueChange,
      issueDescriptionChange
    );
  };

  return (
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
        <hr />
      </div>
      {content.length === 0 ? (
        <div className="text-center">
          <div className="alert alert-secondary" role="alert">
            No customer found at the moment
          </div>
        </div>
      ) : (
        <Row>
          <Col sm={12} style={{ overflowX: "hidden" }}>
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Issue Status</th>
                    <th>Issue</th>
                    <th>Issue Description</th>
                    <th>Assigned Users</th>
                    {edit ? <th> Finish Editing </th> : <th> Edit </th>}
                    {edit ? <th> Stop Editing </th> : <th> Delete </th>}
                  </tr>
                </thead>
                <tbody>
                  {content.map((i) => {
                    const assignedUserFilter = () => {
                      return (
                        assigneduser.find((z) => {
                          return (
                            z.customers_id.filter((zv) => zv == i.id).length > 0
                          );
                        }) || []
                      );
                    };

                    return (
                      <tr key={i.id}>
                        <td>{i.id}</td>
                        <td>
                          {edit && editId === i.id ? (
                            <input
                              type="text"
                              name="title"
                              defaultValue={nameChange}
                              onChange={(e) => setNameChange(e.target.value)}
                            />
                          ) : (
                            <>{i.name}</>
                          )}
                        </td>
                        <td>
                          {edit && editId === i.id ? (
                            <input
                              type="text"
                              name="title"
                              defaultValue={emailChange}
                              onChange={(e) => setEmailChange(e.target.value)}
                            />
                          ) : (
                            <>{i.email}</>
                          )}
                        </td>
                        <td>
                          {edit && editId === i.id ? (
                            <input
                              type="text"
                              name="title"
                              defaultValue={phoneNumberChange}
                              onChange={(e) =>
                                setPhoneNumberChange(e.target.value)
                              }
                            />
                          ) : (
                            <>{i.phonenumber}</>
                          )}
                        </td>
                        <td>
                          {edit && editId === i.id ? (
                            <select
                              name="issueStatusChangeSelect"
                              onChange={(e) =>
                                setIssueStatusChange(e.target.value)
                              }
                              value={issueStatusChange}
                            >
                              <option>Opened</option>
                              <option>In Progress</option>
                              <option>Closed</option>
                            </select>
                          ) : (
                            <>
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
                            </>
                          )}
                        </td>
                        <td>
                          {edit && editId === i.id ? (
                            <input
                              type="text"
                              name="title"
                              defaultValue={issueChange}
                              onChange={(e) => setIssueChange(e.target.value)}
                            />
                          ) : (
                            <>{i.issues}</>
                          )}
                        </td>
                        <td>
                          {edit && editId === i.id ? (
                            <input
                              type="text"
                              name="title"
                              defaultValue={issueDescriptionChange}
                              onChange={(e) =>
                                setIssueDescriptionChange(e.target.value)
                              }
                            />
                          ) : (
                            <>{i.issue_description}</>
                          )}
                        </td>
                        <td>{assignedUserFilter().username}</td>
                        <td>
                          {edit && editId === i.id ? (
                            <Button
                              variant="link"
                              className="close"
                              onClick={() => sendEdit(i.id)}
                              id="done"
                            >
                              <Check />
                            </Button>
                          ) : edit && editId !== i.id ? (
                            <Button
                              variant="link"
                              className="close"
                              id="pencil"
                              disabled
                              onClick={() => handleEdit(i.id)}
                            >
                              <Pencil />
                            </Button>
                          ) : (
                            <Button
                              variant="link"
                              className="close"
                              id="pencil"
                              onClick={() => handleEdit(i.id)}
                            >
                              <Pencil />
                            </Button>
                          )}
                        </td>
                        <td>
                          {edit && editId === i.id ? (
                            <CloseButton onClick={() => handleEdit(i.id)} />
                          ) : edit && editId !== i.id ? (
                            <CloseButton
                              disabled
                              onClick={() => props.handleDelete(i.id)}
                            />
                          ) : (
                            <CloseButton
                              onClick={() => props.handleDelete(i.id)}
                            />
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleDelete: (id) => {
      dispatch(deleteCustomer(id)).then(() => {
        window.location.reload();
      });
    },
    sendEdited: (
      key,
      name,
      email,
      phonenumber,
      issue_status,
      issue,
      issuedescription
    ) => {
      dispatch(
        editCustomer(
          key,
          name,
          email,
          phonenumber,
          issue_status,
          issue,
          issuedescription
        )
      ).then(() => {
        window.location.reload();
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(Dashboard);
