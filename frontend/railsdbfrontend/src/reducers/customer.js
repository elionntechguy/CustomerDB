import { NEW_CUSTOMER } from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export default function (state = initialState, action) {
  const { type } = action;

  switch (type) {
    case NEW_CUSTOMER:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
}
