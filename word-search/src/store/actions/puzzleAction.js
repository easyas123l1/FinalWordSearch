import axios from "axios";

export const START_PUZZLE = "START_PUZZLE";

export const generatePuzzle = puzzle => dispatch => {
  dispatch({ type: START_PUZZLE, payload: puzzle });
};

export const START_SAVE = "START_SAVE";
export const SAVE_SUCCESS = "SAVE_SUCCESS";
export const SAVE_FAILURE = "SAVE_FAILURE";

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
