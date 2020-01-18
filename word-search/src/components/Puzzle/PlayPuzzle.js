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
  const [firstClickLocation, setFirstClickLocation] = useState('');
  const [puzzleSolved, setPuzzleSolved] = useState(false);

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

  const handleColorChange = (color, word) => {
    color = color + 'word';
    words[word].color = color;
    // call redux update words
  }

  const handleSolve = wordIndex => {
    words[wordIndex].solved = 'solved'
    // call redux update words
  }

  const wordFind = e => {
    //set variables needed
    let selected = e.target.id;
    let objWords = [];
    let index = -1;
    //loop thru words
    for (let word in words) {
      let length = words[word].text.length;
      let startIndex = index + 1;
      index += length;
      let endIndex = index;
      let arrayWord = [];
      arrayWord = answers.slice(startIndex, endIndex + 1);
      //make a obj with each words starting index, end index, length of word, the words text, and index.
      const newWord = {
        start: answers[startIndex].position,
        end: answers[endIndex].position,
        length: length,
        word: arrayWord,
        wordIndex: word
      }
      //place the object inside an array.
      objWords.push(newWord);
    }
    //first click on puzzle starting point.
    if (firstClickLocation === '') {
      setFirstClickLocation(selected);
      for (let line of lines) {
        for (let i=0; i<=size-1; i++) {
          if (line.text[i].id === selected) {
            line.text[i].first = 'first'
          }
        }
      }
    } else {
      //second click on puzzle should allow us to connect dots
      //get second clicks coordinates
      let secondClick = selected;
      for (let word of objWords) {
        //if both first and second click are the same location then break out of loop.  NO CHEATING!!
        if (firstClickLocation === secondClick) {
          break;
        }
        //if first click is the beggining or the end, and second click is the beggining or the end then that word is solved.  
        if (firstClickLocation === word.start || firstClickLocation === word.end) {
          if (secondClick === word.start || secondClick === word.end) {
            //solve word cross it off of list.
            this.props.handleSolve(word);
            //loop thru the word to get positions, loop thru lines to find the positions.  When both match add class to circle letter.
            let randomColor = Math.floor(Math.random() * 9);
            let colors = ['cyan', 'red', 'green', 'orange', 'pink', 'yellow', 'purple', 'brown', 'silver']
            for (let wordLength=0; wordLength<word.length; wordLength++) {
              for (let line of lines) {
                for (let i=0; i<=size-1; i++) {
                  if (line.text[i].id === word.word[wordLength].position) {
                    //this will circle the word.
                    line.text[i].circle = 'circle';
                    //set random color for circle and word found
                    line.text[i].color = colors[randomColor];
                    handleColorChange(colors[randomColor], word)
                  }
                }
              }
            }
            //test if all words are solved then puzzle is solved.  VICTORY!!!
            let checkComplete = true
            for (let index of words) {
              if (index.solved === '') {
                checkComplete = false
              }
            }
            if (checkComplete) {
              setPuzzleSolved(true);
            }
          }
        }
      }
      for (let line of lines) {
        for (let i=0; i<=size-1; i++) {
          if (line.text[i].id === firstClickLocation) {
            line.text[i].first = '';
          }
        }
      }
      setFirstClickLocation('');
      setLines(lines)
    }
  }

  const checkTwoConnect = (first, second) => {
    //seperate rows and columns
    let firstPosition = first.replace(',','');
    let secondPosition = second.replace(',','');
    firstPosition = firstPosition.split(' ');
    secondPosition = secondPosition.split(' ');
    let firstRow = firstPosition[0];
    let firstColumn = firstPosition[1];
    let secondRow = secondPosition[0];
    let secondColumn = secondPosition[1];
    //compare rows then compare columns
    let rowDifference = secondRow - firstRow;
    let columnDifference = secondColumn - firstColumn;
    //build a return array
    let returnArray = [rowDifference, columnDifference, true];
    //test for connection possible
    if (rowDifference === 0 || columnDifference === 0) {
      return returnArray;
    } else if (rowDifference === columnDifference || rowDifference * -1 === columnDifference) {
      return returnArray;
    } else {
      returnArray[2] = false;
      return returnArray;
    }
  }

  const mouseHover = e => {
    //if position hovered is the same as start or no click then nothing happens.
    if (firstClickLocation === '' || firstClickLocation === e.target.id) {
      return;
    }
    //return the difference of row and column and if possible
    let returnArray = this.checkTwoConnect(firstClickLocation, e.target.id)
    let rowDifference = returnArray[0];
    let columnDifference = returnArray[1];
    let possible = returnArray[2];
    //split rows and columns
    let startPosition = firstClickLocation.replace(',','');
    startPosition = startPosition.split(' ');
    let startRow = startPosition[0];
    let startColumn = startPosition[1];
    //start the array of positions
    let locations = [startRow + ', ' + startColumn];
    //if possible then loop thru all coordinates and add to an array to be styled
    if (possible) {
      while (rowDifference !== 0 || columnDifference !== 0) {
        if (rowDifference > 0) {
          rowDifference--
          startRow++
        } else if (rowDifference < 0) {
          rowDifference++
          startRow--
        }
        if (columnDifference > 0) {
          columnDifference--
          startColumn++
        } else if (columnDifference < 0) {
          columnDifference++
          startColumn--
        }
        let position = startRow + ', ' + startColumn;
        locations.push(position);
      }
    } else {
      return;
    }
    //add hover to class for styling
    for (let index of locations) {
      for (let line of lines) {
        for (let i=0; i<= size-1; i++) {
          if (line.text[i].id === index) {
            line.text[i].hover = 'hover';
          }
        }
      }
    }
    setLines(lines);
  }

  const mouseLeave = () => {
    for (let line of lines) {
      for (let i=0; i<= size-1; i++) {
        if (line.text[i].hover === 'hover') {
          line.text[i].hover = '';
        }
      }
    }
    setLines(lines);
  }

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
