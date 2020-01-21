import {
  START_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  BEGIN_GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE
} from "../actions/userAction";

const initState = {
  user: {
    name: "",
    id: null
  },
  isAuthenticating: false,
  loggedIn: false,
  authenticationError: ""
};

export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case START_LOGIN:
      return {
        ...state,
        isAuthenticating: true
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        loggedIn: true,
        user: {
          ...state.user,
          name: action.payload.user.username,
          id: action.payload.user.id
        }
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        authenticationError: action.payload,
        isAuthenticating: false
      };

    case BEGIN_GET_USER_INFO:
      return {
        ...state,
        isAuthenticating: true
      };

    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        loggedIn: true,
        user: {
          ...state.user,
          name: action.payload.username,
          id: action.payload.id
        }
      };

    case GET_USER_INFO_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        loggedIn: false,
        authenticationError: action.payload
      };

    default:
      return {
        ...state
      };
  }
};
