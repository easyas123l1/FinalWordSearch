import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { generatePuzzle } from "../../store/actions/puzzleAction";
import puzzle from "../../styles/puzzle.module.scss";

const CreatePuzzle = ({ generatePuzzle }) => {
  const [words, setWords] = useState([]);
  const [text, setText] = useState("");
  const [size, setSize] = useState(10);
  const [badWords, setBadWords] = useState([]);
  const [title, setTitle] = useState("");

  const history = useHistory();

  useEffect(() => {
    if (badWords.length === 0) {
      var myTxt = require("../../assets/badwords.txt");
      readTextFile(myTxt);
    }
  }, [badWords.length]);

  const readTextFile = file => {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = () => {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status === 0) {
          var allText = rawFile.responseText;
          allText = allText.split("\n");
          setBadWords(allText);
        }
      }
    };
    rawFile.send(null);
  };

  const changeHandler = e => {
    e.persist();
    setText(e.target.value.toUpperCase());
  };

  const changeTitle = e => {
    e.persist();
    setTitle(e.target.value);
  };

  const changeSize = e => {
    e.persist();
    setSize(+e.target.value);
  };

  const handleRemove = e => {
    e.preventDefault();
    let newWords = words.filter(word => !word.activate);
    setWords(newWords);
  };

  const badWordTest = word => {
    // check if word is a bad word. naughty naughty!
    const foundWord = badWords.find(bw => bw.toUpperCase().trim() === word);
    if (foundWord) {
      return false;
    }
    return true;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!text) {
      alert("Input field can not be empty");
      return;
    }

    if (/[^a-zA-Z]/.test(text)) {
      alert(
        "Input must contain only letters A-Z. (No spaces, numbers, special characters, etc.)"
      );
      return;
    }

    if (text.length === 1) {
      alert("Words should be longer then 1 character.");
      return;
    }

    let bad = badWordTest(text);
    if (!bad) {
      alert("Please do not use bad words");
      return;
    }

    for (let word of words) {
      if (word.text === text) {
        alert("Please do not use the same word");
        return;
      }
    }

    const newItem = {
      text: text,
      id: Date.now(),
      activate: false,
      solved: false,
      color: ""
    };

    setWords([...words, newItem]);
    setText("");
  };

  const activateDelete = e => {
    let clickWord = e.target.innerText.split(" ");
    clickWord = clickWord[1];
    let newWords = JSON.parse(JSON.stringify(words));
    for (let word of newWords) {
      if (clickWord === word.text) {
        if (word.activate) {
          word.activate = false;
        } else {
          word.activate = true;
        }
      }
    }
    setWords(newWords);
    console.log(words);
  };

  const generate = e => {
    e.preventDefault();
    const puzzle = {
      title,
      words,
      size
    };
    generatePuzzle(puzzle);
    console.log("generate puzzle button clicked!");
    history.push("/addPuzzle");
  };

  return (
    <div className={puzzle.background}>
      <div className={puzzle.createPuzzle}>
        <p className={puzzle.space}>1. Name the puzzle:</p>
        <input
          type="text"
          name="title"
          onChange={changeTitle}
          placeholder="Title the puzzle!"
          value={title}
          className={puzzle.space}
        />
        <p className={puzzle.space}>2. Add some words:</p>
        <form onSubmit={handleSubmit} className={puzzle.addWord}>
          <input
            type="text"
            name="word"
            onChange={changeHandler}
            placeholder="Words Here!"
            value={text}
            className={puzzle.space}
          />
          <button type="submit" className={puzzle.loginButton}>
            Add word # {words.length + 1}
          </button>
        </form>
        <form className={puzzle.addWord}>
          <p className={puzzle.space}>3. Pick a size (10-50)</p>
          <input
            type="number"
            name="size"
            onChange={changeSize}
            min="10"
            max="50"
            value={size}
            className={puzzle.space}
          />
        </form>
        <div className={puzzle.addWord}>
          <h1>Words to find!</h1>
          <p>to remove words click on the word remove word button</p>
          <div className={puzzle.createFindWords}>
            <ul onClick={activateDelete}>
              {words &&
                words.map((word, i) => (
                  <li id={i} key={word.id} className={word.activate.toString()}>
                    #{i + 1}: {word.text}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <button onClick={handleRemove} className={puzzle.loginButton}>
          Remove word(s)
        </button>
        <button onClick={generate}>4. Generate Puzzle</button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, { generatePuzzle })(CreatePuzzle);
