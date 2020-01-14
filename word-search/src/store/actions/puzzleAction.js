import axios from "axios";

export const START_PUZZLE = "START_PUZZLE";

// this sends the user created puzzle to Redux
export const generatePuzzle = puzzle => dispatch => {
  dispatch({ type: START_PUZZLE, payload: puzzle });
};

export const START_SAVE = "START_SAVE";
export const SAVE_SUCCESS = "SAVE_SUCCESS";
export const SAVE_FAILURE = "SAVE_FAILURE";

// axios call to save puzzle
export const savePuzzle = puzzle => dispatch => {
  dispatch({ type: START_SAVE });

  axios
    .post("localhost:5000/api/puzzle", puzzle)
    .then(res => {
      return dispatch({ type: SAVE_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: SAVE_FAILURE, payload: err.response.data.message });
    });
};

export const GET_PUZZLES = "GET_PUZZLES";
export const PUZZLES_SUCCESS = "PUZZLES_SUCCESS";
export const PUZZLES_FAILURE = "PUZZLES_FAILURE";

// axios call to get all puzzles
export const getPuzzles = () => dispatch => {
  dispatch({ type: GET_PUZZLES });

  axios
    .get("localhost:5000/api/puzzle")
    .then(res => {
      return dispatch({ type: PUZZLES_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: PUZZLES_FAILURE, payload: err.response.data.message });
    });
};
