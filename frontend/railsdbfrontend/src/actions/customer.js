import {
  NEW_CUSTOMER,
  DELETE_CUSTOMER,
  EDIT_CUSTOMER,
  SET_MESSAGE,
} from './types';

import CustomerService from '../services/customer-service';

/**
 * newCustomer action that dispatches NEW_CUSTOMER
 * if all fields filled
 *
 * @param {string} name Customer name
 * @param {string} email Customer email
 * @param {string} phoneNumber Customer phone number
 * @param {string} issues Customer issue
 * @param {string} issueDescription Customer issue description
 * @returns
 */
export const newCustomer =
  (name, email, phoneNumber, issues, issueDescription) => async (dispatch) => {
    const data = await CustomerService.newCustomer(
      name,
      email,
      phoneNumber,
      issues,
      issueDescription
    );
    if (data.message) {
      return dispatch({
        type: NEW_CUSTOMER,
        payload: data,
      });
    } else {
      dispatch({
        type: SET_MESSAGE,
        payload: data,
      });
      throw new Error(data);
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
    return dispatch({
      type: DELETE_CUSTOMER,
      payload: data,
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      payload: data,
    });
    throw new Error(data);
  }
};

/**
 * editCustomer action that dispatches EDIT_CUSTOMER
 *
 * @param {number} id Customer id
 * @param {string} name Customer name
 * @param {string} email Customer email
 * @param {string} phoneNumber Customer phonenumber
 * @param {string} issueStatus Customer issue status
 * @param {string} issues Customer issue
 * @param {string} issueDescription Customer issue description
 * @returns
 */
export const editCustomer =
  (id, name, email, phoneNumber, issueStatus, issues, issueDescription) =>
  async (dispatch) => {
    const data = await CustomerService.editCustomer(
      id,
      name,
      email,
      phoneNumber,
      issueStatus,
      issues,
      issueDescription
    );
    if (data.message) {
      return dispatch({
        type: EDIT_CUSTOMER,
        payload: data,
      });
    } else {
      dispatch({
        type: SET_MESSAGE,
        payload: data,
      });
      throw new Error(data);
    }
  };
