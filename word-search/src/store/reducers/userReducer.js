import {
  START_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "../actions/userAction";

const initState = {
  user: {
    name: ""
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
          name: action.payload.name
        }
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        authenticationError: action.payload,
        isAuthenticating: false
      };

    default:
      return {
        ...state
      };
  }
};
