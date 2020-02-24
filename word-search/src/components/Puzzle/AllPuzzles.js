import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPuzzles } from "../../store/actions/puzzleAction";
import PuzzleCard from "./PuzzleCard";
import puzzle from "../../styles/puzzle.module.scss";

const AllPuzzles = ({ getPuzzles, puzzles }) => {
  useEffect(() => {
    if (puzzles.length === 0) {
      getPuzzles();
    }
  }, [getPuzzles, puzzles.length]);

  return (
    <div className={puzzle.background}>
      <h1 className={puzzle.puzzleHeader}>ALL PUZZLES!</h1>
      <div className={puzzle.allPuzzle}>
        {puzzles.map(puzzle => {
          return <PuzzleCard key={puzzle.id} puzzle={puzzle} />;
        })}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    puzzles: state.puzzleReducer.puzzles
  };
};

export default connect(mapStateToProps, { getPuzzles })(AllPuzzles);
