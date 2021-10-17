import axios from "axios";

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
}

export default new AuthService();
