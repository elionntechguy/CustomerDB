import { NEW_CUSTOMER, SET_MESSAGE } from "./types";

import CustomerService from "../services/customer-service";

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
