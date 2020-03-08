import React from "react";
import { connect } from "react-redux";
import puzzle from "../../styles/puzzle.module.scss";

const Victory = ({ name, time }) => {
  return (
    <div>
      <p>
        Completed puzzle {name} in {time}
      </p>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    name: state.puzzleReducer.playPuzzleName,
    time: state.puzzleReducer.playPuzzleTime
  };
}

export default connect(mapStateToProps, {})(Victory);
