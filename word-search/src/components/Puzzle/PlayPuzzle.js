import React, { useState, useEffect } from "react";
import uuid from "uuid";
import { connect } from "react-redux";
import puzzle from "../../styles/puzzle.module.scss";

const PlayPuzzle = ({ words, name, code, description, rating, creator }) => {
  console.log("words", words);
  console.log("name", name);
  console.log("code", code);
  console.log("description", description);
  console.log("rating", rating);
  console.log("creator", creator);
  const [lines, setLines] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [size, setSize] = useState(0);

  useEffect(() => {
    setSize(Math.sqrt(code.length));
  }, [code]);

  const buildPuzzle = e => {
    e.preventDefault();
    buildLines();
    console.log(size);
    console.log(lines, "lines");
  };

  const buildLines = () => {
    console.log("inside build lines");
    console.log(size);
    let charPosition = 0;
    const newLines = [];
    for (let i = 0; size > i; i++) {
      console.log("inside first loop");
      const line = [];
      for (let j = 0; size > j; j++) {
        console.log("inside j loop");
        let letterid = `${i}, ${j}`;
        let letter = code.charAt(charPosition);
        charPosition++;
        const newLetter = {
          text: letter,
          id: letterid,
          circle: "",
          first: "",
          color: "",
          hover: ""
        };
        console.log(newLetter);
        line.push(newLetter);
        if (j + 1 === size) {
          const newLine = {
            text: line,
            id: uuid.v4()
          };
          newLines.push(newLine);
        }
      }
    }
    console.log(newLines);
    setLines(newLines);
  };

  const buildAnswers = () => {
    for (let word of words) {
    }
  };

  return (
    <div>
      <h1>{name}</h1>
      <ul>
        {lines.map(line => (
          <li id={line.id} key={line.id} className={puzzle.findWordRow}>
            {line.text.map(letter => (
              <p id={letter.id} key={letter.id}>
                {letter.text}
              </p>
            ))}
          </li>
        ))}
      </ul>
      <button onClick={buildPuzzle}>Build Puzzle!</button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    words: state.puzzleReducer.playPuzzleWords,
    name: state.puzzleReducer.playPuzzleName,
    code: state.puzzleReducer.playPuzzleCode,
    description: state.puzzleReducer.playPuzzleDescription,
    rating: state.puzzleReducer.playPuzzleRating,
    creator: state.puzzleReducer.playPUzzleCreator
  };
}

export default connect(mapStateToProps, {})(PlayPuzzle);
