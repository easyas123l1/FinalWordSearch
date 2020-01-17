import React from "react";
import { connect } from "react-redux";

const PuzzleCard = ({ puzzle: { id, name, code, description } }) => {
  return (
    <div>
      <p>Puzzle Name: {name}</p>
      <p>
        Puzzle Size: {Math.sqrt(code.length)}x{Math.sqrt(code.length)}
      </p>
      <p>Description: {description}</p>
      <button>Play Puzzle</button>
    </div>
  );
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(PuzzleCard);
