import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import puzzle from "../../styles/puzzle.module.scss";
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
    loginUser(cred);
  };

  if (loggedIn) {
    history.push("/allPuzzles");
  }

  if (isAuthenticating) {
    return <h1>loading...</h1>;
  }

  return (
    <div className={puzzle.background}>
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
        <p>
          If you don't have an account,{" "}
          {<Link to="/register">click here to register</Link>}
        </p>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticating: state.userReducer.isAuthenticating,
    loggedIn: state.userReducer.loggedIn,
    authenticationError: state.userReducer.authenticationError
  };
};

export default connect(mapStateToProps, { loginUser })(Login);
