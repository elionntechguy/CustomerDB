/* eslint-disable no-undef */
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class AuthService {
  /**
   * Login method 
   * that posts email and password
   * and saves JWT to localStorage
   * 
   * @param {string} email User email
   * @param {string} password User password
   * @returns 
   */
  async login(email, password) {
    const response = await axios.post(API_URL + "login", {
      email,
      password,
    });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  /**
   * Logout method
   */
  logout() {
    localStorage.removeItem("user");
  }

  /**
   * Register method
   * that posts username, email, password, password_confirmation
   * 
   * @param {string} username User name
   * @param {string} email User email
   * @param {string} password User password
   * @param {string} password_confirmation Confirm user password
   * @returns 
   */
  register(username, email, password, password_confirmation) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      password_confirmation,
    });
  }

  /**
   * resetPassword method
   * that posts password
   * 
   * @param {string} password User password
   * @returns 
   */
  async resetPassword(password) {
    const response = await axios.post(
      API_URL + "reset",
      {
        password,
      },
      { headers: authHeader() }
    );
    return response.data;
  }
}

export default new AuthService();
