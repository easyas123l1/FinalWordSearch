import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { getPuzzles } from "../../store/actions/puzzleAction";
import PuzzleCard from "./PuzzleCard";

const AllPuzzles = ({ getPuzzles, puzzles }) => {
  console.log(puzzles);
  useEffect(() => {
    if (puzzles.length === 0) {
      console.log("getting puzzles");
      getPuzzles();
    }
  }, [getPuzzles, puzzles.length]);

  const history = useHistory();
  return (
    <div>
      <h1>ALL PUZZLES!</h1>
      {puzzles.map(puzzle => {
        return <PuzzleCard key={puzzle.id} puzzle={puzzle} />;
      })}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    puzzles: state.puzzleReducer.puzzles
  };
};

export default connect(mapStateToProps, { getPuzzles })(AllPuzzles);
