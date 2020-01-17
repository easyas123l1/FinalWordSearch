import React from "react";
import { connect } from "react-redux";
import { getPuzzle } from "../../store/actions/puzzleAction";

const PuzzleCard = ({
  puzzle: { id, name, code, description },
  getPuzzle,
  words
}) => {
  const playPuzzle = e => {
    e.preventDefault();
    console.log("clicked id", id);
    getPuzzle(id);
    console.log(words);
  };

  return (
    <div>
      <p>Puzzle Name: {name}</p>
      <p>
        Puzzle Size: {Math.sqrt(code.length)}x{Math.sqrt(code.length)}
      </p>
      <p>Description: {description}</p>
      <button onClick={playPuzzle}>Play Puzzle</button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    words: state.puzzleReducer.playPuzzleWords
  };
}

export default connect(mapStateToProps, { getPuzzle })(PuzzleCard);
