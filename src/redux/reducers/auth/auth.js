import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_CONFIRM_SUCCESS,
  RESET_PASSWORD_CONFIRM_FAIL,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
  LOGOUT,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
} from "../../actions/auth/types";

const ACCESS_TOKEN = "access";
const REFRESH_TOKEN = "refresh";

const initialState = {
  access: localStorage.getItem(ACCESS_TOKEN),
  refresh: localStorage.getItem(REFRESH_TOKEN),
  isAuthenticated: false,
  user: null,
  loading: false,
};

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export default function auth(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    case USER_LOADED_FAIL:
      return {
        ...state,
        user: null,
        loading: false,
      };
    case SET_AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_AUTH_LOADING:
      return {
        ...state,
        loading: false,
      };
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case AUTHENTICATED_FAIL:
      removeLocalStorage(ACCESS_TOKEN);
      removeLocalStorage(REFRESH_TOKEN);
      return {
        ...state,
        isAuthenticated: false,
        access: null,
        refresh: null,
      };
    case LOGIN_SUCCESS:
      setLocalStorage(ACCESS_TOKEN, payload.access);
      setLocalStorage(REFRESH_TOKEN, payload.refresh);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
        loading: false,
      };
    case RESET_PASSWORD_SUCCESS:
    case RESET_PASSWORD_FAIL:
    case RESET_PASSWORD_CONFIRM_SUCCESS:
    case RESET_PASSWORD_CONFIRM_FAIL:
      return {
        ...state,
      };
    case REFRESH_SUCCESS:
      setLocalStorage(ACCESS_TOKEN, payload.access);
      return {
        ...state,
        access: payload.access,
      };
    case LOGIN_FAIL:
    case REFRESH_FAIL:
    case LOGOUT:
      removeLocalStorage(ACCESS_TOKEN);
      removeLocalStorage(REFRESH_TOKEN);
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}
