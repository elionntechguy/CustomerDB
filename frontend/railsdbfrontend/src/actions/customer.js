import {
  NEW_CUSTOMER,
  DELETE_CUSTOMER,
  EDIT_CUSTOMER,
  SET_MESSAGE,
} from "./types";

import CustomerService from "../services/customer-service";

/**
 * newCustomer action that dispatches NEW_CUSTOMER
 * if all fields filled
 *
 * @param {string} name Customer name
 * @param {string} email Customer email
 * @param {string} phonenumber Customer phone number
 * @param {string} issues Customer issue
 * @param {string} issuedescription Customer issue description
 * @returns
 */
export const newCustomer =
  (name, email, phonenumber, issues, issuedescription) => async (dispatch) => {
    const data = await CustomerService.newCustomer(
      name,
      email,
      phonenumber,
      issues,
      issuedescription
    );
    if (data.message) {
      dispatch({
        type: NEW_CUSTOMER,
        payload: data,
      });
      return Promise.resolve();
    } else {
      dispatch({
        type: SET_MESSAGE,
        payload: data,
      });
      return Promise.reject();
    }
  };

/**
 * deleteCustomer action that dispatches DELETE_CUSTOMER
 * 
 * @param {number} id Customer id
 * @returns
 */
export const deleteCustomer = (id) => async (dispatch) => {
  const data = await CustomerService.deleteCustomer(id);
  if (data.message) {
    dispatch({
      type: DELETE_CUSTOMER,
      payload: data,
    });
    return Promise.resolve();
  } else {
    dispatch({
      type: SET_MESSAGE,
      payload: data,
    });
    return Promise.reject();
  }
};

/**
 * editCustomer action that dispatches EDIT_CUSTOMER
 * 
 * @param {number} id Customer id
 * @param {string} name Customer name
 * @param {string} email Customer email
 * @param {string} phonenumber Customer phonenumber
 * @param {string} issue_status Customer issue status
 * @param {string} issues Customer issue
 * @param {string} issuedescription Customer issue description
 * @returns 
 */
export const editCustomer =
  (id, name, email, phonenumber, issue_status, issues, issuedescription) =>
  async (dispatch) => {
    const data = await CustomerService.editCustomer(
      id,
      name,
      email,
      phonenumber,
      issue_status,
      issues,
      issuedescription
    );
    if (data.message) {
      dispatch({
        type: EDIT_CUSTOMER,
        payload: data,
      });
      return Promise.resolve();
    } else {
      dispatch({
        type: SET_MESSAGE,
        payload: data,
      });
      return Promise.reject();
    }
  };
