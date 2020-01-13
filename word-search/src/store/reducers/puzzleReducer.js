import { START_PUZZLE, SAVE_FAILURE } from "../actions/puzzleAction";

const initState = {
  title: "",
  words: [],
  size: 10,

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
        isSaving: false,
        errorMessage: action.payload
      };

    default:
      return {
        ...state,
        errorMessage: ""
      };
  }
};
