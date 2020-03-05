import React from "react";
import { connect } from "react-redux";
import puzzle from "../../styles/puzzle.module.scss";

const Victory = () => {
  return (
    <div>
      <p>Completed puzzle page!</p>
    </div>
  );
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(Victory);
