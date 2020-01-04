import React, { useState } from "react";
import uuid from "uuid";
import { connect } from "react-redux";

const AddPuzzle = ({ words, size }) => {
  console.log(words, size);
  const [lines, setLines] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [impossible, setImpossible] = useState(false);

  const randomPosition = () => {
    let position1 = Math.floor(Math.random() * size);
    let position2 = Math.floor(Math.random() * size);

    return `${position1}, ${position2}`;
  };

  const randomLetter = () => {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    return possible.charAt(Math.floor(Math.random() * possible.length));
  };

  const testDirections = (word, position) => {
    // function test the four directions up right down and left.
    let length = word.length - 1;
    let newPosition = position.replace(",", "");
    newPosition = newPosition.split(" ");
    let row = newPosition[0];
    let column = newPosition[1];
    row = +row;
    column = +column;
    let up = true;
    let left = true;
    let down = true;
    let right = true;
    if (column - length < 0) {
      up = false;
    }
    if (row - length < 0) {
      left = false;
    }
    if (column + length > size - 1) {
      down = false;
    }
    if (row + length > size - 1) {
      right = false;
    }
    return [up, left, down, right, row, column];
  };

  const testDiagonal = (d1, d2) => {
    // test direction1 and direction2
    if (d1 && d2) {
      return true;
    }
    return false;
  };

  const logPosition = (row, column, character) => {
    let position = `${row}, ${column}`;
    const newCharacter = {
      position: position,
      character: character
    };
    return newCharacter;
  };

  const goUp = (word, row, column) => {
    let coordinates = [];
    for (let i = 0; i < word.length; i++) {
      let position = logPosition(row, column, word.charAt(i));
      coordinates.push(position);
      column--;
    }
    return coordinates;
  };

  const goUpRight = (word, row, column) => {
    let coordinates = [];
    for (let i = 0; i < word.length; i++) {
      let position = logPosition(row, column, word.charAt(i));
      coordinates.push(position);
      column--;
      row++;
    }
    return coordinates;
  };

  const goRight = (word, row, column) => {
    let coordinates = [];
    for (let i = 0; i < word.length; i++) {
      let position = logPosition(row, column, word.charAt(i));
      coordinates.push(position);
      row++;
    }
    return coordinates;
  };

  const goDownRight = (word, row, column) => {
    let coordinates = [];
    for (let i = 0; i < word.length; i++) {
      let position = logPosition(row, column, word.charAt(i));
      coordinates.push(position);
      row++;
      column++;
    }
    return coordinates;
  };

  const goDown = (word, row, column) => {
    let coordinates = [];
    for (let i = 0; i < word.length; i++) {
      let position = logPosition(row, column, word.charAt(i));
      coordinates.push(position);
      column++;
    }
    return coordinates;
  };

  const goDownLeft = (word, row, column) => {
    let coordinates = [];
    for (let i = 0; i < word.length; i++) {
      let position = logPosition(row, column, word.charAt(i));
      coordinates.push(position);
      column++;
      row--;
    }
    return coordinates;
  };

  const goLeft = (word, row, column) => {
    let coordinates = [];
    for (let i = 0; i < word.length; i++) {
      let position = logPosition(row, column, word.charAt(i));
      coordinates.push(position);
      row--;
    }
    return coordinates;
  };

  const goUpLeft = (word, row, column) => {
    let coordinates = [];
    for (let i = 0; i < word.length; i++) {
      let position = logPosition(row, column, word.charAt(i));
      coordinates.push(position);
      column--;
      row--;
    }
    return coordinates;
  };

  const randomChecker = tried => {
    let newPosition = false;
    while (!newPosition) {
      const newRandomPosition = randomPosition();
      newPosition = true;
      for (let index of tried) {
        if (newRandomPosition === index) {
          newPosition = false;
        }
      }
      if (newPosition) {
        return newRandomPosition;
      }
    }
  };

  const placeWords = () => {
    const newWords = [];
    for (let word of words) {
      newWords.push(word.text);
    }
    let coordinates = [];

    for (let word of newWords) {
      let attempts = 0;
      let possiblePlacement = true;
      let triedPositions = [];
      do {
        attempts++;
        const maxTries = size * size;
        if (triedPositions.length === maxTries) {
          console.log("max positions tried");
          alert(
            "word length is too long, or puzzle size is too small.  Try adding size or using smaller words"
          );
          setImpossible(true);
        }

        const randomPosition = randomChecker(triedPositions);

        const directions = testDirections(word, randomPosition);
        const [
          directUp,
          directLeft,
          directDown,
          directRight,
          row,
          column
        ] = directions;
        if (!directUp && !directLeft && !directDown && !directRight) {
          possiblePlacement = false;
        } else {
          const directUpLeft = testDiagonal(directUp, directLeft);
          const directUpRight = testDiagonal(directUp, directRight);
          const directDownRight = testDiagonal(directDown, directRight);
          const directDownLeft = testDiagonal(directDown, directLeft);

          const objUp = {
            direction: "Up",
            possible: directUp
          };
          const objUpRight = {
            direction: "UpRight",
            possible: directUpRight
          };
          const objRight = {
            direction: "Right",
            possible: directRight
          };
          const objDownRight = {
            direction: "DownRight",
            possible: directDownRight
          };
          const objDown = {
            direction: "Down",
            possible: directDown
          };
          const objDownLeft = {
            direction: "DownLeft",
            possible: directDownLeft
          };
          const objLeft = {
            direction: "Left",
            possible: directLeft
          };
          const objUpLeft = {
            direction: "UpLeft",
            possible: directUpLeft
          };

          const possibleDirections = [
            objUp,
            objUpRight,
            objRight,
            objDownRight,
            objDown,
            objDownLeft,
            objLeft,
            objUpLeft
          ];
          let newPossibleDirections = [];

          for (let possibleDirection of possibleDirections) {
            if (possibleDirection.possible) {
              newPossibleDirections.push(possibleDirection);
            }
          }

          let tryThis = false;

          while (newPossibleDirections.length > 0 && !tryThis) {
            const randomDirection = Math.floor(
              Math.random() * newPossibleDirections.length
            );
            const tryDirection = newPossibleDirections[randomDirection];
            let wordPossibleCoordinates = [];
            let wordPossible = true;
            if (tryDirection.direction === "Up") {
              wordPossibleCoordinates = goUp(word, row, column);
            } else if (tryDirection.direction === "UpRight") {
              wordPossibleCoordinates = goUpRight(word, row, column);
            } else if (tryDirection.direction === "Right") {
              wordPossibleCoordinates = goRight(word, row, column);
            } else if (tryDirection.direction === "DownRight") {
              wordPossibleCoordinates = goDownRight(word, row, column);
            } else if (tryDirection.direction === "Down") {
              wordPossibleCoordinates = goDown(word, row, column);
            } else if (tryDirection.direction === "DownLeft") {
              wordPossibleCoordinates = goDownLeft(word, row, column);
            } else if (tryDirection.direction === "Left") {
              wordPossibleCoordinates = goLeft(word, row, column);
            } else {
              wordPossibleCoordinates = goUpLeft(word, row, column);
            }
            if (word === "0") {
              coordinates = wordPossibleCoordinates;
              tryThis = true;
            } else {
              for (let coordinate of coordinates) {
                if (!wordPossible) {
                  break;
                }
                for (let possibleCoordinate of wordPossibleCoordinates) {
                  if (
                    coordinate.position === possibleCoordinate.position &&
                    coordinate.character !== possibleCoordinate.character
                  ) {
                    if (newPossibleDirections.length === 1) {
                      newPossibleDirections = [];
                      wordPossible = false;
                    } else {
                      newPossibleDirections = newPossibleDirections.slice(
                        randomDirection,
                        1
                      );
                      wordPossible = false;
                      break;
                    }
                  }
                }
              }
              if (wordPossible) {
                coordinates = coordinates.concat(wordPossibleCoordinates);
                tryThis = true;
                possiblePlacement = true;
                break;
              }
            }
            if (newPossibleDirections.length === 0) {
              possiblePlacement = false;
            }
          }
        }
        if (attempts === 80 && !possiblePlacement) {
          console.log("max attempts");
          alert(
            "word length is too long, or puzzle size is too small.  Try adding size or using smaller words"
          );
          if (!impossible) {
            setImpossible(true);
          }
        }
        if (!possiblePlacement) {
          triedPositions.push(randomPosition);
        }
      } while (attempts < 80 && !possiblePlacement);
    }
    return coordinates;
  };

  const regeneratePuzzle = () => {
    setLines([]);
    setAnswers([]);
    generatePuzzle();
  };

  const generatePuzzle = () => {
    const newAnswers = placeWords();
    setAnswers(newAnswers);
    for (let i = 0; size > i; i++) {
      const line = [];
      for (let i2 = 0; size > i2; i2++) {
        let letterid = "";
        let letter = "";
        letterid = `${i}, ${i2}`;
        for (let answer of newAnswers) {
          if (answer.position === letterid) {
            letter = answer.character;
          }
        }
        if (letter === "") {
          letter = randomLetter();
        }
        const newLetter = {
          text: letter,
          id: letterid,
          circle: "",
          first: "",
          color: "",
          hover: ""
        };
        line.push(newLetter);
        if (i2 + 1 === size) {
          const newLine = {
            text: line,
            id: uuid.v4()
          };
          setLines([...lines, newLine]);
        }
      }
    }
  };

  const savePuzzle = e => {
    console.log(e);
  };

  const editPuzzle = e => {
    console.log(e);
  };

  return (
    <div>
      <div>
        <h1>TITLE OF PUZZLE</h1>
        <ul>
          {lines.map(line => (
            <li id={lines.id}>
              {line.text.map(letter => (
                <p id={letter.id} key={letter.id}>
                  {letter.text}
                </p>
              ))}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          <h1>WORDS TO FIND:</h1>
          {words &&
            words.map(word => (
              <li id={word.id} key={word.id}>
                {word.text}
              </li>
            ))}
        </ul>
        <div>
          <button onClick={regeneratePuzzle}>Generate new Puzzle</button>
          <button onClick={savePuzzle}>Save Puzzle</button>
          <button onClick={editPuzzle}>Edit Puzzle</button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    words: state.words,
    size: state.size
  };
};

export default connect(mapStateToProps, {})(AddPuzzle);
