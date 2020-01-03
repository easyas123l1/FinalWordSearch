import { START_PUZZLE } from "../actions/puzzleAction";

const initState = {
  words: [],
  size: 10
};

export const puzzleReducer = (state = initState, action) => {
  switch (action.type) {
    case START_PUZZLE:
      return {
        ...state,
        words: action.payload.words,
        size: action.payload.size
      };

    default:
      return {
        ...state
      };
  }
};
