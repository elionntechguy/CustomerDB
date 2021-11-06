import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import customer from "./customer";

export default combineReducers({
  auth,
  message,
  customer,
});
