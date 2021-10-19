import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://127.0.0.1:3000/";

class AuthService {
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

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password, password_confirmation) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      password_confirmation,
    });
  }

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
