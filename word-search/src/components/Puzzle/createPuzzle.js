import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { generatePuzzle } from "../../store/actions/puzzleAction";

const CreatePuzzle = ({ generatePuzzle }) => {
  const [words, setWords] = useState([]);
  const [text, setText] = useState("");
  const [size, setSize] = useState(10);
  const [badWords, setBadWords] = useState([]);
  const [title, setTitle] = useState("");
  const history = useHistory();

  useEffect(() => {
    console.log("in useEffect");
    var myTxt = require("../../assets/badwords.txt");
    readTextFile(myTxt);
  }, []);

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

  // this function test if user is trying to add a bad word.
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
    // test user string is only letter characters
    if (/[^a-zA-Z]/.test(text)) {
      alert(
        "Input must contain only letters A-Z. (No spaces, numbers, special characters, etc.)"
      );
      return;
    }
    // test word is greater > 1
    if (text.length === 1) {
      alert("Words should be longer then 1 character.");
      return;
    }
    // test not bad word.
    let bad = badWordTest(text);
    if (!bad) {
      alert("Please do not use bad words");
      return;
    }
    // test same word
    for (let word of words) {
      if (word.text === text) {
        alert("Please do not use the same words");
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
    let newWords = words;
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
    <div>
      <p>1. Name your puzzle:</p>
      <input
        type="text"
        name="title"
        onChange={changeTitle}
        placeholder="Title of puzzle!"
        value={title}
      />
      <p>2. Add some words:</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="word"
          onChange={changeHandler}
          placeholder="Words Here!"
          value={text}
        />
        <button type="submit">Add word # {words.length + 1}</button>
        <button onClick={handleRemove}>Remove word</button>
      </form>
      <form>
        <p>3. Pick a size (10-50)</p>
        <input
          type="number"
          name="size"
          onChange={changeSize}
          min="10"
          max="50"
          value={size}
        />
      </form>
      <div>
        <h1>Words to find!</h1>
        <ul onClick={activateDelete}>
          {words &&
            words.map((word, i) => (
              <li id={i} key={word.id}>
                #{i + 1}: {word.text}
              </li>
            ))}
        </ul>
      </div>
      <button onClick={generate}>4. Generate Puzzle</button>
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, { generatePuzzle })(CreatePuzzle);
