import {
  START_PUZZLE,
  SAVE_FAILURE,
  START_SAVE,
  SAVE_SUCCESS,
  GET_PUZZLES,
  PUZZLES_SUCCESS,
  PUZZLES_FAILURE
} from "../actions/puzzleAction";

const initState = {
  title: "",
  words: [],
  size: 10,

  puzzles: [],
  getPuzzles: false,
  savePuzzleName: "",
  savePuzzleCode: "",
  savePuzzleDescription: "",
  savePuzzleWords: [],
  isSaving: false,
  errorMessage: ""
};

export const puzzleReducer = (state = initState, action) => {
  switch (action.type) {
    case START_PUZZLE:
      return {
        ...state,
        title: action.payload.title,
        words: action.payload.words,
        size: action.payload.size,
        errorMessage: ""
      };

    case START_SAVE:
      return {
        ...state,
        isSaving: true,
        errorMessage: ""
      };

    case SAVE_SUCCESS:
      return {
        ...state,
        isSaving: false,
        savePuzzleName: action.payload.puzzle.name,
        savePuzzleCode: action.payload.puzzle.name,
        savePuzzleDescription: action.payload.puzzle.name,
        savePuzzleWords: action.payload.words,
        errorMessage: ""
      };

    case SAVE_FAILURE:
      return {
        ...state,
        isSaving: false,
        errorMessage: action.payload
      };

    case GET_PUZZLES:
      return {
        ...state,
        getPuzzles: true,
        errorMessage: ""
      };

    case PUZZLES_SUCCESS:
      return {
        ...state,
        getPuzzles: false,
        puzzles: action.payload,
        errorMessage: ""
      };

    case PUZZLES_FAILURE:
      return {
        ...state,
        getPuzzles: false,
        errorMessage: action.payload
      };

    default:
      return {
        ...state,
        errorMessage: ""
      };
  }
};
