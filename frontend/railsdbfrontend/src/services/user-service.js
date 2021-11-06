/* eslint-disable no-undef */
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_API_URL;

class UserService {
  /**
   * getProfile method
   * 
   * @returns 
   */
  getProfile() {
    return axios.get(API_URL + 'profile', { headers: authHeader() });
  }
}

export default new UserService();