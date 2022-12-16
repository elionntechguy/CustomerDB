/* eslint-disable no-undef */
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_API_URL;

class CustomerService {
  /**
   * dashboard method
   * that returns dashboard data
   *
   * @returns
   */
  async dashboard() {
    const response = await axios.get(API_URL + 'dashboard', {
      headers: authHeader(),
    });
    return response.data;
  }

  /**
   * newCustomer method
   * that posts name, email, phonenumber, issues, issuedescription
   *
   * @param {string} name Customer name
   * @param {string} email Customer email
   * @param {string} phoneNumber Customer phone number
   * @param {string} issues Customer issues
   * @param {string} issueDescription Customer issue description
   * @returns
   */
  async newCustomer(name, email, phoneNumber, issues, issueDescription) {
    const response = await axios.post(
      API_URL + 'new_customer',
      {
        name,
        email,
        phoneNumber,
        issues,
        issueDescription,
      },
      { headers: authHeader() }
    );
    return response.data;
  }

  /**
   * deleteCustomer method
   * that posts id
   *
   * @param {number} id Customer id
   * @returns
   */
  async deleteCustomer(id) {
    const response = await axios.post(API_URL + `delete_customer/${id}`, {
      headers: authHeader(),
    });
    return response.data;
  }

  /**
   * editCustomer method
   * that posts id, name, email, phonenumber, issue_status, issues, issuedescription
   *
   * @param {number} id Customer id
   * @param {string} name Customer name
   * @param {string} email Customer email
   * @param {string} phoneNumber Customer phone number
   * @param {string} issueStatus Customer issue status
   * @param {string} issues Customer issues
   * @param {string} issueDescription Customer issue description
   * @returns
   */
  async editCustomer(
    id,
    name,
    email,
    phoneNumber,
    issueStatus,
    issues,
    issueDescription
  ) {
    const response = await axios.post(
      API_URL + `update_customer/${id}`,
      {
        name,
        email,
        phoneNumber,
        issueStatus,
        issues,
        issueDescription,
      },
      { headers: authHeader() }
    );
    return response.data;
  }
}

export default new CustomerService();
