import {} from "../actions/userAction";

const initState = {
  user: {
    name: ""
  }
};

export const userReducer = (state = initState, action) => {
  switch (action.type) {
    default:
      return {
        ...state
      };
  }
};
