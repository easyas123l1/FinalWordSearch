import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
  return (
    <>
      <h1>Login</h1>
    </>
  );
};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, {})(Login);
