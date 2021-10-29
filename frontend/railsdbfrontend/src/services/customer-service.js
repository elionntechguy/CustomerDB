import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://127.0.0.1:3000/";

class CustomerService {
  async dashboard() {
    const response = await axios.get(API_URL + "dashboard", {
      headers: authHeader(),
    });
    return response.data;
  }

  async newCustomer(name, email, phonenumber, issues, issuedescription) {
    const response = await axios.post(
      API_URL + "new_customer",
      {
        name,
        email,
        phonenumber,
        issues,
        issuedescription
      },
      { headers: authHeader() }
    );
    return response.data;
  }
}

export default new CustomerService();
