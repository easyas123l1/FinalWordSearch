import { START_PUZZLE } from "../actions/puzzleAction";

const initState = {
  title: "",
  words: [],
  size: 10
};

export const puzzleReducer = (state = initState, action) => {
  switch (action.type) {
    case START_PUZZLE:
      return {
        ...state,
        title: action.payload.title,
        words: action.payload.words,
        size: action.payload.size
      };

    default:
      return {
        ...state
      };
  }
};
