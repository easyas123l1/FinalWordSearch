import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  });
};

export const START_PUZZLE = "START_PUZZLE";

// this sends the user created puzzle to Redux
export const generatePuzzle = puzzle => dispatch => {
  dispatch({ type: START_PUZZLE, payload: puzzle });
};

export const START_SAVE = "START_SAVE";
export const SAVE_SUCCESS = "SAVE_SUCCESS";
export const SAVE_FAILURE = "SAVE_FAILURE";

// axios call to save puzzle
export const reduxSavePuzzle = puzzle => dispatch => {
  dispatch({ type: START_SAVE });
  console.log(puzzle);
  axiosWithAuth()
    .post("http://localhost:5000/api/puzzle", puzzle)
    .then(res => {
      console.log(res.data);
      return dispatch({ type: SAVE_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      console.log(err.data);
      console.log(err.message);
      console.log(err.response);
      dispatch({ type: SAVE_FAILURE, payload: err });
    });
};

export const GET_PUZZLES = "GET_PUZZLES";
export const PUZZLES_SUCCESS = "PUZZLES_SUCCESS";
export const PUZZLES_FAILURE = "PUZZLES_FAILURE";

// axios call to get all puzzles
export const getPuzzles = () => dispatch => {
  dispatch({ type: GET_PUZZLES });

  axios
    .get("http://localhost:5000/api/puzzle")
    .then(res => {
      return dispatch({ type: PUZZLES_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: PUZZLES_FAILURE, payload: err.response.data.message });
    });
};

export const GET_PUZZLE = "GET_PUZZLE";
export const PUZZLE_SUCCESS = "PUZZLE_SUCCESS";
export const PUZZLE_FAILURE = "PUZZLE_FAILURE";

// axios call to get individual puzzle info words, code, description, name
export const getPuzzle = id => dispatch => {
  dispatch({ type: GET_PUZZLE });

  axios
    .get(`localhost:5000/api/puzzle/${id}`)
    .then(res => {
      return dispatch({ type: PUZZLE_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: PUZZLE_FAILURE, payload: err.response.data.message });
    });
};
