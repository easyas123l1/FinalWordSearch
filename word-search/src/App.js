import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "./styles/global.scss";
import PrivateRoute from "./components/Private/PrivateRoute";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import NavBar from "./components/NavBar/NavBar";
import AddPuzzle from "./components/Puzzle/AddPuzzle";
import CreatePuzzle from "./components/Puzzle/CreatePuzzle";
import AllPuzzles from "./components/Puzzle/AllPuzzles";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/allPuzzles" component={AllPuzzles} />
        <PrivateRoute path="/addPuzzle">
          <AddPuzzle />
        </PrivateRoute>
        <PrivateRoute path="/createPuzzle">
          <CreatePuzzle />
        </PrivateRoute>
        <Route component={Register} />{" "}
        {/* default route incase route doesn't exist */}
      </Switch>
    </>
  );
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(App);
