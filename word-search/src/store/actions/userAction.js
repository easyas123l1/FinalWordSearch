import axios from "axios";

// this is only an example.
export const START_LOGIN = "START_LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN FAILURE";

export const loginUser = credentials => dispatch => {
  dispatch({ type: START_LOGIN });

  //need to make sure the URL is correct.
  axios
    .post("http://localhost:5000/api/user/login", credentials)
    .then(res => {
      console.log(res);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("id", res.data.id);
      // Need to fix the payload.  Once backend is updated we should get back username, email, image url, and maybe userID
      return dispatch({ type: LOGIN_SUCCESS, payload: res });
    })
    .catch(error => {
      console.error(error);
      dispatch({ type: LOGIN_FAILURE, payload: error.response.data.message });
    });
};
