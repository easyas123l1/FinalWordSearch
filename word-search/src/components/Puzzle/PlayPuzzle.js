import React, { useState, useEffect } from "react";
import uuid from "uuid";
import { connect } from "react-redux";
import puzzle from "../../styles/puzzle.module.scss";

const PlayPuzzle = ({ words, name, code, description, rating, creator }) => {
  console.log("words", words);
  console.log("name", name);
  console.log("code", code);
  console.log("description", description);
  const [lines, setLines] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [size, setSize] = useState(0);

  useEffect(() => {
    setSize(Math.sqrt(code.length));
    buildLines();
    buildAnswers();
  }, [code]);

  const buildPuzzle = e => {
    e.preventDefault();
    buildLines();
    buildAnswers();
  };

  const buildLines = () => {
    let charPosition = 0;
    const newLines = [];
    let size = Math.sqrt(code.length);
    for (let i = 0; size > i; i++) {
      const line = [];
      for (let j = 0; size > j; j++) {
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
    setLines(newLines);
  };

  const goUp = position => {
    let seperate = position.replace(",", "").split(" ");
    let newPosition = `${seperate[0]}, ${--seperate[1]}`;
    return newPosition;
  };

  const goDown = position => {
    let seperate = position.replace(",", "").split(" ");
    let newPosition = `${seperate[0]}, ${++seperate[1]}`;
    return newPosition;
  };

  const goUpLeft = position => {
    let seperate = position.replace(",", "").split(" ");
    let newPosition = `${--seperate[0]}, ${--seperate[1]}`;
    return newPosition;
  };

  const goLeft = position => {
    let seperate = position.replace(",", "").split(" ");
    let newPosition = `${--seperate[0]}, ${seperate[1]}`;
    return newPosition;
  };

  const goDownLeft = position => {
    let seperate = position.replace(",", "").split(" ");
    let newPosition = `${--seperate[0]}, ${++seperate[1]}`;
    return newPosition;
  };

  const goUpRight = position => {
    let seperate = position.replace(",", "").split(" ");
    let newPosition = `${++seperate[0]}, ${--seperate[1]}`;
    return newPosition;
  };

  const goRight = position => {
    let seperate = position.replace(",", "").split(" ");
    let newPosition = `${++seperate[0]}, ${seperate[1]}`;
    return newPosition;
  };

  const goDownRight = position => {
    let seperate = position.replace(",", "").split(" ");
    let newPosition = `${++seperate[0]}, ${++seperate[1]}`;
    return newPosition;
  };

  const buildAnswers = () => {
    const newAnswers = [];
    for (let word of words) {
      let { position, direction } = word;
      let letters = word.word.split("");
      for (let letter of letters) {
        const newItem = {
          position: position,
          character: letter
        };
        newAnswers.push(newItem);
        if (direction === "Up") {
          position = goUp(position);
        }
        if (direction === "Down") {
          position = goDown(position);
        }
        if (direction === "UpLeft") {
          position = goUpLeft(position);
        }
        if (direction === "Left") {
          position = goLeft(position);
        }
        if (direction === "DownLeft") {
          position = goDownLeft(position);
        }
        if (direction === "UpRight") {
          position = goUpRight(position);
        }
        if (direction === "Right") {
          position = goRight(position);
        }
        if (direction === "DownRight") {
          position = goDownRight(position);
        }
      }
    }
    setAnswers(newAnswers);
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
      <h1>words to find:</h1>
      <ul>
        {words.map(word => (
          <li id={word.id} key={word.id}>
            {word.word}
          </li>
        ))}
      </ul>
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
