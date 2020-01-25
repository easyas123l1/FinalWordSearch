import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { getPuzzles } from "../../store/actions/puzzleAction";
import PuzzleCard from "./PuzzleCard";
import puzzle from "../../styles/puzzle.module.scss";

const AllPuzzles = ({ getPuzzles, puzzles }) => {
  useEffect(() => {
    if (puzzles.length === 0) {
      getPuzzles();
    }
  }, [getPuzzles, puzzles.length]);

  const history = useHistory();
  return (
    <div className={puzzle.background}>
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
