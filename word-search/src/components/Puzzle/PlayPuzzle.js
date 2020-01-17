import React from "react";
import { connect } from "react-redux";

const PlayPuzzle = () => {
  return (
    <div>
      <h1>Playing Puzzle!</h1>
    </div>
  );
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(PlayPuzzle);
