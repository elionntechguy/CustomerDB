import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  RESET_PASSWORD,
  SET_MESSAGE,
} from './types';

import AuthService from '../services/auth-service';

/**
 * Register action that dispatches REGISTER_SUCCESS
 * if successfully registered
 *
 * @param {string} username User name
 * @param {string} email User email
 * @param {string} password User password
 * @param {string} passwordConfirmation Confirm user password
 * @returns
 */
export const register =
  (username, email, password, passwordConfirmation) => (dispatch) => {
    return AuthService.register(
      username,
      email,
      password,
      passwordConfirmation
    ).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });

        return dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
      },
      (error) => {
        const message = error.message;

        dispatch({
          type: REGISTER_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        throw new Error(error);
      }
    );
  };

/**
 * Login action that dispatches LOGIN_SUCCESS
 * if logged in successfully
 *
 * @param {string} email User email
 * @param {string} password User password
 * @returns
 */
export const login = (email, password) => async (dispatch) => {
  const data = await AuthService.login(email, password);
  if ('token' in data) {
    return dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: data },
    });
  } else {
    const message = data;

    dispatch({
      type: LOGIN_FAIL,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });

    throw new Error(message);
  }
};

/**
 * Logout action that dispatches LOGOUT
 *
 * @returns
 */
export const logout = () => (dispatch) => {
  AuthService.logout();

  return dispatch({
    type: LOGOUT,
  });
};

/**
 * resetPassword action that dispatches RESET_PASSWORD
 * if new password not the same as current password
 *
 * @param {string} password User password
 * @returns
 */
export const resetPassword = (password) => async (dispatch) => {
  const data = await AuthService.resetPassword(password);
  if (data.message == 'Password successfully changed!') {
    dispatch({
      type: RESET_PASSWORD,
      payload: data,
    });
    return localStorage.removeItem('user');
  } else {
    dispatch({
      type: SET_MESSAGE,
      payload: data,
    });
    throw new Error(data);
  }
};
