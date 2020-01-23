import React from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/userAction";

const NavBar = ({ loggedIn, logoutUser }) => {
  const history = useHistory();

  const logout = e => {
    e.preventDefault();
    logoutUser();
    history.push("/login");
  };

  return (
    <>
      <div>
        <Link to="/AllPuzzles">All Puzzles</Link>
      </div>
      {!loggedIn && (
        <>
          <div>
            <Link to="/register">Register</Link>
          </div>
          <div>
            <Link to="/login">Login</Link>
          </div>
        </>
      )}
      {loggedIn && (
        <>
          <div>
            <Link to="/createPuzzle">Create Puzzle</Link>
          </div>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    loggedIn: state.userReducer.loggedIn
  };
}

export default connect(mapStateToProps, { logoutUser })(NavBar);
