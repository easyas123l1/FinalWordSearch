import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { loginUser } from "../../store/actions/userAction";

const initialState = {
  username: "",
  password: ""
};

const Login = ({
  isAuthenticating,
  loggedIn,
  authenticationError,
  loginUser
}) => {
  const [cred, setCred] = useState(initialState);
  const history = useHistory();

  const changeHandler = e => {
    e.persist();
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("submit");
    loginUser(cred);
  };

  if (loggedIn) {
    console.log("loggedIn");
    history.push("/");
  }

  if (isAuthenticating) {
    return <h1>loading...</h1>;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          onChange={changeHandler}
          placeholder="username"
          value={cred.username}
        />
        <input
          type="password"
          name="password"
          onChange={changeHandler}
          placeholder="password"
          value={cred.password}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticating: state.isAuthenticating,
    loggedIn: state.loggedIn,
    authenticationError: state.authenticationError
  };
};

export default connect(mapStateToProps, { loginUser })(Login);
