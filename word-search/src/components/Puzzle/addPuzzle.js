import React, { useState } from "react";
import { connect } from "react-redux";

const AddPuzzle = ({ words, size }) => {
  const [lines, setLines] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [impossible, setImpossible] = useState(false);
  const [firstClick, setFirstClick] = useState("");
  const [solved, setSolved] = useState(false);

  return <div></div>;
};

const mapStateToProps = state => {
  return {
    words: state.words,
    size: state.size
  };
};

export default connect(mapStateToProps, {})(AddPuzzle);
