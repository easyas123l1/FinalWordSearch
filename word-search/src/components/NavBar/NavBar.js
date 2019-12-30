import React from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";

const NavBar = () => {
  const history = useHistory();

  return (
    <>
      <div>
        <Link to="/register">Register</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(NavBar);
