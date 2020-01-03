export const START_PUZZLE = "START_PUZZLE";

export const generatePuzzle = puzzle => dispatch => {
  dispatch({ type: START_PUZZLE, payload: puzzle });
};
