import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const initialState = {
  username: "",
  password: "",
  verpassword: ""
};

const Register = props => {
  console.log(props);
  const [cred, setCred] = useState(initialState);

  const changeHandler = e => {
    e.persist();
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(cred);
    if (cred.password === cred.verpassword) {
      const user = { username: cred.username, password: cred.password };
      axios
        .post("http://localhost:5000/api/register", user)
        .then(res => {
          console.log(res);
          props.history.push("/login");
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      alert("password and verify password must match!");
    }
  };
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
          type="text"
          name="password"
          onChange={changeHandler}
          placeholder="password"
          value={cred.password}
        />
        <input
          type="text"
          name="verpassword"
          onChange={changeHandler}
          placeholder="verify password"
          value={cred.verpassword}
        />
        <button type="submit">Create Account</button>
      </form>
      <h1>Register</h1>
    </>
  );
};

export default Register;
