import React from "react";
import { connect } from "react-redux";

const PlayPuzzle = ({ words, name, code, description, rating, creator }) => {
  console.log("words", words);
  console.log("name", name);
  console.log("code", code);
  console.log("description", description);
  console.log("rating", rating);
  console.log("creator", creator);
  return (
    <div>
      <h1>Playing Puzzle!</h1>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    words: state.puzzleReducer.playPuzzleWords,
    name: state.puzzleReducer.playPuzzleName,
    code: state.puzzleReducer.playPuzzleCode,
    description: state.puzzleReducer.playPuzzleDescription,
    rating: state.puzzleReducer.playPuzzleRating,
    creator: state.puzzleReducer.playPUzzleCreator
  };
}

export default connect(mapStateToProps, {})(PlayPuzzle);
